import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./AddEdit.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  name: "",
  email: "",
  contact: "",
  city: "",
};
const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name, email, contact, city } = state;
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const res = await axios.get(`http://localhost:5000/user/${id}`);
    if (res.status === 200) {
      setState({ ...res.data[0] });
    }
  };

  const addUser = async (data) => {
    const res = await axios.post("http://localhost:5000/user", data);
    if (res.status === 200) {
      toast.success(res.data);
    }
  };

  const updateUser = async (data, id) => {
    const res = await axios.put(`http://localhost:5000/user/${id}`, data);
    if (res.status === 200) {
      toast.success(res.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact || !city) {
      toast.error("Fill in all fields");
    } else {
      if (!id) {
        addUser(state);
      } else {
        updateUser(state, id);
      }
      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <h1 id="errorMessage"></h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter name"
          onChange={handleInputChange}
          value={name}
          className="inputs"
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          onChange={handleInputChange}
          value={email}
          className="inputs"
        />
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter contact number"
          onChange={handleInputChange}
          value={contact}
          className="inputs"
        />
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Enter city"
          onChange={handleInputChange}
          value={city}
          className="inputs"
        />
        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;
