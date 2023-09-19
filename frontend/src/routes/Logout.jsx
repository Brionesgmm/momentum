import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const Logout = () => {
  const { setUser } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/logout").then(() => {
      setUser(null);
      navigate("/");
    });
  }, [setUser, navigate]);

  return (
    <main className="container">
      <div className="row justify-content-around mt-5">
        <p>Loggin out...</p>
      </div>
    </main>
  );
};

export default Logout;
