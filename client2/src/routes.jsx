import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactUs from "./ContactUs";
import Chat from "./Chat";
import { Login, Register } from "./Login";
import HomePage from "./homePage";

function Error() {
  return (
    <>
      <h1>Oops, Page Not Found!</h1>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
