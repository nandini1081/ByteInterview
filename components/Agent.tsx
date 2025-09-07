import React from 'react'
import Image from 'next/image'
import type { AgentProps } from '@/types'
import { cn } from '@/lib/utils';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE ='ACTIVE',
  CONNECTING = 'CONNECTING',
  FINISHED = 'FINISHED'
}
const Agent: React.FC<AgentProps> = ({ userName }) => {
  const isSpeaking = true;
  let callStatus = 'ACTIVE';
  const messages = [
    'What is your age?',
    'My age is 56'
  ]
  const lastmessages = messages[messages.length-1];
  return (
    <>
    <div className="w-full max-w-5xl mx-auto flex justify-center gap-10 p-6">
      {/* AI Section */}
      <div className="flex-1 h-96 transition-all duration-500 bg-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden flex flex-col items-center border border-gray-100 hover:scale-105">
        <div className="relative w-full flex flex-col items-center p-8 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 text-white">
          {/* Ripple effect on avatar */}
          <div className="relative">
            {isSpeaking && (
              <>
                <span className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
                <span className="absolute inset-0 rounded-full bg-cyan-300 opacity-40 animate-pulse" />
              </>
            )}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-2">
              <Image
                src="/ai-avatar.png"
                alt="AI interviewer"
                width={110}
                height={130}
                className="relative rounded-full border-4 border-white/50 shadow-2xl"
              />
            </div>
          </div>

          <h3 className="mt-6 text-xl font-bold tracking-wide">AI Interviewer</h3>
          <p className="text-sm text-white/80 font-medium">Your virtual coach</p>
          
           {/* Status indicator */}
          <div className="mt-4 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${!isSpeaking ? 'bg-blue-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-xs text-gray-500 uppercase tracking-wider text-white bold">
              {!isSpeaking ? 'Ready' : 'Active'}
            </span>
          </div>
        </div>
        
        {/* Decorative bottom section*/}
        <div className="flex-1 w-full bg-gradient-to-b from-gray-50 to-white relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
        </div> 
      </div>

      {/* User Section */}
      <div className="flex-1 h-96 transition-all duration-500 bg-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden flex flex-col items-center border border-gray-100 hover:scale-105">
        <div className="w-full flex flex-col items-center p-8 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
          <div className="relative">
            {!isSpeaking && (
              <>
                <span className="absolute inset-0 rounded-full bg-blue-300 opacity-20 animate-ping" />
                <span className="absolute inset-0 rounded-full bg-slate-400 opacity-30 animate-pulse" />
              </>
            )}
            <div className="relative bg-white rounded-full p-3 shadow-lg">
              <Image
                src="/user-avatar.png"
                alt="User avatar"
                width={110}
                height={110}
                className="rounded-full object-cover border-4 border-gradient-to-r from-cyan-200 to-blue-200 shadow-xl"
              />
            </div>
          </div>
          
          <h4 className="mt-6 text-gray-800 font-bold text-xl tracking-wide">{userName}</h4>
          <p className="text-sm text-gray-500 font-medium">Candidate</p>
          
          {/* Status indicator */}
          <div className="mt-4 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${!isSpeaking ? 'bg-blue-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-xs text-gray-500 uppercase tracking-wider text-black bold">
              {!isSpeaking ? 'Active' : 'Ready'}
            </span>
          </div>
        </div>
        
        {/* Decorative bottom section */}
        <div className="flex-1 w-full bg-gradient-to-b from-gray-50 to-white relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-gray-300 to-slate-400 rounded-full"></div>
        </div>
      </div>
    </div>

   {messages.length > 0 && (
  <div className="w-full flex justify-center mt-2">
    <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-2 border border-gray-200">
      <p
        key={lastmessages}
        className={cn(
          "text-gray-800 text-base text-center transition-opacity duration-500",
          "animate-fadeIn"
        )}
      >
        {lastmessages}
      </p>
    </div>
  </div>
)} 
    {callStatus !== CallStatus.ACTIVE ? (
    <button className="w-32 relative px-6 py-3 mt-4 rounded-lg bg-green-500 text-white font-semibold shadow-lg hover:bg-green-600 transition duration-300 mx-auto block">
    {/* Ripple indicator */}
    <span
      className={cn(
        'absolute inset-0 rounded-lg bg-green-400 opacity-30 animate-ping',
        callStatus !== CallStatus.CONNECTING && 'hidden'
      )}
    />
    <span className="relative z-10">
      {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
        ? 'Call'
        : '. . .'}
    </span>
  </button>
) : (
  <button className="w-32 relative px-6 py-3 mt-4 rounded-lg bg-red-500 text-white font-semibold shadow-lg hover:bg-red-600 transition duration-300 mx-auto block">
    End Call
  </button>
)}

    </>
  )
}

export default Agent