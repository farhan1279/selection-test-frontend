import axios from 'axios';

export function getPost(postId) {
  return axios.get(`/api/posts/${postId}`);
}

export function createComment(postId, data) {
  return axios.post(`/api/posts/${postId}/comments`, data);
}

export function getComments(postId) {
  return axios.get(`/api/posts/${postId}/comments`);
}

// Tambahan API untuk fitur Like/Unlike
export function likePost(postId) {
  return axios.post(`/api/posts/${postId}/like`);
}

export function unlikePost(postId) {
  return axios.post(`/api/posts/${postId}/unlike`);
}
