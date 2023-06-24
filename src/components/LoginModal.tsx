import { useRouter } from 'next/router'
import React, { FC } from 'react'
// import { PropsLogin } from './NavBar'

interface Props {
  isOpen?: boolean
  close: (path: string, value: string | boolean) => void
}

export const LoginModal: FC<Props> = ({ isOpen, close }) => {

  return (
    <div className={`w-full text-center flex justify-center items-center h-full ${isOpen ? 'fixed bg-black bg-opacity-70' : 'hidden'}`} >
      <div className='w-11/12 border bg-white rounded-md m-5 shadow-2xl drop-shadow-2xl sm:w-5/12 md:w-5/12 xl:w-3/12'>
        <header className='flex flex-col justify-center items-center'>
          <div className='flex w-full justify-end p-1.5'>
            {/* <span className='w-1/12 border border-neutral-500 bg-black text-white rounded-full'>X</span> */}
            <button
              className='w-1/12 border border-neutral-500 bg-black text-white rounded-full'
              onClick={() => close('isOpen', false)}
            >
              X
            </button>
          </div>
          <h5
            className='font-semibold mb-5 mt-5 py-1 bg-black w-8/12 rounded text-white text-center'
          >Login</h5>
        </header>
        <div>
          {/* <form action=""> */}
          <div className='flex flex-col justify-center items-center w-full'>
            <div className='flex justify-center flex-col w-10/12 '>
              <div className='flex flex-col justify-center mb-3'>
                <label className='text-left text-sm' htmlFor="">Email</label>
                <input
                  type="email"
                  id=''
                  placeholder='Enter the Email'
                  className=' border rounded pl-4 focus:outline-blue-300'
                  autoComplete='false'
                />
              </div>

              <div className='flex flex-col justify-center mb-3'>
                <label className='text-left text-sm' htmlFor="module">Password</label>
                <input
                  type="password"
                  id='module'
                  placeholder='Enter the Password'
                  className='border rounded pl-4 focus:outline-blue-300'
                />
              </div>
            </div>

            <div className='text-left flex flex-col w-10/12 mb-16 mt-6'>
              <button
                className='text-white bg-blue-700 hover:bg-blue-900 rounded-md text-base w-full py-0.5'
                type='button'>
                Login
              </button>
              <button className='text-sm text-left mb-5 text-blue-500'>Are you not registered?</button>
              <button className='border rounded text-black text-sm py-1.5'>
                <div className="flex justify-center items-center">
                  <img className="w-5 mr-5" src="google.png" alt="" />
                  <span>Login With Google</span>
                </div>
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>

  )
}
