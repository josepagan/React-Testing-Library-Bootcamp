import React, { useState } from "react";
import "./App.css";
import { isValidEmail } from "./isValidEmail";

function App() {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [invalidEmailFlag, setInvalidEmailFlag] = useState(false);
	
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(state.email)) setInvalidEmailFlag(true)
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="mb-3">
          {invalidEmailFlag && <div>The email is not valid</div> }
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
            />
          </label>
        </div>



        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="form-control"
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
