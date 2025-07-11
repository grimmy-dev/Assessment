import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface TitleProps{
  children:ReactNode,
  className?:string
}

const Title = ({children,className}:TitleProps) => {
  return (
    <h1 className={cn("scroll-m-20 text-5xl tracking-wide font-extrabold",className)}>{children}</h1>
  )
}

export default Title