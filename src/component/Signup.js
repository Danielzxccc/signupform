import React, { useEffect, useRef, useState } from "react";

export default function Signup() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passErrMsg, setPassErrMsg] = useState("");
  const [conErrMsg, setConErrMsg] = useState("");

  const inputRef = useRef(null);
  const passRef = useRef(null);
  const validate = password === confirm;

  useEffect(() => {
    if (validate === true) {
      setConErrMsg("");
    } else {
      setConErrMsg("Password does not match");
    }
  }, [validate]);

  const validateConfirmPassword = (e) => {
    setConfirm(e.target.value);
  };
  const validatePassword = (e) => {
    setPassword(e.target.value);
    const regex =
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/g;

    if (!regex.test(password)) {
      setPassErrMsg("Password is too weak");
    } else {
      setPassErrMsg("");
    }
  };

  const handleSignUp = (e) => {
    if (passErrMsg === "" && conErrMsg === "") {
      console.log("rawr success");
    } else if (conErrMsg !== "" && passErrMsg === "") {
      e.preventDefault();
      inputRef.current.focus();
    } else if (conErrMsg === "" && passErrMsg !== "") {
      e.preventDefault();
      passRef.current.focus();
    } else {
      e.preventDefault();
      passRef.current.focus();
    }
  };

  return (
    <>
      <div className="container">
        <div className="form">
          <form onSubmit={handleSignUp}>
            <h1>SIGN UP FORM</h1>
            <div className="input">
            <label htmlFor="Firstname">Firstname:</label>
              <input type="text" required />
              <label htmlFor="LastName">Lastname:</label>
              <input type="text" required />
              <label htmlFor="Email">Email:</label>
              <input type="email" required />
              <label htmlFor="Password">Password:</label>
              {passErrMsg ? <p>{passErrMsg}</p> : ""}
              <input
                type="password"
                required
                onChange={validatePassword}
                ref={passRef}
              />
              <label htmlFor="Confirm Password">Confirm Password:</label>
              {conErrMsg ? <p>{conErrMsg}</p> : ""}
              {password ? (
                <input
                  type="password"
                  required
                  onChange={validateConfirmPassword}
                  ref={inputRef}
                />
              ) : (
                <input type="password" required readOnly />
              )}
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
}
