import { useState } from "react";
import axios from "axios";
import AuthConsumer from "../auth";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [authed] = AuthConsumer();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }
        
        if (newPassword.length < 8 || 
            !newPassword.match(/[A-Z]/) || 
            !newPassword.match(/[0-9]/) || 
            !newPassword.match(/[^A-Za-z0-9]/)) {
            setError("Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3003/auth/changepassword', 
                { 
                    email: authed.email, 
                    oldPassword, 
                    newPassword 
                },
                {
                    headers: {
                        'Authorization': `Bearer ${authed.jwtToken}`
                    }
                }
            );
            setSuccess(response.data.message);
            setError("");
        } catch (err) {
            setError(err.response.data.message || "An unexpected error occurred");
            setSuccess("");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border border-gray-300 rounded">
                <h2 className="text-2xl mb-4">Change Password</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700">Old Password</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
