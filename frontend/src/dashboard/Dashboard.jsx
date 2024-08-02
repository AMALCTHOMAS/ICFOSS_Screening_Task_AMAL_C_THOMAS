import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthConsumer from "../auth";
import ChangePassword from "../changepassword/Changepassword";

const Dashboard = () => {
    const [user, setUser] = useState({ firstname: '', lastname: '' });
    const [authed, dispatch] = AuthConsumer();
    const [showChangePassword, setShowChangePassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.post('http://localhost:3003/auth/dashboard', 
                    { email: authed.email },
                    {
                        headers: {
                            'Authorization': `Bearer ${authed.jwtToken}`
                        }
                    }
                );
                setUser({
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                });
            } catch (err) {
                console.error("Error fetching user details", err);
            }
        };

        fetchUserDetails();
    }, [authed.jwtToken, authed.email]);

    const handleLogout = () => {
        dispatch({
            type: 'logout',
            payload: {
                jwtToken: "",
                email: ""
            }
        });
        navigate('/');
    };

    return (
        <div>
            <nav className="bg-blue-600 p-4 text-white">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-lg font-semibold">
                        My Dashboard
                    </div>
                    <div className="flex items-center">
                        <span className="mr-4">Welcome, {user.firstname} {user.lastname}</span>
                        <button 
                            onClick={() => setShowChangePassword(true)} 
                            className="bg-yellow-600 px-4 py-2 rounded mr-4"
                        >
                            Change Password
                        </button>
                        <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            <div className="p-8">
                <h1 className="text-2xl">Dashboard</h1>
                {/* Additional content can go here */}
            </div>

            {showChangePassword && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-4 rounded">
                        <button 
                            onClick={() => setShowChangePassword(false)} 
                            className="bg-red-600 text-white px-2 py-1 rounded mb-4"
                        >
                            Close
                        </button>
                        <ChangePassword />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
