import axios from 'axios';


export function postRegister(data) {
  return axios.post(
    process.env.REACT_APP_API + '/register',
    {
      name: data.name,
      email: data.email,
      password: data.password,
    }
  );
}
export function postResendVerificationEmail(data) {
  return axios.post(
    process.env.REACT_APP_API + '/resend-verification-email',
    {
      email: data.email,
    }
  );
}


export function postLogin(data) {
  return axios.post(
    process.env.REACT_APP_API + '/login',
    {
      email: data.email,
      password: data.password,
    }
  );
}

export function getUser(userId) {
  return axios.get(`${process.env.REACT_APP_API}/user/${userId}`);
}

export function updateUser(userId, userData) {
  return axios.put(`${process.env.REACT_APP_API}/user/${userId}`, userData);
}

export function resendVerificationEmail(userId) {
  return axios.post(`${process.env.REACT_APP_API}/user/${userId}/resend-verification-email`);
}



