"use client"
import { FC } from 'react'
import Link from 'next/link';
import { LogoutFn } from '@/services/auth';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getUser } from '@/redux/features/userSlice';

export const NavBar: FC = () => {
  const user = useAppSelector(state => state.userSlice)
  const dispatch = useAppDispatch()

  return (
    <>
      <nav className='w-full bg-black h-14 flex justify-between items-center'>
        <ul className='flex justify-end items-center'>
          <li className='pl-3 text-xl text-white'>
            Daily Task App
          </li>
        </ul>
        <ul className='flex justify-end items-center'>
          <li className='pr-5'>
            {user.isLogin ?
              <button
                className='text-white sm:text-base text-sm px-4 py-1.5 rounded bg-red-500'
                onClick={() => LogoutFn({ actions: getUser, dispatch, actionsTask: [] })}
              >
                Logout
              </button>
              :
              <Link className='text-white sm:text-base text-sm px-4 py-1.5 rounded bg-blue-500' href={'/auth'}>Login</Link>
            }
          </li>
        </ul>
      </nav>
    </>
  )
}