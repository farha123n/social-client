import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
const {createUser,user,setUser,updateUser,googleSignIn}=useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Firebase sign up
    const res = await createUser(formData.email, formData.password);

    // User info to send to backend
    const userINfo = {
      name: formData.name,
      email: formData.email,
      bio: formData.bio
    };

    // Post to Mongo backend
    await axios.post('https://social-wine-alpha.vercel.app/user', userINfo);

    // Optional: update Firebase user profile
    await updateUser({ displayName: formData.name });

    // Set user in context
    setUser({ ...res.user, displayName: formData.name });

    alert("Registration successful!");
    navigate("/");
  } catch (err) {
    console.error("Registration error:", err);
    alert(err.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-violet-600 mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-violet-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;