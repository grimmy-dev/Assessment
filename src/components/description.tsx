import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface DescProps{
  children:ReactNode,
  className?:string
}

const Description = ({children,className}:DescProps) => {
  return (
    <p className={cn("leading-relaxed",className)}>{children}</p>
  )
}

export default Description