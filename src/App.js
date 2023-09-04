import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import { parse } from "papaparse";
import WordCloud from "react-d3-cloud";

const POLL_TIME_IN_MILLISECONDS = 1000;

function App() {
  const messageInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchMessages()
        .then((result) => {
          const currentMessages = messages.map((d) => d.text && d.value);
          const newMessages = result.data.map((d) => d.text && d.value);
          if (
            currentMessages.length === newMessages.length &&
            currentMessages.every(
              (value, index) => value === newMessages[index]
            ) &&
            messages.length > 0
          ) {
            return;
          }
          setMessages(result.data);
        })
        .catch((error) => {
          console.error("failed to fetch stats", error);
        });
    }, POLL_TIME_IN_MILLISECONDS);

    return () => clearInterval(timer);
  }, [messages]);

  function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const payload = { message: event.target.message.value };
    const webhookUrl = process.env.REACT_APP_WEBHOOK_URL || "";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", webhookUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status !== 201) {
        console.error(
          "Something went wrong when posting event - code:" +
            xhr.status +
            " " +
            xhr.statusText
        );
      }
      messageInputRef.current.value = "";
      setIsSubmitting(false);
    };
    xhr.send(JSON.stringify(payload));
  }

  async function fetchMessages() {
    const response = await fetch(process.env.REACT_APP_READMODEL || "");
    const data = await response.text();
    const result = parse(data, { header: true });
    const summarizedData = result.data
      .filter((d) => d && d !== "" && d.message !== undefined)
      .map((d) => {
        return { text: d.message };
      })
      .reduce((acc, cur) => {
        const existing = acc.find((d) => d.text === cur.text);
        if (existing) {
          existing.value += 1000;
        } else {
          const newValue = { text: cur.text, value: 1000 };
          acc.push(newValue);
        }
        return acc;
      }, []);
    return {
      data: summarizedData,
    };
  }

  return (
    <div className="App">
      <p>Post your message</p>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input type="text" name="message" ref={messageInputRef} />
        <br />
        <button disabled={isSubmitting}>Post</button>
      </form>
      <br />
      <WordCloud data={messages} />
    </div>
  );
}

export default App;
