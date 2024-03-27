import React from 'react';
// import {Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebase-config';
import Sidebar from '../SideBar/sideBar';
function PrivateRoute({ children , userData, isAuth, isMobile }) {
    return !!auth.currentUser ?
        <div style={{display:"flex"}}>
            <Sidebar userData={userData} isAuth={isAuth} isMobile={isMobile} noSideBarRoutes={["/clubs", "/events", "/projects", "/signIn", "/forgetPass" , '/admindash']}/>
            {children}
        </div>
        : null;
}
export default PrivateRoute;
