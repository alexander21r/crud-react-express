import { Link } from "react-router-dom";
import "../stylesheets/Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      if (res.status === 200) {
        setData(res.data);
        if (!res.data.length) {
          document.getElementById("errorMessage").innerText =
            "No user added yet";
        }
      }
    } catch (error) {
      document.getElementById("errorMessage").innerText =
        "You forgot to turn on the server";
    }
  };

  const onDeleteUser = async (id) => {
    if (window.confirm("Are your sure you want to delete")) {
      const res = await axios.delete(`http://localhost:5000/user/${id}`);
      if (res.status === 200) {
        toast.success(res.data);
        getUsers();
      }
    }
  };

  const foundPersonsByCity = () => {
    let inputField = document
      .querySelector("#foundPersonsByCity")
      .value.toUpperCase();

    data.map((item) => {
      if (inputField == item.city.toUpperCase()) {
        setFilteredData(
          data.filter((data) => inputField == data.city.toUpperCase())
        );
      } else if (inputField == "") {
        setFilteredData("");
      }
    });
  };

  return (
    <div>
      <h1 id="errorMessage"></h1>
      <div className="input">
        <input
          placeholder="Filter by city"
          type="text"
          onChange={foundPersonsByCity}
          id="foundPersonsByCity"
          className={!data.length ? "disabled" : ""}
        />
      </div>

      <table className="styled-table">
        <thead>
          <tr className={!data.length ? "disabled" : ""}>
            <th>Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(filteredData ? filteredData : data).map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>

                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>{item.city}</td>
                <td>
                  {" "}
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDeleteUser(item.id)}>
                    Delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
