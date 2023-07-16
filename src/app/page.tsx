"use client"

import { CreateTask, Tasks } from '@/components'
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { Layout } from '@/components/layouts/Layout';
import { validateIsLogin } from '@/services/auth';
import { PropsUser } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getTasks } from '@/services/database';
import { addTask } from '@/redux/features/taskSlice';
import { getUser } from '@/redux/features/userSlice';
import { toggleModalTask } from '@/redux/features/uiSlice';
import { getModule } from '@/redux/features/moduleSlice';

export default function Home() {
  const { task } = useAppSelector(state => state.taskSlice)
  const dispatch = useAppDispatch()
  const { push } = useRouter()

  useEffect(() => {
    validateIsLogin({ push, getTask: { actions: addTask, dispatch }, getUser, getModule })
  }, [])

  //md:w-12/12 xl:w-12/12
  return (
    <main>
      <Layout title='Daily Task App'>
        <CreateTask />
        <div className='m-auto w-full flex justify-center items-center md:w-11/12 xl:w-10/12'>
          {/* <h3 className='text-white text-center bg-black px-6 py-1 rounded text-lg mb-5 mt-10'>Tasks</h3> */}
          <div className='flex justify-end mb-5 mt-10 w-10/12'>
            <button
              className='text-white bg-blue-700 hover:bg-blue-900 rounded-md text-base px-6 py-1.5 transition-all duration-500'
              onClick={() => dispatch(toggleModalTask({ isOpen: true }))}
            >Add Task</button>
          </div>
        </div>

        <div className='mb-5'>
          {
            task.map((item) => (
              <Tasks {...item} key={item.id} />
            ))
          }
        </div>
      </Layout>
    </main>
  )
}
