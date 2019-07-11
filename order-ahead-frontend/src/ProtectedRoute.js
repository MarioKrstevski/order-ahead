import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { navigate  } from "@reach/router";

function ProtectedRoute({component:Component, prevLocation, allowed, authenticatedOnly, path, ...rest}){

    console.log(Component);
    console.log('Previous Location: ', prevLocation)
    const { user } = useContext(AuthContext);

    if(user.isAuthenticated !== authenticatedOnly){
        user.isAuthenticated ?  window.history.back() : navigate('/') ;
    }

    if(allowed.includes(user.role) || allowed.includes("all")){
        return <Component {...rest} />
    } else {
        alert('You don\'t have access to that resource');
        return null;
    }
}

export default ProtectedRoute;
