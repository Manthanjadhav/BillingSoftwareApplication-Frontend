import React, { useState } from "react";
import { addUser } from "../../service/UserService";
import toast from "react-hot-toast";

export default function UsersForm({ setUsers }) {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(() => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validation
    if (!data.name.trim() || data.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim() || !emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!data.password || data.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const response = await addUser(data);
      setUsers((prev) => [...prev, response.data]);
      toast.success("User added successfully!");
      setData({
        name: "",
        email: "",
        password: "",
        role: "ROLE_USER",
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to add user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 mt-2">
      <div className="card col-md-12 form-container">
        <div className="card-body">
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                name="name"
                id="name"
                type="text"
                className="form-control"
                placeholder="Enter User Name"
                value={data.name}
                onChange={onChangeHandler}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={data.email}
                onChange={onChangeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                className="form-control"
                placeholder="************"
                value={data.password}
                onChange={onChangeHandler}
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning w-100"
              disabled={loading}
            >
              {loading ? "loading..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
