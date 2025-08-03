import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [postInfo, setPostInfo] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://social-wine-alpha.vercel.app/post/${user.email}`)
        .then(res => setPostInfo(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">My Profile</h2>
      <p><strong>Name:</strong> {user?.displayName}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <hr className="my-4" />

      <h3 className="text-xl font-semibold mb-2">My Posts</h3>
      {postInfo.length === 0 ? (
        <p>You haven't posted anything yet.</p>
      ) : (
        postInfo.map((post, idx) => (
          <div key={idx} className="border p-4 rounded-md shadow mb-4 bg-white">
            <p className="text-sm text-gray-600">{new Date(post.createdAt).toLocaleString()}</p>
            <p className="mt-2 text-gray-800">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyProfile;
