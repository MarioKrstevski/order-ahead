import React from 'react';

function Menu({menu, selectedRestaurant}){

    const foods = menu.map(food => {
        return <div key={food.foodName}>
            <span>{food.category}</span>
            <span>{food.foodName}</span>
            <input type={"radio"} name={food.foodName} />
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