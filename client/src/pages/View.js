import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../stylesheets/View.css";

const View = () => {
  const [user, setUser] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const res = await axios.get(`http://localhost:5000/user/${id}`);
    if (res.status === 200) {
      setUser({ ...res.data[0] });
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <p>User Contact Deatil</p>
        </div>
        <div className="container">
          {" "}
          <strong>Name:</strong>
          <span>{user && user.name}</span>
          <br />
          <br />
          <strong>Email:</strong>
          <span>{user && user.email}</span>
          <br />
          <br />
          <strong>Contact:</strong>
          <span>{user && user.contact}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Go back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
