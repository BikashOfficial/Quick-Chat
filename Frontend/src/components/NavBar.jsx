import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const NavBar = ({ input, setInput }) => {

    const { logout } = useContext(AuthContext)

    const navigate = useNavigate()

    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className={`w-full bg-violet-700 shadow-lg py-3 px-6 rounded-bl-2xl rounded-br-2xl border-3 border-transparent z-10`}>
            <div className='flex justify-between items-center'>
                <img src={assets.logo} alt="logo" className='max-w-40' />
                <div className='relative py-2 group'>
                    <img onClick={() => setShowMenu(!showMenu)} src={assets.menu_icon} alt="Menu" className='max-h-5 cursor-pointer' />

                    <div className={`absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 ${showMenu === true ? "" : 'hidden'} `}>
                        <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
                        <hr className='my-2 border-t border-gray-500' />
                        <p onClick={() => logout()} className='cursor-pointer text-sm'>Logout</p>
                    </div>

                </div>
            </div>

            <div className='bg-[#282142] rounded-full flex items-center gap-2 px-4 py-3 mt-5'>
                <img src={assets.search_icon} alt="" className='w-4 mr-1' />
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    className='bg-transparent border-none outline-none text-white text-md placeholder-[#c8c8c8] flex-1'
                    placeholder='Search User...'
                />
            </div>
        </div>
    )
}

export default NavBar