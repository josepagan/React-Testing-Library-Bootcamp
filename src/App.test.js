import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("renders App component", () => {
    render(<App />);
  });
  it("all input elemts are empty", () => {
    render(<App />);
    // const emailInputElement = screen.getByRole("textbox")dd
    const emailInputElement = screen.getByRole("textbox", { name: /email/i });
    expect(emailInputElement.value).toBe("");
    //needs regex anchors otherwise it would select "Confirm Password" too
    const passwordInputElement = screen.getByLabelText(/^password$/i);
    expect(passwordInputElement.value).toBe("");
    const confirmPaswordInputElement = screen.getByLabelText(/confirm password/i);
    expect(confirmPaswordInputElement.value).toBe("");
  });
});

describe("testing input", () => {

  it("is able to type email", () => {
    render(<App />);
    const emailInputElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    userEvent.type(emailInputElement, "jm.pagan@gmail.com");
    expect(emailInputElement.value).toBe("jm.pagan@gmail.com");
  });

  it("is able to type at password", () => {
    render(<App />);
    const passwordInputElement = screen.getByLabelText(/^password$/i);
    userEvent.type(passwordInputElement, "jm.pagan@gmail.com");
    expect(passwordInputElement.value).toBe("jm.pagan@gmail.com");
  });

  it("is able to type at the confirm password", () => {
    render(<App />);
    const confirmPaswordInputElement = screen.getByLabelText(/confirm password/i);
    userEvent.type(confirmPaswordInputElement, "jm.pagan@gmail.com");
    expect(confirmPaswordInputElement.value).toBe("jm.pagan@gmail.com");
  });
});
