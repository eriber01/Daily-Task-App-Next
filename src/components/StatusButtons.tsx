import { addTask } from '@/redux/features/taskSlice'
import { useAppDispatch } from '@/redux/hooks'
import { deleteTasks, updateStatus } from '@/services/database'
import { NextPage } from 'next'
import 'tailwindcss/tailwind.css'
// import { myCustomStyle } from '../../tailwind.config.js';
import { task } from '../../interfaces';
import { returnStatus } from '@/utils'
// import { StatusDisplay } from './StatusDisplay'

interface Props {
  task: task
}
export const StatusButtons = ({ task }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <div className='flex pt-1 items-center mt-1 justify-between'>
      <div>
        {
          task.status != 1 &&
          <button type='button'
            className='button-green'
            onClick={() => updateStatus({ id: task.id || '', actions: addTask, dispatch, status: 1 })}
          >
            add in process
          </button>
        }
        <button type='button'
          className='button-yellow'
          onClick={() => updateStatus({ id: task.id || '', actions: addTask, dispatch, status: 3 })}
        >
          cancel
        </button>
        <button type="button"
          className="button-red"
          onClick={() => deleteTasks({ id: task.id || '', actions: addTask, dispatch })}
        >
          delete
        </button>
      </div>

      {
        <span className="button-white">{returnStatus(task?.status || 0)}</span>
      }

    </div>
  )
}
