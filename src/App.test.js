import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { isValidEmail } from "./isValidEmail";

//TODO create heper funtion typeIntoform which accepts email, password and
//confirm password as an argument
//
//

const typeIntoForm = (email="", password="", confirmPasword="") => {
  const emailInputElement = screen.getByRole("textbox", { name: /email/i });
  const passwordInputElement = screen.getByLabelText(/^password$/i);
  const confirmPaswordInputElement =
    screen.getByLabelText(/confirm password/i);

  userEvent.type(emailInputElement, email);
  userEvent.type(passwordInputElement, password);
  userEvent.type(confirmPaswordInputElement, confirmPasword);

  //TODO maybe should I put also the submit button???
}

describe("App", () => {
  it("renders App component", () => {
    render(<App />);
  });
  it("all input elemts are empty", () => {
    render(<App />);
    const emailInputElement = screen.getByRole("textbox", { name: /email/i });
    expect(emailInputElement.value).toBe("");
    //needs regex anchors otherwise it would select "Confirm Password" too
    const passwordInputElement = screen.getByLabelText(/^password$/i);
    expect(passwordInputElement.value).toBe("");
    const confirmPaswordInputElement =
      screen.getByLabelText(/confirm password/i);
    expect(confirmPaswordInputElement.value).toBe("");
  });
});

describe("testing input", () => {
  it("is able to type email", () => {
    render(<App />);
    const emailInputElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    userEvent.type(emailInputElement, "juandoe@gmail.com");
    expect(emailInputElement.value).toBe("juandoe@gmail.com");
  });

  it("is able to type at password", () => {
    render(<App />);
    const passwordInputElement = screen.getByLabelText(/^password$/i);
    userEvent.type(passwordInputElement, "ilovedonaldtrump");
    expect(passwordInputElement.value).toBe("ilovedonaldtrump");
  });

  it("is able to type at the confirm password", () => {
    render(<App />);
    const confirmPaswordInputElement =
      screen.getByLabelText(/confirm password/i);
    userEvent.type(confirmPaswordInputElement, "ilovedonaldtrump");
    expect(confirmPaswordInputElement.value).toBe("ilovedonaldtrump");
  });
});

test("testing email validation function works", () => {
  expect(isValidEmail("not_valid^gmail.com")).toBe(false);
  expect(isValidEmail("juandoe@gmail.com")).toBe(true);
});

describe("email validation", () => {
  it("does not show error before typing invalid email", () => {
    render(<App />);
    const emailErrorElement = screen.queryByText(/valid/i);
    expect(emailErrorElement).not.toBeInTheDocument();
  });
  it("Show email error upon typing invalid email", () => {
    render(<App />);
    const emailInputElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    const submitButtonElement = screen.getByRole("button", { name: /submit/i });
    userEvent.type(emailInputElement, "juandoegmail.com");
    userEvent.click(submitButtonElement);
    const emailErrorElement = screen.queryByText(/valid/i);
    expect(emailErrorElement).toBeInTheDocument();
  });
});

describe("password validation", () => {
  it("does not try to validate password if the email is not valid", () => {
    render(<App />);

    const emailInputElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    const submitButtonElement = screen.getByRole("button", { name: /submit/i });
    const passwordInputElement = screen.getByLabelText(/^password$/i);
    const shortPasswordError = screen.queryByText(/short/i);

    userEvent.type(emailInputElement, "juandoegmail.com");
    userEvent.type(passwordInputElement, "1234");
    userEvent.click(submitButtonElement);

    expect(shortPasswordError).not.toBeInTheDocument()
    // screen.debug()
  });

  it(`does return error if the password is less than 5 characters`, () => {

    render(<App />);

    const emailInputElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    const submitButtonElement = screen.getByRole("button", { name: /submit/i });
    const passwordInputElement = screen.getByLabelText(/^password$/i);

    userEvent.type(emailInputElement, "good@email.com");
    userEvent.type(passwordInputElement, "1234");
    userEvent.click(submitButtonElement);

    const shortPasswordError = screen.queryByText(/short/i);

    expect(shortPasswordError).toBeInTheDocument()
    // screen.debug()

  });
  it(`does return password not matching error but only if
 the email is valid`, ()=>{
   render(<App/>)
   const emailInputElement = screen.getByRole("textbox", {
     name: /email/i,
   });
   const submitButtonElement = screen.getByRole("button", { name: /submit/i });
   const passwordInputElement = screen.getByLabelText(/^password$/i);
   const confirmPaswordInputElement= screen.getByLabelText(/^confirm password$/i);


   userEvent.type(emailInputElement, "bademail.com");
   userEvent.type(passwordInputElement, "1234");
   userEvent.type(confirmPaswordInputElement, "1234");
   userEvent.click(submitButtonElement);

   const emailErrorElement = screen.queryByText(/valid/i);
   const shortPasswordError = screen.queryByText(/short/i);
   let paswordsNotMatchElement = screen.queryByText(/match/i);


   expect(paswordsNotMatchElement).not.toBeInTheDocument()

   userEvent.type(emailInputElement, "good@email.com");
   userEvent.type(passwordInputElement, "1234");
   userEvent.type(confirmPaswordInputElement, "9999");
   userEvent.click(submitButtonElement);

   // const paswordsNotMatchElement2 = screen.queryByText(/match/i);
   paswordsNotMatchElement = screen.queryByText(/match/i);

   expect(paswordsNotMatchElement).toBeInTheDocument()

 })

});
