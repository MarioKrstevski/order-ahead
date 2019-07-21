import axios from "axios";
// axios.defaults.baseURL = 'http://localhost:3030/';
//   axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
//   axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const instance = axios.create({
  baseURL: "http://localhost:3030/"
});

export default {
  login: async userData => {
    return instance
      .post("/login", {
        username: userData.email,
        password: userData.password
      })
      .then(res => {
        console.log("Res DAta", res.data);
        return res.data;
      })
      .catch(err => {
        console.log("Res DAta", err);
        return err;
      });
  },
  fetchDailyMenus: async userData => {
    return instance
      .get("/dailymenus")
      .then(res => {
        console.log("Res DAta", res.data);
        return res.data;
      })
      .catch(err => {
        console.log("Res DAta", err);
        return err;
      });
  },
  fetchMyOrder: async userData => {
    return instance
      .get("/myOrder")
      .then(res => {
        console.log("Res DAta", res.data);
        return res.data;
      })
      .catch(err => {
        console.log("Res DAta", err);
        return err;
      });
  },
  fetchDailyMenu2: async userData => {
    return instance
      .post("/dailymenus", {
        username: userData.email,
        password: userData.password
      })
      .then(res => {
        console.log("Res DAta", res.data);
        return res.data;
      })
      .catch(err => {
        console.log("Res DAta", err);
        return err;
      });
  },
  fetchDailyMenu3: async userData => {
    return instance
      .post("/dailymenus", {
        username: userData.email,
        password: userData.password
      })
      .then(res => {
        console.log("Res DAta", res.data);
        return res.data;
      })
      .catch(err => {
        console.log("Res DAta", err);
        return err;
      });
  }
};
