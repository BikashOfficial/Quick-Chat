import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const Profile = () => {

  const { authUser, updateProfile } = useContext(AuthContext)

  const [selectedImg, setSelectedImg] = useState(null)
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio })
      navigate('/')
      // toast.success('Updation Sucessfull')
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(selectedImg)
    reader.onload = async () => {
      const base64Img = reader.result;
      await updateProfile({ profilePic: base64Img, fullName: name, bio })
    }

    navigate('/')
    toast.success('Updation Sucessfull')


  }


  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center backdrop-blur-xl '>
      <div className='w-5/6 max-w-2xl bg-black/20 text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='relative flex flex-col gap-5 p-10 flex-1 '>
          <img src={assets.arrow_icon} className='w-7 absolute right-0 mr-10 cursor-pointer' onClick={() => navigate("/")} />
          <h3 className='text-xl font-medium'>Profile details</h3>
          <label htmlFor="avatar"
            className='flex border-4 py-2 px-4 rounded-4xl border-violet-600 items-center justify-center gap-5 cursor-pointer md:border-none bg-black/30 max-md:shadow-2xl'
          >
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept='.png, .jpg, .jpeg'
              hidden
            />
            <img src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.avatar_icon} alt="" className={` aspect-[1/1] object-center size-20 ${selectedImg && 'rounded-full'}`} />
            upload profile image
          </label>


          <div className='flex flex-col gap-2'>
            <label htmlFor="fullname" className='text-sm'>
              Update Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id='fullname'
              value={name}
              className='p-2 px-6 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600'
              placeholder='Enter Full Name'
              required
            />
          </div>


          <div className='flex flex-col gap-2'>

            <label htmlFor="bio" className='text-sm'>
              Update bio
            </label>

            <textarea rows={4}
              id='bio'
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              className='p-2 px-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 '
              placeholder='provide a short bio...'
              required
            />
          </div>


          <button type='submit' className=' bg-gradient-to-r from-purple-600 to-violet-600 text-white border-none text-sm font-medium py-3 px-20 rounded-full cursor-pointer hover:scale-104 transition-all' >
            Save
          </button>

        </form>
        {/* <img src={authUser?.profilePic} className='size-8' alt="" /> */}
      </div>
    </div>
  )
}

export default Profile