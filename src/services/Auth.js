import axios from 'axios';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.status == 401) {
    Auth.logout();
  }
});

export const Auth = {
  authenticated() {
    return !!localStorage.getItem('token');
  },
  login({ email, password }) {
    return axios.post(`https://mbma-api.herokuapp.com/login`, { email, password })
      .then((res) => {
        if (res.data.error) {
          alert("Login Failed")
        }
        else {
          let { token, user } = res.data;
          localStorage.setItem('profile', JSON.stringify(user));
          localStorage.setItem('token', token);
          axios.interceptors.request.use((config) => {
            config.headers['authorization'] = `Bearer ${token}`;
            return config;
          });
        }

      });
  },
  regist({ email, password, fullname, passwordCF }) {
    return axios.post(`https://mbma-api.herokuapp.com/regist`, { email, password, fullname })
      .then((res) => {
        console.log(res);
      });
  },
  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    axios.interceptors.request.use((config) => {
      delete config.headers['authorization'];
      return config;
    });
    window.location = '/';
  }
};
