import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function App() {
  const [userData, setUserData] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/");
      const {
        results: [user],
      } = response.data;
      const {
        name: { title, first, last },
        email,
      } = user;
      setUserData({ fullName: `${title} ${first} ${last}`, email });
      localStorage.setItem("userData", JSON.stringify(userData));
      setFetching(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    if (userData) {
      setUserData(userData);
    } else {
      fetchData();
    }
  }, []);

  const handleRefresh = () => {
    setFetching(true);
    setUserData(null);
    fetchData();
  };

  return (
    <div className="user-container">
      {error ? (
        <p className="error">Error while fetching data...</p>
      ) : userData && !fetching ? (
        <React.Fragment>
          <h2 className="user-name">Full Name: {userData.fullName}</h2>
          <p className="user-email">Email: {userData.email}</p>
          <button className="refresh-btn" onClick={handleRefresh}>
            Refresh User
          </button>
        </React.Fragment>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
