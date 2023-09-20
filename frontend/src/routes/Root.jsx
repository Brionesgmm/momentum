import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Messages from "../components/Messages";
import { useEffect } from "react";

function Root() {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState({});

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((res) => setUser(res.user));
  }, []);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMessages({});
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  return (
    <>
      <header className="container">
        <div className="text-center">
          <h1 className="">
            <Link to={user ? "/profile" : "/"}>Momentum</Link>
          </h1>
        </div>
      </header>
      <Messages messages={messages} />
      <Outlet context={{ user, setUser, setMessages }} />
    </>
  );
}

export default Root;
