import React from 'react'

type Props = {
    size?: number
}

const LoadingLogo = ({size=100}:Props) => {
  return (
    <div className='flex justify-center items-center h-full w-full'>
         <img src="/logo.svg" alt="logo" width={size} height={size} className='animate-pulse duration-700' />
    </div>
  )
}

export default LoadingLogo