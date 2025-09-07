import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'

const Page = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-2">
      {/* Hero Section */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl transition-transform duration-300 hover:scale-105">
        <section className="flex flex-col-reverse md:flex-row items-center gap-10 py-10 px-6 md:px-12 border-b border-gray-200">
          {/* Text Content */}
          <div className="flex flex-col gap-6 w-full md:w-1/2 items-center md:items-start">
            <div className="flex flex-row gap-2 justify-center items-center mb-2">
              <Image src="/logo.svg" alt="logo" height={40} width={48} />
              <h2 className="text-indigo-700 text-2xl font-bold transition-colors duration-300 hover:text-purple-700">
                ByteInterview
              </h2>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center md:text-left">
              AI based mock Interviews
            </h2>
            <p className="text-lg text-gray-700 text-center md:text-left">
              Practice interviews with AI to ace your next job interview. Get
              instant feedback and improve your skills with our AI-powered mock
              interviews.
            </p>
            <Button asChild className="w-full md:w-auto bg-indigo-600 hover:bg-purple-600 text-white font-semibold py-2 rounded transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
              <Link href="/interview">Start Interview</Link>
            </Button>
          </div>
          {/* Image */}
          <div className="flex justify-center items-center w-full md:w-1/2">
            <Image
              src="/robot.png"
              alt="robo-dude"
              width={320}
              height={320}
              className="rounded-xl shadow-lg bg-gray-50 border-2 border-gray-200 max-w-[90vw] md:max-w-[320px] h-auto"
              priority
            />
          </div>
        </section>
      </div>

      {/* Sections */}
      <div className="w-full max-w-6xl flex flex-col gap-8 mt-8">
        {/* Scheduled Interviews */}
        <section className="flex flex-col gap-4 px-4 py-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">Scheduled Interviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dummyInterviews.length === 0 && <p className="col-span-full text-gray-600">No interviews available</p>}
            {dummyInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))}
          </div>
        </section>
        {/* Take Interview */}
        <section className="flex flex-col gap-4 px-4 py-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">Take Interview</h2>
          <div className="flex flex-wrap gap-6">
            {/* Example: You can map over available interviews here */}
            <p className="text-gray-600">No interviews available</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Page