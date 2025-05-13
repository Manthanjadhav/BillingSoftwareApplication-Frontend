import React, { useEffect, useState } from "react";
import UsersForm from "../../components/UsersForm/UsersForm";
import UsersList from "../../components/UsersList/UsersList";
import "./ManageUsers.css";
import toast from "react-hot-toast";
import { fetchUsersList } from "../../service/UserService";
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetchUsersList();
        console.log(response);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Unable to fetch Users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="users-container text-light">
      <div className="left-column">
        <UsersForm setUsers={setUsers} />
      </div>
      <div className="right-column">
        <UsersList setUsers={setUsers} users={users} />
      </div>
    </div>
  );
};

export default ManageUsers;
