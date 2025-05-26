import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import ChatContainer from '../components/ChatContainer'
import RightSideBar from '../components/RightSideBar'

const Home = () => {

  const [selectedUser, setselectedUser] = useState(false)
  // const [rsBar,setRsBar] = useState(false)

  return (
    <div className='border w-full h-screen sm:px-[10%] sm:py-[3%]'>
      <div className={`grid grid-cols-1 relative h-[100%] overflow-hidden mr-0.5 rounded-2xl md:border-2 border-gray-600 backdrop-blur-md ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]': 'md:grid-cols-2'}`}>
        <SideBar />
        <ChatContainer />
        <RightSideBar selectedUser={selectedUser} />
      </div>
    </div>
  )
}

export default Home