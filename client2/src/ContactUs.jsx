import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

function Header() {
  return (
    <header>
      <nav>
        <div class="logo">
          <a href="/">
            <img src="mylogo.png" alt="Lost & Found Logo" />
          </a>
        </div>
        <ul>
          <li>
            <a href="/#about" class="btn_">
              About
            </a>
          </li>

          <li>
            <a href="/#contact" class="btn_">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2023 LostNFound | College</p>
    </footer>
  );
}

function ContactUs() {
  const data = { name: "", email: "", message: "" };
  const [inputData, setInputData] = useState(data);
  const [flag, setFlag] = useState(false);

  function handleData(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();
    if (!inputData.name || !inputData.email || !inputData.message) {
      alert("All fields are Mandatory");
    } else {
      Axios.post("http://localhost:8080/contactUs", {
        name: inputData.name,
        email: inputData.email,
        message: inputData.message,
      }).then((response) => {
        setFlag(true);
      });
    }
  }
  return (
    <>
      <Header />
      <Main />
      <About />
      <section id="contact">
        <pre>
          {flag ? (
            <h2 className="pretext">Thank you for contacting us!</h2>
          ) : (
            ""
          )}
        </pre>
        <div class="container22">
          <h3>Contact Us</h3>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={inputData.name}
              onChange={handleData}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={inputData.email}
              onChange={handleData}
            />
            <textarea
              name="message"
              placeholder="Message"
              value={inputData.message}
              onChange={handleData}
            />
            <input type="submit" value="Send Message" class="btn" />
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

const Main = () => {
  return (
    <>
      <section id="hero">
        <div class="hero-text">
          <h2>Find Your Lost Items</h2>
          <p>
            Discover a convenient way to locate your lost belongings within the
            college campus.
          </p>
          <a href="/login" class="btn">
            Login
          </a>
          <a href="/signup" class="btn">
            Signup
          </a>
        </div>
      </section>
    </>
  );
};

const About = () => {
  return (
    <>
      <section id="about">
        <div class="container_about">
          <h3>About Us</h3>
          <p>
            Welcome to Lost & Found College! Our mission is to provide a
            reliable and efficient platform for students and staff to locate
            their lost items within the campus premises. We understand how
            frustrating it can be to misplace belongings, and that's why we've
            built this intuitive solution to reunite you with your cherished
            possessions.
            <br />
            <br />
            Why Choose Lost & Found College?
            <br />
            <br />
            <br />
            1.Efficient Tracking System: Our advanced tracking system enables
            seamless item registration and updates on lost or found items. With
            just a few clicks, you can report a missing item or check if someone
            has found your lost belongings.
            <br />
            2.User-Friendly Interface: We've designed our website with
            simplicity and usability in mind. Whether you're a tech-savvy
            student or a staff member unfamiliar with online platforms,
            navigating Lost & Found College is a breeze.
            <br />
            3.Secure and Confidential: Your privacy and security are paramount
            to us. Rest assured that your personal information and contact
            details are kept confidential throughout the process.
            <br />
            4.Community Collaboration: Lost & Found College fosters a sense of
            community by encouraging students and staff to help each other in
            locating missing items. Together, we can make the campus a safer and
            more helpful place.
            <br />
            5.Timely Notifications: Our system sends you instant notifications
            when there's a match between your lost item and a found report. Say
            goodbye to endless hours of searching notice boards or bulletin
            posts!
          </p>
          <a href="#contact" class="btn">
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
};
export default ContactUs;
export { Header, Footer };
