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
import { signup } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/Context'
const Signup = () => {
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        profile_pic: null
    })
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const longLink = useSearchParams('createNew')

    const handleInputChange = (e) => {
        const { name, value,files } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: files? files[0]: value,
        }))
    }
    const { data, loading, error, check: fnSignup } = UseFetch(signup, formData)
    const { fetchUser } = UrlState()

    useEffect(() => {
        if (error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
            fetchUser()
        }
    }, [error,loading])
    const handleSignup = async () => {
        setErrors([])
        try {
            const schema = Yup.object().shape({
                naem: Yup.string().required("name is required"),
                email: Yup.string()
                    .email("Invalid  Email")
                    .required("Email is required"),
                password: Yup.string()
                    .min(6, "Password must be of 6 characters")
                    .required("Password is required"),
                profile_pic: Yup.mixed().required("Profile picture is required")
            })
            await schema.validate(formData, { abortEarly: false })
            await fnSignup()
        } catch (e) {
            const newErrors = {}

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message
            })
            setErrors(newErrors)
        }

    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Create Your Account</CardDescription>
                {error && <Error message={error.message} />}
                

            </CardHeader>
            <CardContent className="space-y-2">
                <div className='space-y-1'>
                    <Input name="naem" type="name" placeholder="ENTER YOUR NAME" onChange={handleInputChange} />
                    {errors.name && <Error message={errors.name} />}
                </div>
            </CardContent>
            <CardContent className="space-y-2">
                <div className='space-y-1'>
                    <Input name="email" type="email" placeholder="ENTER EMAIL" onChange={handleInputChange} />
                    {errors.email && <Error message={errors.email} />}
                </div>
            </CardContent>
            <CardContent className="space-y-2">
            <div className='space-y-1'>
                    <Input name="password" type="password" placeholder="ENTER password" onChange={handleInputChange} />
                    {errors.password && <Error message={errors.password} />}
                </div>
            </CardContent>
            <CardContent className="space-y-2">
                <div className='space-y-1'>
                    <Input 
                    name="profile_pic"
                    type="file" 
                    accept="image/*"
                    onChange={handleInputChange} />
                    {errors.profile_pic && <Error message={errors.profile_pic} />}
                </div>
            </CardContent>
            <CardFooter>
            <Button onClick={handleSignup}>
                {loading ? <PuffLoader size={10} color='#36d7b7' /> : "Create Account"}
            </Button>
            </CardFooter>
            
        </Card>

    )
}

export default Signup