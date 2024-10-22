import React from 'react'
import { useUser } from '../context/context'

const Dashboard = () => {
    const {user} = useUser();
  return (
    <>
    <div>{user?.username}</div>
    <div>{user?.email}</div>
    </>
  )
}

export default Dashboard