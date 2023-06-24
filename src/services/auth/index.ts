import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, githubProvider, googleProvider } from "../firebaseConfig";
import { PropsUser } from "../../../interfaces";
import { toast } from "react-toastify";
import { loginErrorMessageHandler } from "@/utils";
import { reducerAction, getTasks } from "../database";
import { initialStateUser } from "@/redux/features/userSlice";
import { initialStateTask } from "@/redux/features/taskSlice";

interface Props {
  email: string
  pass: string
  push: any
}

interface handlerPropsState {
  push: any
  getTask: any
  getUser: any
}

export const validateIsLogin = async ({ push, getTask, getUser }: handlerPropsState) => {
  let validate = false
  let user = null

  await onAuthStateChanged(auth, async (user) => {
    if (user) {

      const obj = {
        email: user.email,
        uid: user.uid,
        isLogin: true
      }

      getTask.dispatch(getUser(obj))

      sessionStorage.setItem('userData', JSON.stringify(obj))

      push('/')

      await getTasks(getTask)

      validate = true
      return { validate, user }
    } else {

      const obj = {
        email: null,
        uid: null,
        isLogin: true
      }

      getTask.dispatch(getUser(obj))

      sessionStorage.removeItem('userData')

      push('/auth')

      validate = false
      return { validate, user }
    }
  })

  return { validate, user }
}

export const LogoutFn = async ({ actions, actionsTask, dispatch }: reducerAction) => {
  await signOut(auth).then(() => {
    dispatch(actions(initialStateUser))
    dispatch(actions(initialStateTask))
    sessionStorage.removeItem('userData')
  }).catch(error => {
    toast.error('Error logout')
  })
}

export const LoginWithUserAndPassword = async ({ email, pass, push }: Props) => {
  await signInWithEmailAndPassword(auth, email, pass)
    .then(() => {
      toast.success('Login Success')
      push('/')
    }).catch(error => {

      const code = error.code;

      loginErrorMessageHandler({ code })
      push('/auth')
    })
}

export const createUserWithEmailAndPasswords = async ({ email, pass, push }: Props) => {

  await createUserWithEmailAndPassword(auth, email, pass)
    .then(userData => {
      toast.success('Login Success')
      push('/')
    })
    .catch((error) => {
      const code = error.code;
      loginErrorMessageHandler({ code })
    })

  return true
}

//google auth
export const LoginWithGoogle = async ({ push }: Props) => {
  signInWithPopup(auth, googleProvider)
    .then(res => {
      toast.success('Login Success')
      push('/')
    }).catch((error) => {
      toast.error('Login Failed')
      push('/auth')
    })
}

//github auth
export const LoginWithGitHub = async ({ push }: Props) => {
  signInWithPopup(auth, githubProvider)
    .then(res => {
      toast.success('Login Success')
      push('/')
    }).catch(error => {
      const code = error.code;
      loginErrorMessageHandler({ code })
      push('/auth')
    })
}