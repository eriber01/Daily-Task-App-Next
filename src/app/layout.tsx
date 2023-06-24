"use client";
import { Providers } from '@/redux/providers';
import './globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-gray-500'>
        <Providers>

          {children}
        </Providers>
        <ToastContainer />
      </body>
    </html>
  )
}
