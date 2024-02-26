import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css';

function App() {
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/');
      const { results: [user] } = response.data; 
      const { name: { title, first, last }, email } = user;
      setUserData({ fullName: `${title} ${first} ${last}`, email });
      localStorage.setItem('userData', JSON.stringify(userData)); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      fetchData();
    }
  }, []);

  const handleRefresh = () => {
    setUserData(null);
    fetchData();
  };

  return (
    <div className="user-container">
      {userData ? (
        <React.Fragment>
          <h2 className="user-name">Full Name: {userData.fullName}</h2>
          <p className="user-email">Email: {userData.email}</p>
        </React.Fragment>
      ) : (
        <p>Loading...</p>
      )}
      <button className="refresh-btn" onClick={handleRefresh}>Refresh User</button>
    </div>
  );
}

export default App;
