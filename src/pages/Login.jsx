import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../icons";

export default function Login({ handleIsLoggedIn }) {
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((userData) => {
      localStorage.setItem("isLoggedIn", true);
      handleIsLoggedIn(true);
      navigate("/");
    });
  };
  return (
    <div className="w-96 m-auto flex flex-col text-center mt-56">
      <p className="mb-4 font-bold">Sign In With Google To Continue</p>
      <button className="btn" onClick={signInWithGoogle}>
        <FontAwesomeIcon icon={["fab", "google"]} /> Sign In With Google
      </button>
    </div>
  );
}
