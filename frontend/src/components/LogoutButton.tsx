import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../context/AuthProvider";

export default function LogoutButton() {
  const { getAuth, removeAuth } = useAuthProvider();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuth();
    // Redirect to home after logout
    navigate("/");
  };
  const { token } = getAuth();
  return (
    <>
      {token ? (
        <button
          onClick={handleLogout}
          className="p-2 bg-red-400 text-white rounded-lg hover:bg-red-600"
        >
          Close session
        </button>
      ) : null}
    </>
  );
}
