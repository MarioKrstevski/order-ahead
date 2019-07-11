import axios from 'axios';

export default {
    login: async(userData) => {
        return axios.post('https://reqres.in/api/login', {
          "email": "eve.holt@reqres.in",
          "password": "cityslicka"
      })
        .then(res => {
            return res.data;
          })
          .catch(err => {
            return err;
          });
    }
};