import API from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import PublicNavbar from "../components/PublicNavbar";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
        toast.error("Please fill all fields");
        return;
    }

    try {
        const res = await API.post("/auth/register", {
        name,
        email,
        password,
        });

        toast.success("Account created successfully!");

        navigate("/login");

    } catch (error) {

        toast.error(
        error.response?.data?.message ||
        "Registration failed"
        );

        console.log(error);
    }
    };


  return (
    <>
    <PublicNavbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
        Create Account
        </h2>

        <form  onSubmit={handleSubmit}>

        <div className="mb-4">
            <label className="block mb-1 font-medium">
            Name
            </label>

            <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div className="mb-4">
            <label className="block mb-1 font-medium">
            Email
            </label>

            <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div className="mb-4">
            <label className="block mb-1 font-medium">
            Password
            </label>

            <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
            Create Account
        </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?
            <Link
                to="/login"
                className="ml-1 text-purple-600 font-medium hover:underline font-semibold"
            >
                Login
            </Link>
            </p>
    </div>
    </div>
    </>
  );
};

export default Register;