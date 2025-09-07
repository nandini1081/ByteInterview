import React from 'react'
import Image from 'next/image'
import type { InterviewCardProps } from '@/types/index'
import type { Feedback } from '@/types/index'
import { getRandomInterviewCover } from '@/lib/utils'
import { Button } from './ui/button'
import Link from 'next/link'
import DisplayTechIcons from './DisplayTechIcons'

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null
  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A'

  return (
    <div className="card-border w-full max-w-xs sm:max-w-sm min-h-96 mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <div className="relative flex flex-col items-center p-6">
        <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-indigo-100">
          <p className="badge-text text-indigo-700 font-semibold">{normalizedType}</p>
        </div>
        <Image
          src={getRandomInterviewCover()}
          alt="coverimage"
          height={90}
          width={90}
          className="rounded-full object-cover border-4 border-indigo-200 shadow-md mt-2"
        />
        <h2 className="mt-5 capitalize text-lg font-bold text-gray-800 text-center">{role} Interview</h2>
        <div className="flex flex-row gap-5 mt-3 justify-center w-full">
          <div className="flex flex-row gap-2 items-center">
            <Image src="/calendar.svg" alt="calendar" height={16} width={16} />
            <p className="text-sm text-gray-600">{formattedDate}</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" alt="level" height={18} width={18} />
            <p className="text-sm text-gray-600 capitalize">
              {feedback?.totalScore || '---'}/100
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center w-full mt-5">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <DisplayTechIcons techStack={techstack} />
          </div>
          <Button className="btn-primary w-full mt-2 transition-transform duration-200 hover:scale-105">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback/${feedback?.id}`
                  : `/interview/${interviewId}`
              }
              className="w-full flex justify-center"
            >
              {feedback ? 'View Feedback' : 'Take Interview'}
            </Link>
          </Button>
        </div>
        <p className="line-clamp-2 mt-5 text-gray-700 text-center">
          {feedback?.finalAssessment ||
            'No feedback available yet. Complete the interview to receive feedback.'}
        </p>
      </div>
    </div>
  )
}

export default InterviewCard