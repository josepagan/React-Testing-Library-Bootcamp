import React, { useState } from "react";
import "./App.css";
import { isValidEmail } from "./isValidEmail";

function App() {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
	
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(state.email)) return setError("The email is not valid")
    // if (!isValidPassword(state.password))
    // COMPLETE THE TESTS FIRST TO DO PROPER TDD MATE!!!!
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
            <input
              // im not actually using the value attribute, i wonder if thats ok 
              type="email"
              id="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={state.email}
            />
          </label>
        </div>

        <div className="mb-3">
          {error && <div>{error}</div> }
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              value={state.password}
            />
          </label>
        </div>



        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              className="form-control"
              value={state.confirmPassword}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
