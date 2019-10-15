import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { navigate  } from "@reach/router";

function ProtectedRoute({component:Component, prevLocation, allowed, authenticatedOnly, path, ...rest}){
    // console.log(Component);
    // console.log('Previous Location: ', prevLocation)
    const { user } = useContext(AuthContext);

    if(user.isAuthenticated !== authenticatedOnly){
        console.log("1")
        user.isAuthenticated ?  window.history.back() : navigate('/') ;
    }

    if(allowed.includes("all") || allowed.includes(user.role)){
        console.log("2")

        return <Component {...rest} />
    } else {
        console.log("3")
        return null;
    }
}

export default ProtectedRoute;
