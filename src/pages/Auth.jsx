import React, { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate, useSearchParams } from 'react-router-dom'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import { UrlState } from '@/Context'

const Auth = () => {
  const [searchParams] = useSearchParams()
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate()

  const {isAuthenticated, loading} = UrlState()

  useEffect(() => {
    if(isAuthenticated && !loading){
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
    }
  },[isAuthenticated, loading,navigate])
  return (
    <div className='mt-36 flex flex-col items-center gap-10'>
      <h1 className='text-5xl font-extrabold'>
        {searchParams.get("createnew")? "Hold up let's login first": "Login/SIgnUp"}
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
  <TabsList className="w-full grid grid-cols-2">
    <TabsTrigger value="login">login</TabsTrigger>
    <TabsTrigger value="signup">signup</TabsTrigger>
  </TabsList>
  <TabsContent value="login"><Login/></TabsContent>
  <TabsContent value="signup"><Signup/>.</TabsContent>
</Tabs>

    </div>
  )
}

export default Auth