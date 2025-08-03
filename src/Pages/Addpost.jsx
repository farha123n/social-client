import React, { useState, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      userName: user?.displayName,
      email: user?.email,
      content,
      createdAt: new Date().toISOString(),
    };

    try {
      const result = await axios.post('https://social-wine-alpha.vercel.app/post', postData);
      console.log(result.data);
      alert('Post submitted!');
      setContent('');
      navigate('/');
    } catch (error) {
      console.error('Post submission error:', error);
      alert('Failed to submit post.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Post</h2>
      <div className="mb-4">
        <p><span className="font-medium">User:</span> {user?.displayName}</p>
        <p><span className="font-medium">Email:</span> {user?.email}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Post Content</label>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Write your post..."
            rows="5"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
