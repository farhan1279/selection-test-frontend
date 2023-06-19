import React, { useState } from 'react';
import { postRegister, postResendVerificationEmail } from '../api/user';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validasi email
    if (!email) {
      setError('Email harus diisi');
      setLoading(false);
      return;
    }

    // Validasi format email
    if (!isValidEmail(email)) {
      setError('Format email tidak valid');
      setLoading(false);
      return;
    }

    // Validasi username
    if (!username) {
      setError('Username harus diisi');
      setLoading(false);
      return;
    }

    // Validasi password
    if (!password) {
      setError('Password harus diisi');
      setLoading(false);
      return;
    }

    // Validasi panjang password
    if (password.length < 8) {
      setError('Password harus terdiri dari minimal 8 karakter');
      setLoading(false);
      return;
    }

    // Validasi ulangi password
    if (!repeatPassword) {
      setError('Repeat Password harus diisi');
      setLoading(false);
      return;
    }

    if (password !== repeatPassword) {
      setError('Password dan Repeat Password tidak cocok');
      setLoading(false);
      return;
    }

    try {
      const response = await postRegister({
        name: username,
        email,
        password,
      });

      if (response.success) {
        alert('Registrasi berhasil');
        console.log('Registrasi berhasil');
        navigate('/login');
      } else {
        setError(response.message);
        const { message } = response.data;
        alert(message);
      }
    } catch (error) {
      console.error('error blok:', error);
      alert('Error ketika melakukan registrasi');
      setError('Registrasi gagal. Silakan coba lagi nanti.');
    }

    setLoading(false);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Create Your Account</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="border border-gray-300 p-2 w-full"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border border-gray-300 p-2 w-full"
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="border border-gray-300 p-2 w-full"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repeat-password">
              Repeat Password
            </label>
            <input
              className="border border-gray-300 p-2 w-full"
              type="password"
              id="repeat-password"
              value={repeatPassword}
              onChange={handleRepeatPasswordChange}
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
