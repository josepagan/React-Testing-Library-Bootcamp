import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { isValidEmail } from "./isValidEmail";

// HELPER FUNCTIONS

const typeIntoForm = ({ email, password , confirmPasword }) => {
  const emailInputElement = screen.getByRole("textbox", { name: /email/i });
  const passwordInputElement = screen.getByLabelText(/^password$/i);
  const confirmPaswordInputElement =
    screen.getByLabelText(/confirm password/i);

  email && userEvent.type(emailInputElement, email);
  password && userEvent.type(passwordInputElement, password);
  confirmPasword && userEvent.type(confirmPaswordInputElement, confirmPasword);

  return {
    emailInputElement,
    passwordInputElement,
    confirmPaswordInputElement
  }

}

const findErrors = () => {
  const email = screen.queryByText(/valid/i);
  const shortPassword = screen.queryByText(/short/i);
  const passwordNotMatch = screen.queryByText(/match/i);
  return {email, shortPassword, passwordNotMatch}
}
const submitForm = () => {
  const submitButtonElement = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitButtonElement);
}


describe("App", () => {
  it("renders App component", () => {
    render(<App />);
  });
  it(`form fields should be empty`, ()=>{
    render(<App/>)

    const {
      emailInputElement,
      passwordInputElement,
      confirmPaswordInputElement} = typeIntoForm({})

    expect(emailInputElement.value).toBe("")
    expect(passwordInputElement.value).toBe("")
    expect(confirmPaswordInputElement.value).toBe("")
  }) 
});

describe("testing input", () => {
  it("is able to type email", () => {
    render(<App />);

    const {emailInputElement} = typeIntoForm({email: "juandoe@gmail.com"})
    expect(emailInputElement.value).toBe("juandoe@gmail.com");
  });

  it("is able to type at password", () => {
    render(<App />);

    const { passwordInputElement } = typeIntoForm({password: "ilovedonaldtrump"})
    expect(passwordInputElement.value).toBe("ilovedonaldtrump");
  });

  it("is able to type at the confirm password", () => {
    render(<App />);

    const { confirmPaswordInputElement } = typeIntoForm({ confirmPasword:"ilovedonaldtrump" })
    expect(confirmPaswordInputElement.value).toBe("ilovedonaldtrump");
  });
});

test("testing email validation function works", () => {
  expect(isValidEmail("not_valid^gmail.com")).toBe(false);
  expect(isValidEmail("juandoe@gmail.com")).toBe(true);
});

describe("email validation upon submitting", () => {

  it("does not show error before typing invalid email", () => {
    render(<App />);
    const emailErrorElement = screen.queryByText(/valid/i);
    expect(emailErrorElement).not.toBeInTheDocument();
  });

  it("Show email error upon submitting invalid email", () => {
    render(<App />);

    const {
      emailInputElement,
      passwordInputElement,
      confirmPaswordInputElement} = typeIntoForm({email:"juandoe^email.com"})
    submitForm()

    const emailErrorElement = screen.queryByText(/valid/i);
    expect(emailErrorElement).toBeInTheDocument();
  });
});

describe("password validation", () => {
  it("does not try to validate password if the email is not valid", () => {
    render(<App />);


    const {emailInputElement,passwordInputElement} = typeIntoForm({
      email: "bad^email.com",
      password: "1234"
    })
    submitForm()

    const shortPasswordError = screen.queryByText(/short/i);
    expect(shortPasswordError).not.toBeInTheDocument()
  });

  it(`does return error if the password is less than 5 characters`, () => {

    render(<App />);

    const {emailInputElement, passwordInputElement} = typeIntoForm({
      email:"good@email.com", password:"1234"
    })
    submitForm()

    expect(findErrors().shortPassword).toBeInTheDocument()

  });
  it(`does return password not matching error but only if
 the email is valid`, ()=>{
   render(<App/>)

   const {
     emailInputElement,
     passwordInputElement,
     confirmPaswordInputElement } = typeIntoForm({
       email:"bademail", password:"bad",confirmPasword:"bad"
     })
   submitForm()

   const emailErrorElement = screen.queryByText(/valid/i);
   const shortPasswordError = screen.queryByText(/short/i);
   let paswordsNotMatchElement = screen.queryByText(/match/i);


   expect(findErrors().passwordNotMatch).not.toBeInTheDocument()

   userEvent.type(emailInputElement, "good@email.com");
   userEvent.type(passwordInputElement, "1234");
   userEvent.type(confirmPaswordInputElement, "9999");
   submitForm()

   expect(findErrors().passwordNotMatch).toBeInTheDocument()
 })
});
