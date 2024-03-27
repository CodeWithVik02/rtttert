import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateUser from '../CreateUser/CreateUser'
import Sidebar from '../../components/SideBar/sideBar'
import Dashboard from '../Dashboard/dashboard'
import NotFound from '../NotFound'
import Project from './test'
import AdminComponent from 'pages/AdminDashboard/AdminComponent'

export default function PrivatePages({isLogged, userData, isMobile , isAdmin}) {

  return (
    <div style={{display:"flex"}}>
        <Sidebar isLogged={isLogged} userData={userData}/>
        <Routes>
            <Route path="/dashboard/home" exact element={isAdmin ? <AdminComponent/> : <Dashboard/>}/>
            <Route path="/dashboard/createUser" exact element={isLogged && userData && userData[0].type == "admin" ? <CreateUser isMobile={isMobile} userData={userData}/> : null} />

            <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} />
        </Routes>
    </div>
  )
}
