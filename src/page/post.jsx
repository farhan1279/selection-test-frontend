import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const [media, setMedia] = useState('');
  const [caption, setCaption] = useState('');
  const [postId, setPostId] = useState('');
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      const newPosts = response.data;
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setLoading(false);
      setHasMore(newPosts.length > 0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    if (!loading && hasMore) {
      fetchPosts();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const createPost = async () => {
    try {
      const response = await axios.post('/api/posts', { media, caption });
      const { success, message, post } = response.data;

      if (success) {
        setMessage(message);
        setMedia('');
        setCaption('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editPost = async () => {
    try {
      const response = await axios.put(`/api/posts/${postId}`, { caption });
      const { success, message, post } = response.data;

      if (success) {
        setMessage(message);
        setCaption('');
        setPostId('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async () => {
    try {
      const response = await axios.delete(`/api/posts/${postId}`);
      const { success, message } = response.data;

      if (success) {
        setMessage(message);
        setPostId('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gray-200 p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
        <input
          type="text"
          placeholder="Media"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
          className="border rounded px-4 py-2 mb-2"
        />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border rounded px-4 py-2 mb-4"
        />
        <button onClick={createPost} className="bg-blue-500 text-white rounded px-4 py-2">
          Create Post
        </button>
      </div>

      <div className="bg-gray-200 p-8 rounded shadow-lg mt-4">
        <h2 className="text-2xl font-bold mb-4">Edit a Post</h2>
        <input
          type="text"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="border rounded px-4 py-2 mb-2"
        />
        <input
          type="text"
          placeholder="New Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border rounded px-4 py-2 mb-4"
        />
        <button onClick={editPost} className="bg-blue-500 text-white rounded px-4 py-2">
          Edit Post
        </button>
      </div>

      <div className="bg-gray-200 p-8 rounded shadow-lg mt-4">
        <h2 className="text-2xl font-bold mb-4">Delete a Post</h2>
        <input
          type="text"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="border rounded px-4 py-2 mb-4"
        />
        <button onClick={deletePost} className="bg-red-500 text-white rounded px-4 py-2">
          Delete Post
        </button>
      </div>

      {message && <p className="mt-4 text-red-500">{message}</p>}
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border p-4"
            onClick={() => handlePostClick(post.id)}
          >
            <h3 className="text-lg font-semibold">{post.username}</h3>
            <img src={post.media} alt="Post Media" className="my-2 max-w-full" />
            <p>Created: {post.createdAt}</p>
            <p>Likes: {post.likes}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && !hasMore && <p>No more posts</p>}
    </div>
  );
};

export default Post
