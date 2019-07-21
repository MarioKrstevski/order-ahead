import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import api from '../../services/api';

import RestaurantPicker from './components/RestaurantPicker';
import Menu from './components/Menu';

function EmployeePage() {
  const { user } = useContext(AuthContext);
  const [dailyMenus, setDailyMenus] = useState([])
  const [menu, setMenu] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState("Enriko");

  useEffect(()=> {
    const getDailyMenus = async () => {
      const response = await api.fetchDailyMenus();
      console.log({response});
      setDailyMenus(response);
      setSelectedRestaurant("Forza");
      let dailyMenu = dailyMenus.filter((menu) => menu.restaurant !== selectedRestaurant)
      console.log('Daily Menu',dailyMenu)
      setMenu(dailyMenu)
      // console.log('[EmployyePage.js]',response);
    };
    getDailyMenus();
    
  
    
  },[])

  useEffect(()=>{
    // let dailyMenu = dailyMenus.filter((menu) => {
    //   console.log(menu.restaurant , selectedRestaurant)
    //   return menu.restaurant === selectedRestaurant
    // })
    // setMenu(dailyMenu)

    console.log('Menu', menu);
  },[selectedRestaurant])


  const restaurants = dailyMenus.map((menu) => {
      return menu.restaurant;
  })

  return(
    <div>
      <RestaurantPicker restaurants={restaurants} setSelectedRestaurant={setSelectedRestaurant}></RestaurantPicker>
      <Menu menu={menu} selectedRestaurant={selectedRestaurant}></Menu>
    </div>
  )
}
export default EmployeePage;
