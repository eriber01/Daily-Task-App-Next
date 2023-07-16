import { task } from '../../../interfaces';
import { addDoc, collection, deleteDoc, doc, getDocs, where, updateDoc, query, getDoc } from "firebase/firestore";
import { database } from "../firebaseConfig";
import { toast } from "react-toastify";
import _ from "lodash";
import { successAndLoadingMessage } from '@/utils';
export interface reducerAction {
  dispatch: any
  actions: any
  actionsTask: any
}

interface saveAndGetTask {
  task: task
  getTask: reducerAction
}

interface updateDelete {
  id: string
  actions: any
  dispatch: any
  status?: number
}


const updateTask = async (task: task) => {
  const ref = doc(database, 'task', task?.id || '')

  try {
    toast.loading('Creating Task')

    await updateDoc(ref, {
      ...task,
    })

    successAndLoadingMessage("Task Updated")

  } catch (error) {
    toast.error('Error Updating Task')
  }

}


const saveTask = async ({ name, description, module, priority }: task) => {

  const userData = JSON.parse(sessionStorage.getItem('userData') || '')

  try {
    toast.loading('Creating Task')
    await addDoc(collection(database, "task"), {
      name,
      description,
      module,
      priority,
      email: userData.email,
      uid: userData.uid,
      status: 2
    })

    successAndLoadingMessage("Task Created")

  } catch (error) {
    toast.error('Error Creating the task')
  }

}

const getTasks = async ({ actions, dispatch }: reducerAction) => {

  const userData = JSON.parse(sessionStorage.getItem('userData') || '')

  let task: any = []

  const queries = query(collection(database, 'task'), where('uid', '==', userData.uid))
  const data = await getDocs(queries)
  data.forEach((doc) => {

    const obj = {
      ...doc.data(),
      id: doc.id
    }

    task.push(obj)
  })

  const tasks = _.orderBy(task, ['status', 'priority', 'name'], ['asc', 'asc', 'desc'])

  dispatch(actions(tasks))

}

const saveAndGetTask = async ({ task, getTask }: saveAndGetTask) => {
  if (task?.id?.length) {
    updateTask(task)
  } else {
    await saveTask(task)
  }

  await getTasks(getTask)
}

const deleteTasks = async ({ id, actions, dispatch }: updateDelete) => {

  toast.loading('Deleted Task')

  await deleteDoc(doc(database, "task", id));

  getTasks({ actions, actionsTask: actions, dispatch })

  successAndLoadingMessage("Task deleted")

}

export const updateStatus = async ({ actions, dispatch, id, status }: updateDelete) => {
  const ref = doc(database, 'task', id)

  toast.loading('Updating Task')

  await updateDoc(ref, {
    status
  })

  await getTasks({ actions, actionsTask: actions, dispatch })

  successAndLoadingMessage("Task Updated")

}

const getTasksUnique = async ({ id, actions, dispatch }: { id: string, actions: any, dispatch: any }) => {
  const docRef = doc(database, 'task', id)

  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const obj = {
      ...docSnap.data(),
      id
    }

    dispatch(actions(obj))
    return
  }

  toast.error('The task not found')

}

const getModules = async ({ getModule, dispatch }: { getModule: any, dispatch: any }) => {

  let modules: any = []

  const queries = query(collection(database, 'modules'))
  const data = await getDocs(queries)
  data.forEach((doc) => {

    const obj = {
      ...doc.data(),
    }

    modules.push(obj)
  })

  const modulesSort = modules.sort((a: any, b: any) => { return a.id - b.id })

  dispatch(getModule({ modules: modulesSort }))

}

const seedModules = async () => {
  const modules = [
    {
      id: 1,
      name: 'Sales'
    },
    {
      id: 2,
      name: 'Profiles'
    },
    {
      id: 3,
      name: 'Center'
    },
    {
      id: 4,
      name: 'Shopping'
    },
    {
      id: 5,
      name: 'Study'
    },
    {
      id: 6,
      name: 'Personal Tasks'
    },
    {
      id: 7,
      name: 'Others'
    }
  ]

  try {

    modules.map(async item =>
      await addDoc(collection(database, "modules"), {
        ...item
      })
    )
  } catch (error) {
    console.log("error: ", error);

  }
}

export { saveTask, getTasks, saveAndGetTask, deleteTasks, getTasksUnique, seedModules, getModules }