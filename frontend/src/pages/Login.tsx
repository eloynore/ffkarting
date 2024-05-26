import React, { useState, useEffect } from "react";
import { useAuthProvider } from "../context/AuthProvider";
import { login } from "../helper/api";

export default function Login() {
  const { getAuth, addAuth } = useAuthProvider();
  const currentAuth = getAuth();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await login(user, pwd);
    if (response) {
      addAuth(response.data);
      setUser("");
      setPwd("");
    } else {
      setErrMsg("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 w-96">
        {currentAuth.token ? (
          <div>
            <h1 className="text-2xl font-bold mb-4 dark:text-white ">
              You are now logged in!
            </h1>
          </div>
        ) : (
          <div>
            <p className={errMsg ? "text-red-500 mb-4" : "hidden"}>{errMsg}</p>
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
              </div>
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
                type="submit"
              >
                Sign In
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
