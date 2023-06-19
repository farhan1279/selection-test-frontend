import React, { useState, useEffect } from 'react';
import { getUser, updateUser, resendVerificationEmail } from '../api/user';

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    // Fetch user information when the component mounts
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      // Replace 'userId' with the actual user ID or get it from the authentication system
      const userId = 'userId';
      const userData = await getUser(userId);

      setFullName(userData.fullName);
      setBio(userData.bio);
      setUsername(userData.username);
      // Set the profile picture URL if available in the userData response
      if (userData.profilePicture) {
        setProfilePicture(userData.profilePicture);
      }
    } catch (error) {
      console.error(error);
      // Handle error state or display an error message to the user
    }
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };

  const handleUpdateUser = async () => {
    try {
      // Replace 'userId' with the actual user ID or get it from the authentication system
      const userId = 'userId';
      const userData = {
        fullName,
        bio,
        username,
      };

      await updateUser(userId, userData);
      // Handle success state or show a success message to the user
    } catch (error) {
      console.error(error);
      // Handle error state or display an error message to the user
    }
  };

  const handleResendVerificationEmail = async () => {
    try {
      // Replace 'userId' with the actual user ID or get it from the authentication system
      const userId = 'userId';

      await resendVerificationEmail(userId);
      // Handle success state or show a success message to the user
    } catch (error) {
      console.error(error);
      // Handle error state or display an error message to the user
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Profil Pengguna</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <img src={profilePicture} className="w-40 h-40 rounded-full mx-auto mb-4" />
              <label htmlFor="profilePicture" className="block text-gray-700 font-medium mb-2 text-center">
                Unggah Foto Profil
              </label>
              <input type="file" id="profilePicture" onChange={handleProfilePictureChange} className="mb-4" />

              <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
              <input type="text" id="fullName" value={fullName} onChange={handleFullNameChange} className="w-full p-2 border border-gray-300 rounded mb-4" />

              <label htmlFor="bio" className="block text-gray-700 font-medium mb-2">Bio</label>
              <textarea id="bio" value={bio} onChange={handleBioChange} className="w-full p-2 border border-gray-300 rounded h-32 mb-4" />

              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
              <input type="text" id="username" value={username} onChange={handleUsernameChange} className="w-full p-2 border border-gray-300 rounded mb-4" />

              <button onClick={handleResendVerificationEmail} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Kirim Email Verifikasi Ulang
              </button>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Informasi Pengguna</h2>
              <p className="text-gray-700 mb-2"><strong>Nama Lengkap:</strong> {fullName}</p>
              <p className="text-gray-700 mb-2"><strong>Bio:</strong> {bio}</p>
              <p className="text-gray-700 mb-2"><strong>Username:</strong> {username}</p>
              <p className="text-gray-700 mb-2"><strong>Email:</strong> han@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
