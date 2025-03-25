import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { PuffLoader } from 'react-spinners'
import Error from './Error'
import * as Yup from 'yup'
import UseFetch from '@/hooks/UseFetch'
import { login } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/Context'
const Login = () => {
    const [errors, setErrors] = useState([])
    const [formData,setFormData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const longLink =useSearchParams('createNew')

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name] : value,
        }))
    }
   const{loading,error , check:fnLogin,data} =  UseFetch(login,formData)
   const {fetchUser} = UrlState()

   useEffect(() => {
    if(error===null && data){
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      
    }
 }, [data,error])
    const handleLogin = async() => {
        setErrors([])
            try {
                const schema= Yup.object().shape({
                    email: Yup.string()
                    .email("Invalid  Email")
                    .required("Email is required"),
                    password: Yup.string()
                    .min(6,"Password must be of 6 characters")
                    .required("Password is required")
                })
                await schema.validate(formData,{abortEarly: false})
                await fnLogin()
            } catch (e) {
                const newErrors = {}

                e?.inner?.forEach((err)=>{
                    newErrors[err.path] = err.message
                })
                setErrors(newErrors)
            }       
        
    }
  return (
    <Card>
  <CardHeader>
    <CardTitle>Login</CardTitle>
    <CardDescription>to your account if you already have one</CardDescription>
    {error && <Error message={error.message} />}
    
  </CardHeader>
  <CardContent className="space-y-2">
    <div className='space-y-1'>
        <Input name="email" type="email" placeholder="ENTER EMAIL" onChange={handleInputChange} />
        {errors.email&& <Error message={errors.email}/>}
    </div>
  </CardContent>
  <CardFooter>
  <div className='space-y-1'>
        <Input name="password" type="password" placeholder="ENTER password"onChange={handleInputChange}  />
        {errors.password && <Error message={errors.password}/>}
    </div>
  </CardFooter>
  <Button onClick={handleLogin}>
    {loading ? <PuffLoader size={10} color='#36d7b7'/>:"Login"}
  </Button>
</Card>

  )
}

export default Login