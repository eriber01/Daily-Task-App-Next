"use client"
import { FC } from 'react';
import { validateFormTask } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addTask } from '@/redux/features/taskSlice';
import { saveAndGetTask } from '@/services/database';
import { createUpdateTask, resetTask } from '@/redux/features/createUpdateTaskSlice';

export const CreateTask: FC = () => {
  const { createUpdateSlice: state } = useAppSelector(state => state)

  const dispatch = useAppDispatch()

  return (
    <div className='w-full text-center flex justify-center md:w-8/12 md:m-auto xl:w-7/12'>
      <div className='w-10/12 border bg-white rounded-md m-5 shadow'>
        <header className='text-left pl-5 border-b-2'>
          <h5 className='font-semibold mb-1 mt-2'>Create Task</h5>
          <p className='text-sm mb-1'>All Input of the Form is Obligatory</p>
        </header>

        <div className='mt-5 mb-7'>
          <form action="" autoComplete='false'>
            <div className='flex flex-col justify-center items-center w-full'>
              <div className='flex justify-center flex-col w-10/12 sm:flex-row sm:justify-between '>
                <div className='flex flex-col justify-center mb-3 sm:w-6/12 sm:mr-2'>
                  <label className='text-left text-sm' htmlFor="">Name</label>
                  <input
                    type="text"
                    id=''
                    placeholder='Enter the Task Name'
                    className=' border rounded pl-4 focus:outline-blue-300'
                    autoComplete='false'
                    value={state.name || ''}
                    required={true}
                    onChange={({ target: { value } }) => dispatch(createUpdateTask({ value, path: 'name' }))}
                  />
                </div>

                <div className='flex flex-col justify-center mb-3 sm:w-6/12'>
                  <label className='text-left text-sm' htmlFor="module">Module</label>
                  <input
                    type="text"
                    id='module'
                    placeholder='Enter the Module Name'
                    className='border rounded pl-4 focus:outline-blue-300'
                    value={state.module || ''}
                    onChange={({ target: { value } }) => dispatch(createUpdateTask({ value, path: 'module' }))}
                  />
                </div>
              </div>

              <div className='flex justify-center flex-col w-10/12 sm:flex-row sm:justify-between'>
                <div className='flex flex-col justify-center mb-3 sm:w-6/12 sm:mr-2'>
                  <label className='text-left text-sm' htmlFor="description">Description</label>
                  <textarea
                    name="" id="description" cols={30} rows={3}
                    className='border rounded pl-4 focus:outline-blue-300'
                    value={state.description || ''}
                    onChange={({ target: { value } }) => dispatch(createUpdateTask({ value, path: 'description' }))}
                  ></textarea>
                </div>

                <div className='flex flex-col justify-center mb-3 sm:w-6/12 sm:justify-end'>
                  <label className='text-left text-sm' htmlFor="">Priority</label>
                  <select name="" id=""
                    className='border rounded p-1.5 focus:outline-blue-300'
                    onChange={({ target: { value } }) => dispatch(createUpdateTask({ value, path: 'priority' }))}
                    value={state.priority}
                    defaultValue={state.priority}
                  >
                    <option value={0} disabled selected>Select a Priority</option>
                    <option value={1}>Hight</option>
                    <option value={2}>Normal</option>
                    <option value={3}>Slow</option>
                  </select>
                </div>
              </div>
              <div className='text-left w-10/12'>
                <button
                  className='text-white bg-blue-700 hover:bg-blue-900 rounded-md text-base px-4 py-1.5'
                  type='button'
                  onClick={() => {
                    // dispatch(addTask(state))
                    const validate = validateFormTask(state)
                    !validate && (
                      saveAndGetTask({ task: state, getTask: { actionsTask: addTask, actions: addTask, dispatch } })
                    )
                    dispatch(resetTask())
                  }}
                >
                  {state.id?.length ? 'Update Task' : 'Add Task'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div >
    </div >
  )
}
