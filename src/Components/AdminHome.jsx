import React from 'react'
import RecentJobPost from './RecentJobPost'
import CountsAdmin from './CountsAdmin'

function AdminHome() {
  return (
    <div>
        <CountsAdmin/>
        <RecentJobPost/>
    </div>
  )
}

export default AdminHome