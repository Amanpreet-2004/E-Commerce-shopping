
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://e-commerce-shopping-cdqi.onrender.com/user/findUsers");
      // Aapka data 'body' key mein aa raha hai
      if (res.data && Array.isArray(res.data.body)) {
        setUsers(res.data.body);
      }
    } catch (error) {
      toast.error("Users load nahi ho paye");
    } finally {
      setLoading(false);
    }
  };

  // DELETE FUNCTION
  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem('token');
        // Backend delete API call
        const res = await axios.delete(`https://e-commerce-shopping-cdqi.onrender.com/user/deleteUser/${userId}`, {
          headers: { token }
        });

        if (res.data.success) {
          toast.success("User delete Successfully !");
          fetchUsers(); // List refresh karne ke liye
        } else {
          toast.error(res.data.message || "Delete nahi ho paya");
        }
      } catch (error) {
        console.error("Delete Error:", error);
        toast.error("Server error: User delete nahi hua");
      }
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  if (loading) return <div className="text-center mt-5"><h5>Loading Users...</h5></div>;

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <h3 className="fw-bold mb-4">Registered Users ({users.length})</h3>
      
      <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "20px" }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="fw-bold" style={{ color: "#c76464" }}>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className="badge bg-dark rounded-pill">{user.role || 'user'}</span></td>
                  <td className="text-center">
                    <button 
                      onClick={() => deleteUser(user._id)}
                      className="btn btn-sm btn-outline-danger border-0"
                      title="Delete User"
                    >
                      {/* Trash icon using simple 'X' or Emoji if font-awesome not installed */}
                      <span style={{ fontSize: "1.2rem" }}>🗑️</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;