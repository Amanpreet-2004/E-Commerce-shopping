// import React from 'react';

// const handleLogout = () => {
//     // LocalStorage se saara data saaf karein
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('role'); 

//     toast.success("Logged out successfully!");

//     // ✅ 2. Frontend port (Home page) par redirect karein
//     // Agar aapka login page '/login' hai toh wahan bhej dein
//     navigate('/login'); 
//   };
// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-light bg-light border-bottom px-4">
//       <span className="navbar-brand mb-0 h1">Admin Dashboard</span>
      
//     </nav>
//   );
// };

// export default Navbar;
import React from 'react';
import { toast } from 'react-toastify';

const Navbar = () => {
  // handleLogout ko Navbar ke andar rakhein
  const handleLogout = () => {
    // 1. LocalStorage saaf karein
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role'); 

    toast.success("Logging out and redirecting...");

    // 2. Frontend port par redirect karein (Example: 5174)
    // window.location.href se poora page refresh ho jayega
    setTimeout(() => {
      window.location.href = "http://localhost:5174/login"; 
    }, 1000); // 1 sec ka delay taaki toast message dikh jaye
  };

  return (
    <nav className="navbar navbar-light bg-light border-bottom px-4 d-flex justify-content-between align-items-center" style={{ height: "70px" }}>
      <span className="navbar-brand mb-0 h1 fw-bold" style={{ color: "#333" }}>
        Admin Dashboard
      </span>

      {/* Logout Button */}
      <button 
        onClick={handleLogout} 
        className="btn btn-outline-danger fw-bold shadow-sm" 
        style={{ borderRadius: "10px", padding: "6px 20px" }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;