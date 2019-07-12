import axios from "axios";
// axios.defaults.baseURL = 'http://localhost:3030/';
//   axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
//   axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const instance = axios.create({
  baseURL: 'http://localhost:3030/',
  
});

export default {
  login: async userData => {
    return instance
      .post("/login", {
        username: userData.email,
        password: userData.password
      })
      .then(res => {
        console.log('Res DAta' , res.data);
        return res.data;
      })
      .catch(err => {
        console.log('Res DAta' , err);
        return err;
      });
  }
};
