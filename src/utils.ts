import { handlerProps, handlerPropsTask, task } from '../interfaces';
import { toast } from 'react-toastify';

//state handler
const handlerChangeState = ({ state, setState, value, path }: handlerProps) => {
  setState(prev => ({
    ...prev,
    [path]: value
  }))
}

const handlerTakState = ({ state, setState, value, path }: handlerPropsTask) => {
  setState(prev => ({
    ...prev,
    [path]: value
  }))
}

//manage message error login
const loginErrorMessageHandler = ({ code }: { code: string }) => {

  switch (code) {
    case 'auth/account-exists-with-different-credential':
      toast.error('The email exist with other method of login')
      return;
    case 'auth/wrong-password':
      toast.error('Wrong Password')
      return;
    case 'auth/user-not-found':
      toast.error('Email not found')
      return;
    case 'auth/email-already-in-use':
      toast.error('The user Exist')
      return;
    case 'auth/weak-password':
      toast.error('The password is weak')
      return;
    default:
      toast.error('Login Error')
      return;
  }
}

//validate the form not empty
const validateFormTask = (task: task) => {
  if (!task.name.trim()) {
    toast.error('Not found the Name of Task')
    return true
  } else if (!task.module.trim()) {
    toast.error('Not found the Module of Task')
    return true
  } else if (!task.description.trim()) {
    toast.error('Not found the Description of Task')
    return true
  } else if (task.priority === '0' || task.priority === null) {
    toast.error('Not Select the Priority')
    return true
  }

  return false
}

//show priority
const showPriority = (id: string) => {

  switch (id) {
    case '1':
      return 'Hight';
    case '2':
      return 'Normal';
    case '3':
      return 'Slow';
    default:
      return '';
  }

}

//show state
const returnStatus = (id: number) => {
  switch (id) {
    case 1:
      return 'In Process';
    case 4:
      return 'Complete';
    case 2:
      return 'Pending';
    case 3:
      return 'Canceled';
    default:
      return '';
  }
}

const successAndLoadingMessage = (message: string) => {
  setTimeout(() => {
    toast.dismiss()
    toast.success(message)
  }, 1000);
}

export {
  handlerChangeState,
  loginErrorMessageHandler,
  handlerTakState,
  validateFormTask,
  showPriority,
  returnStatus,
  successAndLoadingMessage
}