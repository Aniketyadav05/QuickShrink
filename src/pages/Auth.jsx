import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from 'react-router-dom'

const Auth = () => {
  const [searchParams] = useSearchParams()
  return (
    <div className='mt-36 flex flex-col items-center gap-10'>
      <h1 className='text-5xl font-extrabold'>
        {searchParams.get("createnew")? "Hold up let's login first": "Login/SIgnUp"}
      </h1>
    </div>
  )
}

export default Auth