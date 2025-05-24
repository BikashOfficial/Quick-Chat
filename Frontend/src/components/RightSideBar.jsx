import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSideBar = ({ selectedUser }) => {
  return selectedUser && (

    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-auto ${selectedUser ? "max-md:hidden" : ""}`}>

      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-30 aspect-[1/1] rounded-full border-3 shadow-2xl p-0.5 border-violet-700 m-1 hover:scale-104 transition-all' />
        <h1 className='text-white text-xl font-medium gap-2  px-10 mx-auto flex items-center'>
          <p className='w-2 h-2 rounded-full bg-green-500'></p>
          {selectedUser?.fullName}</h1>
        <p className='px-10 mx-auto text-gray-300'>{selectedUser?.bio}</p>
      </div>


      <hr className='border-[#ffffff50] my-4' />

      <div className='px-5 text-xs'>
        <p>Media</p>
        <div className='mt-2 max-h-[270px] overflow-y-auto grid grid-cols-2 gap-4 opacity-80'>
          {imagesDummyData.map((url, idx) => (
            <div key={idx} onClick={() => window.open(url)} className=' cursor-pointer rounded'>
              <img src={url} alt="img" className='h-full rounded-md' />
            </div>
          ))}
        </div>
      </div>

      <button className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-violet-600 text-white border-none text-sm font-medium py-2 px-20 rounded-full cursor-pointer hover:scale-104 transition-all'>
          Logout
      </button>

    </div>


  )
}

export default RightSideBar