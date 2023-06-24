'use client'
import { useState } from 'react'
import { NextPage } from 'next';
import { Layout } from '@/components/layouts/Layout';
import { LoginWithGitHub, LoginWithGoogle, LoginWithUserAndPassword, createUserWithEmailAndPasswords } from '@/services/auth';
import { handlerChangeState } from '@/utils';
import { useRouter } from 'next/navigation';
import { PropsLoginForm } from '../../../interfaces';

const initialState: PropsLoginForm = {
  email: '',
  pass: '',
  isLogin: true
}

const LoginPage: NextPage = () => {

  const [state, setState] = useState(initialState)
  const { push } = useRouter()

  return (
    <Layout title='Daily Task App - Login'>
      <div style={{ height: '90vh' }} className={`w-full text-center flex justify-center items-center`} >
        <div className='w-11/12 border bg-white rounded-md m-5 shadow-2xl drop-shadow-2xl sm:w-5/12 md:w-5/12 xl:w-3/12'>
          <header className='flex flex-col justify-center items-center'>
            <div className='flex w-full justify-end p-1.5'>
            </div>
            <h5
              className='font-semibold mb-5 mt-5 py-1 bg-black w-8/12 rounded text-white text-center'
            >{state.isLogin ? 'Login' : 'Register'}</h5>
          </header>
          <div>
            <div className='flex flex-col justify-center items-center w-full'>
              <div className='flex justify-center flex-col w-10/12 '>
                <div className='flex flex-col justify-center mb-3'>
                  <label className='text-left text-sm' htmlFor="">Email</label>
                  <input
                    type="email"
                    id='email'
                    placeholder='Enter the Email'
                    className=' border rounded pl-4 focus:outline-blue-300'
                    autoComplete='false'
                    onChange={({ target: { value } }) => handlerChangeState({ state, setState, value, path: 'email' })}
                  />
                </div>

                <div className='flex flex-col justify-center mb-3'>
                  <label className='text-left text-sm' htmlFor="module">Password</label>
                  <input
                    disabled={state?.email?.length > 0 ? false : true}
                    type="password"
                    id='pass'
                    placeholder='Enter the Password'
                    className='border rounded pl-4 focus:outline-blue-300'
                    onChange={({ target: { value } }) => handlerChangeState({ state, setState, value, path: 'pass' })}
                  />
                </div>
              </div>

              <div className='text-left flex flex-col w-10/12 mb-16 mt-6'>
                <button
                  // disabled={state?.email?.length > 0 && state?.pass?.length > 0 ? false : true}
                  className='text-white bg-blue-700 hover:bg-blue-900 rounded-md text-base w-full py-0.5'
                  type='button'
                  onClick={() => {
                    state.isLogin ?
                      LoginWithUserAndPassword({ push, ...state })
                      :
                      createUserWithEmailAndPasswords({ ...state, push })
                  }}
                >
                  {state.isLogin ? 'Login' : 'Register'}
                </button>
                <button
                  onClick={() => {
                    handlerChangeState({ state, setState, value: !state.isLogin, path: 'isLogin' })
                  }}
                  className='text-sm text-left mb-5 mt-2 text-blue-500'>
                  {state.isLogin ? 'Are you not registered?' : 'You have a User?'}
                </button>
                <button
                  onClick={() => LoginWithGoogle({ push, ...state })}
                  className='border rounded text-black text-sm py-1.5'>
                  <div className="flex justify-center items-center">
                    <img className="w-5 mr-5" src="google.png" alt="" />
                    <span>Login With Google</span>
                  </div>
                </button>
                <button
                  onClick={() => LoginWithGitHub({ push, ...state })}
                  className='border rounded text-black text-sm py-1.5 mt-3'>
                  <div className="flex justify-center items-center">
                    <img className="w-5 mr-5" src="github.png" alt="" />
                    <span>Login With GitHub</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LoginPage