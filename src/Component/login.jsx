import React, { useState } from 'react';
import { postLogin } from '../api/user';
import { useNavigate } from 'react-router-dom';
import { MdOutlineVisibilityOff } from 'react-icons/md';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validasi input
    if (!usernameOrEmail || !password) {
      setError('Username/Email dan Password harus diisi');
      setLoading(false);
      return;
    }

    try {
      const response = await postLogin({
        email: usernameOrEmail,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        alert('Login berhasil');
        console.log('Login berhasil');

        navigate('/profile');
      } else {
        setError(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('error blok:', error);
      alert('Error ketika melakukan login');
      setError('Login gagal. Silakan coba lagi nanti.');
    }

    setLoading(false);
  };

  const handleUsernameOrEmailChange = (e) => {
    setUsernameOrEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usernameOrEmail">
              Username/Email
            </label>
            <input
              className="border border-gray-300 p-2 w-full"
              type="text"
              id="usernameOrEmail"
              value={usernameOrEmail}
              onChange={handleUsernameOrEmailChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="border border-gray-300 p-2 w-full pr-10"
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <span className="absolute top-2 right-2 cursor-pointer" onClick={togglePasswordVisibility}>
                {passwordVisible ? <MdOutlineVisibilityOff className="h-5 w-5" /> : null}
              </span>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
