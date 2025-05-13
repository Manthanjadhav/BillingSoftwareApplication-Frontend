import React, { useState } from "react";
import { deleteUser } from "../../service/UserService";
import toast from "react-hot-toast";

export default function UsersList({ users, setUsers }) {
  const [search, setSearch] = useState("");

  const filterUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteByUserId = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.userId != id));
      toast.success("User Deleted Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete the user");
    }
  };

  return (
    <div
      className="user-list-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            placeholder="Search by keyword"
            className="form-control"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filterUsers.map((user, index) => (
          <div className="card p-3 bg-dark">
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <h5 className="mb-1 text-white">{user.name}</h5>
                <p className="mb-0 text-white">{user.email}</p>
              </div>
              <div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteByUserId(user.userId)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
