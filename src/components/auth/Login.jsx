import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import app, { db } from "../firebase/firebaseConfig";
import { AuthContext } from "../AuthContext/AuthContext";
import { get, getDatabase, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const nav = useNavigate();
  //   async function fetchData() {
  function fetchDataRealTime(callback) {
    const unsubscribe = onSnapshot(collection(db, "admin"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(data); // Passes the data to a callback function for further processing
    });

    // Return the unsubscribe function to stop listening to changes when needed
    return unsubscribe;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};
    console.log("data");
    if (!adminId) {
      error.username = "required";
    } else if (!adminPassword) {
      error.password = "required";
    } else {
      if (data[0].username === adminId && data[0].password === adminPassword) {
        login(data[0].id);
        alert("Login Successfull");
        setAdminId("");
        setAdminPassword("");
        nav("/");
      } else {
        alert("Login Unsuccessfull");
        setAdminId("");
        setAdminPassword("");
      }
    }
    setError(error);
  };
  useEffect(() => {
    const unsubscribe = fetchDataRealTime((data) => {
      setData(data); // Update your state with the real-time data
    });

    return () => unsubscribe();
  }, []);
  console.log(data);
  return (
    <div className="flex justify-center w-full items-center h-[100vh]">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Admin Sign in
          </h5>
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Admin Id
            </label>
            <input
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              type="adminId"
              name="adminId"
              id="adminId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@c87&()L"
              required
            />
          </div>
          <div>
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="adminPassword"
              name="adminPassword"
              id="adminPassword"
              placeholder=".•••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                for="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Lost Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <a
              href="#"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
