import {Navigate,Outlet } from "react-router-dom";


const ProtectedRoute=() => {
    //get token from local storage
    const token =localStorage.getItem("token");

    if(token){
        return <Outlet />   //redirect to nested routers->dashboard
    }
    return <Navigate to ="/login" replace />  //if not logIn->No token ->login 
};

export default ProtectedRoute;