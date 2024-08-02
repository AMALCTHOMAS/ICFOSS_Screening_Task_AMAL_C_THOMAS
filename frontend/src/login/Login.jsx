import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthConsumer from "../auth";
import axios from "axios";
import { Link } from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const [authed, dispatch] = AuthConsumer();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3003/auth/login', {
                username,
                password
            });
            navigate('/dashboard');
            dispatch({
                type: 'login',
                payload: {
                    email: res.data.email,
                    jwtToken: res.data.jwtToken,
                }
            });

        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || 'An unexpected error occurred';
            setError(errorMessage);
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
                <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                    <div className="text-center mb-12">
                        <h4 className="text-gray-800 text-base font-semibold mt-6">Sign in to your account</h4>
                    </div>

                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter username"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                        </div>

                        <div className="!mt-12">
                            <button
                                type="submit"
                                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            >
                                Login
                            </button>
                        </div>
                        <p className="text-gray-800 text-sm mt-6 text-center">
                            Don't have an account?
                            <Link to="/signup" className="text-blue-600 font-semibold hover:underline ml-1">
                                Sign up here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
