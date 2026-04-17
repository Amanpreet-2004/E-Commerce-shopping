import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const { token } = useParams(); // URL se token lene ke liye
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:4644/user/reset-password/${token}`, { password });
            
            if (res.data.success) {
                alert("Password successfully reset! Now login.");
                navigate('/login');
            } else {
                alert(res.data.message || "Token has been expired.");
            }
        } catch (err) {
            console.error(err);
            alert("something went wrong");
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
            <div style={{ padding: '30px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#e57373' }}>Reset Your Password</h2>
                <p>Niche apna naya password enter karein:</p>
                <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                        type="password" 
                        placeholder="Enter New Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <button type="submit" style={{ padding: '10px', background: '#e57373', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;