import React, { PropsWithChildren, ReactElement } from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }: PropsWithChildren<unknown>): ReactElement  => {
  return (
    <div className="h-screen flex flex-row justify-start">
        <Sidebar />
        <div className="bg-primary flex-1 p-4">
            {children}
        </div>
    </div>
  )
}

export default Layout