import { createUpdateTask, resetTask } from "@/redux/features/createUpdateTaskSlice";
import { addTask } from "@/redux/features/taskSlice";
import { toggleModalTask } from "@/redux/features/uiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { saveAndGetTask } from "@/services/database";
import { validateFormTask } from "@/utils";
import React from "react";

interface moduleInterface {
  name: string
  id: number
}


export default function ModalCreateUpdateTask() {
  const { createUpdateSlice: state } = useAppSelector(state => state)
  const { moduleSlice } = useAppSelector(state => state)
  const { uiSlice: { isOpen } } = useAppSelector(state => state)

  const dispatch = useAppDispatch()

  console.log('modules: ', state);

  return (
    <>
      {isOpen ? (
        <>
          <div
            className="transition-all duration-1000 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none md:w-8/12 md:m-auto xl:w-7/12"
          >
            <div className="relative my-6 w-10/12">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h4 className="text-2xl font-semibold">
                    {state.id?.length ? 'Update Task' : 'Add Task'}
                  </h4>
                </div>
                {/*body*/}
                <div className='w-full text-center flex justify-center md:w-12/12 md:m-auto xl:w-12/12'>
                  <div className='bg-white w-full'>
                    {
                      /* <header className='text-left pl-5 border-b-2'>
                        <h5 className='font-semibold mb-1 mt-2'>Create Task</h5>
                        <p className='text-sm mb-1'>All Input of the Form is Obligatory</p>
                      </header> */
                    }
                    <div className='mt-5 mb-7 w-full'>
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

                            {/* <div className='flex flex-col justify-center mb-3 sm:w-6/12'>
                              <label className='text-left text-sm' htmlFor="module">Module</label>
                              <input
                                type="text"
                                id='module'
                                placeholder='Enter the Module Name'
                                className='border rounded pl-4 focus:outline-blue-300'
                                value={state.module || ''}
                                onChange={({ target: { value } }) => dispatch(createUpdateTask({ value, path: 'module' }))}
                              />
                            </div> */}
                            <div className='flex flex-col justify-center mb-3 sm:w-6/12 sm:justify-end'>
                              <label className='text-left text-sm' htmlFor="module">Module</label>
                              <select name="" id=""
                                className='border rounded p-1.5 focus:outline-blue-300'
                                onChange={({ target: { value } }) => dispatch(createUpdateTask({ value, path: 'module' }))}
                                value={state?.module}
                                defaultValue={state?.module}
                              >
                                <option value={''} disabled hidden>Select a Module</option>
                                {
                                  moduleSlice?.module?.map((item: moduleInterface) => (
                                    <option value={item.name}>{item.name}</option>
                                  ))
                                }
                              </select>
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
                                <option value={0} disabled hidden>Select a Priority</option>
                                <option value={1}>Hight</option>
                                <option value={2}>Normal</option>
                                <option value={3}>Slow</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div >
                </div >
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      dispatch(toggleModalTask({ isOpen: false }))
                      dispatch(resetTask())
                    }}
                  >
                    Close
                  </button>
                  {/* <div className='text-left w-10/12'> */}
                  <button
                    className='text-white bg-blue-700 hover:bg-blue-900 rounded-md text-base px-4 py-1.5'
                    type='button'
                    onClick={() => {
                      // dispatch(addTask(state))
                      const validate = validateFormTask(state)
                      !validate && (
                        saveAndGetTask({ task: state, getTask: { actionsTask: addTask, actions: addTask, dispatch } })
                      )

                      !validate && (
                        dispatch(toggleModalTask({ isOpen: false }))
                      )

                      dispatch(resetTask())
                    }}
                  >
                    {state.id?.length ? 'Update Task' : 'Add Task'}
                  </button>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}