import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, createComment, getComments, likePost, unlikePost } from '../api/post';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState(''); // Define commentText state
  const [newComment, setNewComment] = useState(''); // Define newComment state

  // Fungsi untuk memuat detail postingan
  const fetchPostDetail = async () => {
    try {
      const response = await getPost(postId);
      const { success, message, post } = response.data;

      if (success) {
        setPost(post);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fungsi untuk membuat komentar
  const handleCreateComment = async () => {
    try {
      const response = await createComment(postId, { text: commentText });
      const { success, message, comment } = response.data;

      if (success) {
        setCommentText('');
        // Panggil fetchComments untuk memperbarui daftar komentar
        fetchComments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fungsi untuk memuat daftar komentar
  const fetchComments = async () => {
    try {
      const response = await getComments(postId);
      const { success, message, comments } = response.data;

      if (success) {
        setComments(comments);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fungsi untuk menyukai postingan
  const handleLikePost = async () => {
    try {
      const response = await likePost(postId);
      const { success, message, likes } = response.data;

      if (success) {
        setPost(prevPost => ({ ...prevPost, likes }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fungsi untuk tidak menyukai postingan
  const handleUnlikePost = async () => {
    try {
      const response = await unlikePost(postId);
      const { success, message, likes } = response.data;

      if (success) {
        setPost(prevPost => ({ ...prevPost, likes }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPostDetail();
    fetchComments();
  }, []);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Post Detail</h1>
      <div className="border rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Username: {post.username}</h3>
        <img src={post.media} alt="Post Media" className="my-2 max-w-full" />
        <p>Created Date: {post.createdAt}</p>
        <p>Likes: {post.likes}</p>
        <button
          onClick={handleLikePost}
          className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
        >
          Like
        </button>
        <button
          onClick={handleUnlikePost}
          className="bg-red-500 text-white rounded px-4 py-2 mt-4 ml-2"
        >
          Unlike
        </button>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Comments</h3>
        <ul>
          {comments.map(comment => (
            <li key={comment.id} className="border rounded p-4 mb-4">
              <p className="font-semibold mb-2">Username: {comment.username}</p>
              <p className="text-sm">Created Date: {comment.createdAt}</p>
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add a comment"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          className="border rounded px-4 py-2 mt-4"
        />
        <button
          onClick={handleCreateComment}
          className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
