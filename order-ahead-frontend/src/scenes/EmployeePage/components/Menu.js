import React from 'react';

function Menu({dailyMenu, selectedRestaurant}){

    const foods = dailyMenu.food.map(food => {
        return <div key={food.name}>
            <span>{food.category}</span>
            <span>{food.name}</span>
            <input type={"radio"} name={food.name} />
        </div>
    })
    return (
        <div>
            <h2>{selectedRestaurant}</h2>
            {foods}
        </div>
    )
}

export default Menu;