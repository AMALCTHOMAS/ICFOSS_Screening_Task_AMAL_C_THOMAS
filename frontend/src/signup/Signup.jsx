import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const navigate = useNavigate();

    const validateForm = () => {
        if (username.length < 5) {
            setError("Username must be at least 5 characters long.");
            return false;
        }
        if (!firstname.match(/^[A-Za-z]+$/)) {
            setError("First Name must only contain alphabetic characters.");
            return false;
        }
        if (!lastname.match(/^[A-Za-z]+$/)) {
            setError("Last Name must only contain alphabetic characters.");
            return false;
        }
        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
            setError("Email must be in a valid email format.");
            return false;
        }
        if (mobile.length !== 10) {
            setError("Mobile number must be 10 digits long.");
            return false;
        }
        if (password1.length < 8 || !password1.match(/[A-Z]/) || !password1.match(/[0-9]/) || !password1.match(/[^A-Za-z0-9]/)) {
            setError("Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.");
            return false;
        }
        if (password1 !== password2) {
            setError("Passwords do not match.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:3003/auth/signup', {
                    username,
                    firstname,
                    lastname,
                    email,
                    mobile,
                    password: password1,
                });
                navigate('/');
            } catch (error) {
                console.error(error);
                setError(error.response.data.message || "An error occurred during signup. Please try again.");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
            <div className="text-center mb-16">
                <h4 className="text-gray-800 text-base font-semibold mt-6">Sign up into your account</h4>
            </div>

            <form onSubmit={handleSubmit}>
                {error && <div className="text-red-500">{error}</div>}
                <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Username</label>
                        <input name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter username" required autoComplete="off" />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                        <input name="firstname" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter first name" required autoComplete="off" />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                        <input name="lastname" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter last name" required autoComplete="off" />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                        <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" required autoComplete="off" />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Mobile No.</label>
                        <input name="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter mobile number" required autoComplete="off" />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Password</label>
                        <input name="password1" type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" required autoComplete="off" />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                        <input name="password2" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter confirm password" required autoComplete="off" />
                    </div>
                </div>

                <div className="!mt-12">
                    <button type="submit" className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                        Sign up
                    </button>
                    <div className="mt-4">
                        <span>Already have an account? </span>
                        <Link to="/" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup;
