import React from "react";
import { useEffect, useState } from "react";
import "./login.css";
import Axios from "axios";
import { Header, Footer } from "./ContactUs";

// handling login page

export function Login() {
  const data = { email: "", password: "" };
  const [inputData, setInputData] = useState(data);
  const [flag, setFlag] = useState(false);

  function handleCallbackResponse(response) {
    console.log(response);
  }

  // useEffect(() => {
  //   /*global google*/
  //   google.accounts.id.initialize({
  //     client_id:
  //       "1050928972405-bhcmefr5erkclp68i2oi53ut9amfv7au.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });
  //   google.accounts.id.renderButton(document.getElementById("signin_div"), {
  //     theme: "dark",
  //     size: "large",
  //   });
  // }, []);

  function handleData(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();
    if (!inputData.email || !inputData.password) {
      alert("All fields are Mandatory");
    } else {
      try {
        Axios.post("http://localhost:8080/userLogin", {
          email: inputData.email,
          password: inputData.password,
        }).then((response) => {
          if (response.data === "Found") {
            alert("Welcome!");
            //setting localstorage
            localStorage.setItem("User-email", inputData.email);
            window.location.href = "/homepage";
          } else if (response.data.message === "Wrong Password") {
            alert("Wrong Password");
          } else if (response.data === "Not Found") {
            alert("Wrong credentials");
          }
        });
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login.");
      }
    }
  }

  return (
    <>
      <Header />
      <h1 className="loginH1">Login Form</h1>

      <form onSubmit={submitHandler}>
        <div class="container_login">
          <label for="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            value={inputData.email}
            placeholder="Enter Username"
            name="email"
            onChange={handleData}
          />

          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            value={inputData.password}
            placeholder="Enter Password"
            name="password"
            onChange={handleData}
          />

          <button type="submit">Login</button>
        </div>
        <div id="signin_div"></div>
        <div className="psw">
          <span>
            {" "}
            New User? <a href="/signup"> Register here</a>
          </span>
        </div>
      </form>
      <Footer />
    </>
  );
}

// handling register page

export function Register() {
  const data = { fname: "", lname: "", email: "", password: "", password2: "" };
  const [inputData, setInputData] = useState(data);
  const [flag, setFlag] = useState(false);

  function handleData(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log(inputData);
    if (
      !inputData.email ||
      !inputData.password ||
      !inputData.fname ||
      !inputData.lname ||
      !inputData.password2
    ) {
      alert("All fields are Mandatory");
    } else {
      if (inputData.password != inputData.password2) {
        alert("Password doesnot match");
      } else {
        try {
          Axios.post("http://localhost:8080/userRegister", {
            fname: inputData.fname,
            lname: inputData.lname,
            email: inputData.email,
            password: inputData.password,
          }).then((response) => {
            if (response.data === "Done") {
              alert("Successfully Registered!");
              window.location.href = "/login";
            } else if (response.data === "Exist") {
              alert("User already exist");
            }
          });
        } catch (error) {
          console.error("Error during signup:", error);
          alert("An error occurred during Signup.");
        }
      }
    }
  }

  return (
    <>
      <Header />
      <form onSubmit={submitHandler}>
        <div class="container_register">
          <h1 className="signupH1">Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <label for="Name">
            <b>First Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            name="fname"
            id="Name"
            onChange={handleData}
            required
          />

          <label for="Name">
            <b>Last Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            name="lname"
            id="Name"
            onChange={handleData}
            required
          />

          <label for="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            id="email"
            onChange={handleData}
            required
          />

          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            id="psw"
            onChange={handleData}
            required
          />

          <label for="psw-repeat">
            <b>Confirm Password</b>
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            id="psw-repeat"
            onChange={handleData}
            required
          />

          <button type="submit" class="registerbtn">
            Register
          </button>
        </div>

        <div className="psw">
          <p>
            Already have an account? <a href="/login">Log in</a>.
          </p>
        </div>
      </form>
      <Footer />
    </>
  );
}
