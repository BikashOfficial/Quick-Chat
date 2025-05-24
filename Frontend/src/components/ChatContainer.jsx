import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { formateMessageTime } from '../lib/utils'

const ChatContainer = ({ selectedUser, setSelectedUser,rsBar,setRsBar }) => {

  const navigate = useNavigate()

  const scrollEnd = useRef()

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  

  return selectedUser ? (
    <div className={` h-full overflow-auto relative backdrop-blur-lg `}>
      <div className='sticky top-0 backdrop-brightness-0 flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={assets.arrow_icon} onClick={() => setSelectedUser(null)} className='cursor-pointer max-w-7' />
        <img src={assets.profile_martin} alt="" className='w-10 rounded-full ' />
        <p className='flex-1 text-lg text-white flex items-center gap-2 just'>Martin Jonson
          <span className='w-2 h-2 rounded-full bg-green-500 mt-1'></span>
        </p>
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />

      </div>


      {/* Chat area */}
      <div className=' flex flex-col h-calc(100%-120px)] p-3 pb-6'>
        {messagesDummyData.map((msg, idx) => (
          <div key={idx} className={`flex items-end gap-2 justify-end ${msg.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}`}>
            {msg.image ? (
              <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
            ) : (
              <p className={`p-2 max-w-[200px] shadow-xl md:text-sm font-light rounded-lg mb-8 break-all ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? 'bg-violet-600' : 'bg-black border-2 border-violet-700'} text-white ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
            )}

            <div className='text-center text-xs'>
              <img src={msg.senderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin} alt="" className='w-7 rounded-full' />
              <p className='text-gray-500'>{formateMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
        {/* bottom area */}

      </div>
      <div className='sticky z-60 pb-4 bg-violet-900 backdrop-blur-2xl pt-4 px-4 bottom-0 left 0 right-0 flex items-center gap-3 rounded-t-2xl'>
        <div className='flex justify-center items-center flex-1 bg-gray-900 px-3 rounded-full'>
          <input type="text" placeholder='Enter Message...' className='flex-1 text-sm p-3 border-none rounded-lg text-white placeholder-gray-400   outline-none' />
          <input type="file" id='image' accept='image/png,image/jpeg,img/jpg' hidden />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer' />
          </label>
        </div>
        <img src={assets.send_button} alt="" className='w-10 cursor-pointer' />
      </div>



    </div>
  ) : (

    
    
    
    <div className=' flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} alt="" className='max-w-20' />
      <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
    
  )
}

export default ChatContainer