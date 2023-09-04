import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders post your message text", () => {
  render(<App />);
  const textElement = screen.getByText(/post your message/i);
  expect(textElement).toBeInTheDocument();
});
