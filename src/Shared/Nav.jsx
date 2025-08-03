import React, { useContext } from 'react';
import { IoShareSocialSharp } from 'react-icons/io5';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const Nav = () => {
     const {user,signOutUser}=useContext(AuthContext)
   const  navigate=useNavigate()
 const  handleSignOut=()=>{
    signOutUser()
    alert('Log out Successfully')

       navigate('/')
 }
    const links=
        <>
        <li className='text-xl  gap-3'><NavLink to='/'>Home</NavLink></li>
    { user&&   <li className='text-xl   gap-3'><NavLink to='/myProfile'>my profile</NavLink></li>}
     {user&&   <li className='text-xl   gap-3'><NavLink to='/addPost'>Add post</NavLink></li>}
        </>
    
    return (
        <div className="navbar bg-gray-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                      {}links
                    </ul>
                </div>
                <a className=" text-violet-800 text-4xl">Social v  <IoShareSocialSharp  className='text-4xl text-violet-600 inline-block'/></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {links}
                </ul>
            </div>
            <div className="navbar-end">
                {user?<button onClick={handleSignOut} className='text-violet-500'>logOut</button>:<button className='text-violet-500'><NavLink to='/login'>login</NavLink></button>}
          
            </div>
        </div>
    );
};

export default Nav;