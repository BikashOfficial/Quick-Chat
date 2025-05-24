import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {

  const [currState, setCurrState] = useState("Login")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isdataSubmitted, setIsdataSubmitted] = useState(false)

  const { login } = useContext(AuthContext)


  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (currState === 'Sign Up' && !isdataSubmitted) {
      setIsdataSubmitted(true)
      return;
    }

    login(currState === 'Sign Up' ? 'signUp' : 'login', { fullName, email, password, bio })

  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-xl'>
      {/* left side */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />
      {/* right side */}

      <form onSubmit={onSubmitHandler} className='border-2 text-white border-gray-400 py-6 px-10  flex flex-col gap-6 rounded-lg shadow-lg bg-black/20 max-md:mt-12'>

        <h2 className='font-medium text-2xl flex justify-between items-center'>{currState}
          {
            isdataSubmitted && <img onClick={() => setIsdataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />
          }
        </h2>

        {currState === 'Sign Up' && !isdataSubmitted && (
          <div className='flex flex-col gap-2'>
            <label htmlFor="fullname" className='text-sm'>
              Enter Full Name
            </label>
            <input
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              id='fullname'
              value={fullName}
              className='p-2 px-6 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600'
              placeholder='Enter Full Name'
              required
            />
          </div>

        )}

        {!isdataSubmitted && (
          <>
            <div className='flex flex-col gap-2'>
              <label htmlFor="email" className='text-sm'>
                Enter Email
              </label>
              <input
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder='Enter Email'
                className='p-2 px-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600'
                required
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="password" className='text-sm'>
                Enter Password
              </label>
              <input
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Enter Password'
                className='p-2 px-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600'
                required
              />
            </div>
          </>
        )}





        {
          currState === "Sign Up" && isdataSubmitted && (
            <div className='flex flex-col gap-2'>

              <label htmlFor="bio" className='text-sm'>
                Enter bio
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
          )
        }



        {
          currState === 'Sign Up' && isdataSubmitted &&
          <div className='flex items-center gap-2 text-sm text-gray-400 text-center'>
            <input type="checkbox" className='mt-0.5' required />
            <p> Agree to the <a href="" className='text-violet-500 font-medium cursor-pointer'>terms of use</a> & <a className='text-violet-500 font-medium cursor-pointer' href="">privacy</a></p>
          </div>
        }



        <button type='submit' className=' bg-gradient-to-r from-purple-600 to-violet-600 text-white border-none text-sm font-medium py-3 px-20 rounded-full cursor-pointer hover:scale-104 transition-all' >
          {
            currState === "Sign Up" ? "Create Account" : "Login Now"
          }
        </button>


        <div className='flex flex-col gap-2 text-sm text-center'>
          {currState === 'Sign Up' ? (
            <p onClick={() => { setCurrState("Login"); setIsdataSubmitted(false) }}>Already have an Account ? <span className='text-violet-500 font-medium cursor-pointer underline'>Login here</span></p>
          ) : (
            <p onClick={() => setCurrState("Sign Up")}>Don't have an Account ? <span className='text-violet-500 font-medium cursor-pointer underline'>Click here</span></p>
          )

          }
        </div>



      </form>

    </div>
  )
}

export default Login