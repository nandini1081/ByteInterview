import React from 'react'
import Agent from '@/components/Agent'

const page = () => {
  return (
    <>
    <h1 className="px-8 py-2 text-black bold">Interview Generation</h1>
    <Agent userName="Me" userId="user1" type="generate"/>
    </>
  )
}

export default page