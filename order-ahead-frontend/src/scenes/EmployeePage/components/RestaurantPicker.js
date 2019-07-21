import React from 'react';

function RestaurantPicker({restaurants, setSelectedRestaurant}){

    const buttons = restaurants.map((restaurant)=>{
        return <button key={restaurant} onClick={() => setSelectedRestaurant(restaurant)}>{restaurant}</button>
    })
    return (
        <div>
           {buttons}
        </div>
    )
}

export default RestaurantPicker;