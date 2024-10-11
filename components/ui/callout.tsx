import React from 'react'

interface CalloutProps {
  children: React.ReactNode
}

export function Callout({ children }: CalloutProps) {
  return (
    <div className="my-4 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
      {children}
    </div>
  )
}