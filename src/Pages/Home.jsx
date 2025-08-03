import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://social-wine-alpha.vercel.app/post')
      .then(res => setPosts(res.data))
      .catch(err => console.error('Failed to fetch posts:', err));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Public Post Feed</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post, idx) => (
          <div
            key={idx}
            className="border p-4 rounded-md shadow mb-4 bg-white"
          >
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{post.userName}</span> •{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <p className="mt-2 text-gray-800">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;