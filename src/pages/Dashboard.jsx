import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Filter } from 'lucide-react'
import Error from '@/components/Error'
import { UrlState } from '@/Context'
import UseFetch from '@/hooks/UseFetch'
import { getClicksForUrls } from '@/db/apiClicks'
import { getUrls } from '@/db/apiUrls'
import LinkCard from '@/components/LinkCard'

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const {user} = UrlState();
  const {laoding, error, data:urls, check:fnUrls} = UseFetch(getUrls,user?.id)
  const {laoding: loadingClicks, data:clicks, check:fnClicks} = UseFetch(getClicksForUrls,urls?.map((url)=> url.id))


useEffect(() => {
  fnUrls()
},[])
useEffect(() => {
  if(urls?.length) fnClicks()
},[urls?.length])

const filteredUrls = urls?.filter((url) =>{
  return url.title.toLowerCase().includes(searchQuery.toLowerCase())
})
  return (
    <div className='flex flex-col gap-7'>
      {
        laoding || loadingClicks && <BarLoader width={"100%"} color="#36d7b7" />
      }
      <div className='grid grid-cols-2 gap-4'>

      <Card>
        <CardHeader>
          <CardTitle>Links Created</CardTitle>

        </CardHeader>
        <CardContent>
          <p>{urls?.length}</p>
        </CardContent>

      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total clicks</CardTitle>

        </CardHeader>
        <CardContent>
          <p>{clicks?.length}</p>
        </CardContent>

      </Card>
      </div>
      <div className='flex justify-between'>
        <h1 className='text-4xl font-extrabold'>My Links</h1>
        <Button>Create Links</Button>
      </div>
      <div className='relative'>
        <Input
        type="text"
        placeholder="Filter Links...."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        />
        <Filter className='absolute top-2 p-1 right-2'/>
        {error && <Error message={error.message}/>}
        {(filteredUrls || []).map((url,i) => {
            return <LinkCard key={i} url={url} fetchUrls={fnUrls}/>
        })}
      </div>
    </div>
  )
}

export default Dashboard