import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

export default function OnlyAdminPrivateRouter() {
    const {currentUser} = useSelector((state) => state.user)
    return currentUser && (currentUser.isAdmin || currentUser.isNGO || currentUser.isStakeholder) ? (
        <Outlet />
       ) : (
        <Navigate to='/sign-in' />
       );
       
}


