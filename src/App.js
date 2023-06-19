import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/login';
import Register from './Component/register';
import Profile from './page/profile';
import Post from './page/post'; 
import PostDetail from './page/postDetail';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<Post />} /> 
          <Route path="/postdetail" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
