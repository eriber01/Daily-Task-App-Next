"use client"
import { FC, useEffect, useState } from 'react'
import { StatusButtons } from './StatusButtons'
import { task } from '../../interfaces';
import { showPriority } from '@/utils'
import { getTasksUnique, updateStatus } from '@/services/database';
import { addTask } from '@/redux/features/taskSlice';
import { useAppDispatch } from '@/redux/hooks';
import { getTaskForEdit } from '@/redux/features/createUpdateTaskSlice';
import { toggleModalTask } from '@/redux/features/uiSlice';

interface Props {
  more: boolean,
  checked: boolean
}

const Tasks: FC<task> = (task: task) => {
  const [state, setState] = useState<Props>({ more: false, checked: false })
  const dispatch = useAppDispatch()

  useEffect(() => {
    setState(pre => ({
      ...pre,
      checked: task.status === 4 ? true : false
    }))
  }, [task])

  return (
    <div className='w-full text-center flex flex-col justify-center items-center md:w-10/12 md:m-auto xl:w-7/12'>
      <div className='w-10/12 border bg-white rounded-md m-2 shadow flex items-baseline justify-center py-2'>
        <div className='mr-2'>
          <input
            type="checkbox" name="" id="" className='rounded'
            checked={state.checked}
            onClick={() => {
              updateStatus({ id: task.id || '', actions: addTask, dispatch, status: state.checked ? 2 : 4 })
            }}
          />
        </div>
        <div className='flex flex-col w-11/12'>
          <div className={`border-b pb-1 text-left overflow-hidden`}>
            <div className='flex flex-col items-center sm:flex-row justify-between'>
              <span className={`break-all pr-1 text-sm pl-1 sm:text-sm md:text-sm xl:text-base ${state.checked && 'line-through'}`}>
                {task.name}
              </span>
              <div className='w-9/12 sm:w-9/12 sm:text-right sm:pr-2'>
                <span
                  className="button-white"
                >
                  {showPriority(task.priority)}
                </span>
                <button type='button'
                style={{backgroundColor: '#5A96E3'}}
                  className='button-purple'
                  onClick={() => setState(pre => ({ ...pre, more: !state.more }))}
                >
                  Details
                </button>
                <button type='button'
                  className='button-gray'
                  onClick={() => {
                    getTasksUnique({ id: task?.id || '', dispatch, actions: getTaskForEdit })
                    dispatch(toggleModalTask({ isOpen: true }))
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
            <div className={`flex pr-1 flex-col justify-evenly items-start overflow-hidden transition-all duration-500 ease-in-out ${!state.more ? 'h-0' : 'h-48'}`}>
              <h5 className='border-b font-bold text-md'>Description</h5>
              <p className='break-all'>
                {task.description}
              </p>

              <h5 className='border-b font-bold text-md'>Module</h5>
              <p>
                {task.module}
              </p>
            </div>
          </div>
          <StatusButtons task={task} />
        </div>
      </div>
    </div >
  )
}

export default Tasks