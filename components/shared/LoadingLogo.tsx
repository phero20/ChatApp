import Image from "next/image"

type Props = {
    size?: number
}

function LoadingLogo({size=100}: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center">
        <img src="/logo.svg" alt="logo" width={size} height={size} className="animate-pulse duration-700" />
    </div>
  )
}

export default LoadingLogo