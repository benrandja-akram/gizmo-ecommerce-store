import Image, { ImageProps } from 'next/image'
import gizmo from './gizmo.webp'

function Logo({ ...props }: Omit<ImageProps, 'src' | 'alt'>) {
  return (
    <Image
      src={gizmo}
      width={40}
      height={40}
      alt=""
      unoptimized //already optimized via squooch
      priority
      className="rounded-full"
      {...props}
    />
  )
}

export { Logo }
