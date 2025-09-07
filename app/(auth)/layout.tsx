import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React from 'react'
import {ReactNode} from 'react'

const Authlayout = async ({children} : {children : ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();
  if(isUserAuthenticated) redirect('/');
  return (
    <div className='Auth-layout'>{children}</div>
  )
}

export default Authlayout