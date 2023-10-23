import { useEffect, useState } from "react"

type SizeType = number | null

type ReturnHookType = {
   width: SizeType
   height: SizeType
}

export const useWindowSize = (): ReturnHookType => {
   const [width, setWidth] = useState<SizeType>(null)
   const [height, setHeight] = useState<SizeType>(null)

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const handleResize = () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
         }

         window.addEventListener('resize', handleResize)
         handleResize()
         return () => window.removeEventListener('resize', handleResize)
      }
   }, [])

   return { width, height }
}