import { addTask } from '@/redux/features/taskSlice'
import { useAppDispatch } from '@/redux/hooks'
import { deleteTasks, updateStatus } from '@/services/database'
import { NextPage } from 'next'
import 'tailwindcss/tailwind.css'
// import { myCustomStyle } from '../../tailwind.config.js';
import { task } from '../../interfaces';
// import { returnStatus } from '@/utils'
// import { StatusDisplay } from './StatusDisplay'

interface Props {
  task: task
}

const ReturnStatus = ({ id }: { id: number }) => {

  switch (id) {
    case 1:
      return <span className={`p-0.5 px-4 rounded-full bg-green-700 text-white`}>In Process</span>;
    case 4:
      return <span style={{backgroundColor: '#0A6EBD'}} className={`p-0.5 px-4 rounded-full text-white border-none`}>Complete</span>;
    case 2:
      return <span style={{backgroundColor: '#9BABB8'}} className={`p-0.5 px-4 rounded-full text-white border-none`}>Pending</span>;
    case 3:
      return <span className={`p-0.5 px-4 rounded-full bg-yellow-500 text-white`}>Canceled</span>;
    default:
      return <span></span>;
  }
}

export const StatusButtons = ({ task }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <div className='flex pt-1 items-center mt-1 justify-between'>
      <div>
        {
          task.status != 1 &&
          <button type='button'
            className='button-green p-1 px-2'
            onClick={() => updateStatus({ id: task.id || '', actions: addTask, dispatch, status: 1 })}
          >
            Add in Process
          </button>
        }
        <button type='button'
          className='button-yellow p-1 px-2'
          onClick={() => updateStatus({ id: task.id || '', actions: addTask, dispatch, status: 3 })}
        >
          Cancel
        </button>
        <button type="button"
          className="button-red p-1 px-2"
          onClick={() => deleteTasks({ id: task.id || '', actions: addTask, dispatch })}
        >
          Delete
        </button>
      </div>

      <div>
        {/* <span className={`button-white p-1 px-4 rounded-full`}>{returnStatus(task?.status || 0)}</span> */}
        <ReturnStatus id={task?.status || 0}/>
      </div>


    </div>
  )
}
