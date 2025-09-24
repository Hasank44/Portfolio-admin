import React, {  useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authImg from '../../assets/images/Authentication.svg';
import axios from 'axios';
import { Message } from '../../context/MessageContext';

const Login = () => {
  const { toast } = useContext(Message);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const url = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${url}/admin/login`, {
        email,
        password,
      });
      console.log(response)
      toast.success(response.data.message);
      const token = response.data.token;
      localStorage.setItem('auth_token', token);
      setFormData({
        email: '',
        password: '',
      });

      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 3500);
    } catch (error) {
      console.log(error)
      const errorMessage =
        error.response?.data?.message || 'Server busy please try to login.';
      toast.error(errorMessage);
    };
  };

  return (
    <div className="h-auto w-full py-5 items-center justify-center bg-gray-100 block md:flex">
      <img src={authImg} alt="Authentication illustration" className="w-[50%] mx-auto lg:h-100" />
      <div className="max-w-md w-full bg-white p-5 mx-auto rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
