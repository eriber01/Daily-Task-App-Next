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

export default function Home() {
  const { task } = useAppSelector(state => state.taskSlice)
  const dispatch = useAppDispatch()
  const { push } = useRouter()

  useEffect(() => {
    validateIsLogin({ push, getTask: { actions: addTask, dispatch }, getUser })
  }, [])


  return (
    <main>
      <Layout title='Daily Task App'>
        <CreateTask />
        <header className='text-center flex justify-center mb-5 mt-5'>
          <h3 className='text-white text-center bg-black px-6 py-1 rounded text-lg'>Task</h3>
        </header>
        {
          task.map((item) => (
            <Tasks {...item} key={item.id} />
          ))
        }
      </Layout>
    </main>
  )
}
