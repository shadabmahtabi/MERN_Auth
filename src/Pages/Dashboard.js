import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile, signOut } from "../store/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch((state) => state.auth);
  const { token, loading, error, user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const fetchData = () => {
      try {
        dispatch(profile());

      } catch (error) {
        console.log("Error fetching data: ", error.response.data);
      }
    };

    fetchData();
  }, []);

  const handleSignOut = () => {
    dispatch(signOut());
  };
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleSignOut}>Sign Out</button>

      <h2>{user ? user.username : ""}</h2>
      <h2>{user ? user.email : ""}</h2>
    </>
  );
};

export default Dashboard;
