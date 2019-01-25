import axios from 'axios';

export default {
    login: async(userData) => {
        return axios.post('https://reqres.in/api/login', userData)
        .then(res => {
            return res.data;
          })
          .catch(err => {
            return err;
          });
    }
};