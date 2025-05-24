import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
// import NavBar from './NavBar'

const SideBar = ({ selectedUser, setSelectedUser }) => {

    const navigate = useNavigate()

    return (
        <div className={`bg-[#8185b2]/10 h-full rounded-r-xl overflow-y-auto text-white ${selectedUser ? 'max-md:hidden' : ''}`}>

            {/* Navbar component */}
            <div className='sticky z-50 top-0'>
                <NavBar />
            </div>

            <div className='p-4 pt-2'>
                <div className='flex flex-col'>
                    {userDummyData.map((user, idx) => (
                        <div onClick={() => setSelectedUser(user)}
                            key={idx}
                            className={`relative flex items-center gap-2 pl-2 py-2 rounde cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && 'bg-[#282150]/50 rounded-xl transition-all'}`}>
                            <img src={user?.profilePic || assets.avatar_icon} alt=""
                                className='w-[48px] mr-2 aspect-[1/1] rounded-full'
                            />
                            <div className='flex flex-col leading-5'>
                                <p>{user?.fullName}</p>
                                {
                                    idx < 3 ?
                                        <span className='text-green-400 text-xs'>Online</span>
                                        :
                                        <span className='text-gray-300 text-xs'>Offline</span>
                                }
                            </div>
                            {idx > 2 && <p className='absolute top-4 right-4 text-xs h-5 flex justify-center items-center w-5 rounded-full bg-violet-700 '>{idx}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SideBar