import React from 'react'
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';


const Sidebar = () => {
    return (
        <div className="sider-bar">
            <Navbar />
            <Search />
            <Chats />
        </div>)
}

export default Sidebar