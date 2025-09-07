import Link from 'next/link'
import React, { ReactNode } from 'react'
import Image from 'next/image'
import { isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  console.log(isUserAuthenticated);
  if(!isUserAuthenticated) redirect('/sign-in');
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col">
      <nav className="w-full bg-white/80 shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-2xl font-extrabold text-indigo-700 group-hover:text-purple-700 transition-colors duration-300">
            AI Interview
          </span>
        </Link>
        {/* Add more nav items here if needed */}
      </nav>
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  )
}

export default RootLayout