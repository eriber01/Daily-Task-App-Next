import { PropsWithChildren } from 'react'
import { NavBar } from '../NavBar';

interface Props {
  title: string
}

export const Layout = ({ title, children }: PropsWithChildren<Props>) => {

  return (
    <>
      <title>{title || 'Daily Task App'}</title>
      <meta name='author' content='Eriber Tejeda Amparo' />
      <meta name='description' content='App for add and manage Daily Task' />
      <NavBar />
      <main>
        {children}
      </main>
    </>
  )
}

