export interface PropsLoginForm {
  email: string
  pass: string
  isLogin: boolean
}

export interface handlerProps {
  state: PropsLoginForm
  setState: React.Dispatch<React.SetStateAction<PropsLoginForm>>
  value: string | boolean
  path: string
}

export interface handlerPropsTask {
  state: task
  setState: React.Dispatch<React.SetStateAction<task>>
  value: string | number
  path: string
}

export interface PropsUser {
  email: string | null
  uid: string | null
  pass?: string
  isLogin: boolean
  push?: any
}

export interface task {
  name: string
  module: string
  description: string
  priority: string
  uid?: string
  id?: string
  status?: number
}

export interface user {
  uid: string
  email: string
  isLogin: boolean
}