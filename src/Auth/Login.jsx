import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {
      const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const {logIn}=useContext(AuthContext)
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    logIn(email,password)
    // TODO: Add backend login logic
  };
    return (
       <div className="flex items-center justify-center min-h-screen bg-sky-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-violet-600 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <NavLink to='/register' className="text-violet-600 hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
    );
};

export default Login;