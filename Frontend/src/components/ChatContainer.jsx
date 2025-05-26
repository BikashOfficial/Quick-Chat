import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { formateMessageTime } from '../lib/utils'
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import toast from 'react-hot-toast'

const ChatContainer = () => {

  const { selectedUser, setSelectedUser, sendMessage, messages, getMessages } = useContext(ChatContext)
  const { authUser, onlineUsers } = useContext(AuthContext)

  const navigate = useNavigate()

  const scrollEnd = useRef()

  const [input, setInput] = useState('')

  //handle sending messages
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (input.trim() === "") {
      return null
    }

    await sendMessage({ text: input.trim() })
    setInput("")
  }

  //handle sending an image
  const handleSendImage = (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("please select an image")
      return;
    }

    const reader = new FileReader()

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result })
      e.target.value = ""
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser])

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])



  return selectedUser ? (
    <div className="h-full relative backdrop-blur-lg">
      <div className='sticky top-0 backdrop-brightness-0 flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={assets.arrow_icon} onClick={() => setSelectedUser(null)} className='cursor-pointer max-w-7' />
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className='w-10 rounded-full ' />

        <p className='flex-1 text-lg text-white flex items-center gap-2 just'>

          {selectedUser.fullName}

          {onlineUsers.includes(selectedUser._id) === true ?
            <span className='w-2 h-2 rounded-full bg-green-500 mt-1'></span> :
            <span className='w-2 h-2 rounded-full bg-gray-500 mt-1'></span>}
        </p>

        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />

      </div>


      {/* Chat area */}
      <div className='overflow-y-auto h-[calc(100vh-140px)] p-3 pb-20'>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
            {msg.image ? (
              <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
            ) : (
              <p className={`p-2 max-w-[200px] shadow-xl md:text-sm font-light rounded-lg mb-8 break-all
                ${msg.senderId === authUser._id ? 'bg-violet-600' : 'bg-black border-2 border-violet-700'}
                text-white
                ${msg.senderId === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}
              `}>
                {msg.text}
              </p>
            )}

            <div className='text-center text-xs'>
              <img
                src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon}
                alt=""
                className='w-7 rounded-full'
              />
              <p className='text-gray-500'>{formateMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}>

        </div>
        {/* bottom area */}

      </div>
      <div className='absolute z-50 pb-4 bg-violet-900 backdrop-blur-2xl pt-4 px-4 bottom-0 left-0 right-0 flex items-center gap-3 rounded-t-2xl'>
        <div className='flex justify-center items-center flex-1 bg-gray-800 px-3 rounded-full border border-violet-600'>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? handleSendMessage(e) : null}
            type="text"
            placeholder='Enter Message...'
            className='flex-1 text-sm p-3 bg-transparent border-none rounded-lg text-white placeholder-gray-300 outline-none focus:ring-0'
          />
          <input
            type="file"
            id='image'
            onChange={handleSendImage}
            accept='image/png,image/jpeg,img/jpg'
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className='w-5 mr-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity'
            />
          </label>
        </div>
        <img
          src={assets.send_button}
          onClick={handleSendMessage}
          alt=""
          className='w-10 cursor-pointer hover:scale-105 transition-transform'
        />
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