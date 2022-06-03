import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../stylesheets/Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  // Changing active tab depending on url path
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddUser");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);
  return (
    <div className="header">
      <p className="logo">User Management System</p>
      <div className="header-right">
        <Link to="/">
          <p className={`${activeTab === "Home" ? "active " : ""} `}>Home</p>
        </Link>
        <Link to="/add">
          <p className={`${activeTab === "AddUser" ? "active " : ""} `}>
            Add User
          </p>
        </Link>
        <Link to="/about">
          <p className={`${activeTab === "About" ? "active " : ""} `}>About</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
