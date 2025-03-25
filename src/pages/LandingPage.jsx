import React, { useState } from 'react'
import { Input } from "../components/ui/input"
import { Button } from '../components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState()
  const navigate = useNavigate()

  const handleShorten = (e) => {
    e.preventDefault()
    if(longUrl){
      navigate(`/auth?createNew=${longUrl}`)
    }
    else {
      console.log("ni h");
      
    }
  }
  return (
    <div className='flex flex-col items-center' >
      <h2 className='my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold'>The onlyUrl Shortener <br /> you&rsquo;ll ever need!👇</h2>
      <form onSubmit={handleShorten} className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/3 gap-4'>
        <Input type="url" placeholder="Enter your long Url"onChange={(e) => setLongUrl(e.target.value)}
         value={longUrl}/>
          <Button className="h-full" type="submit" variant="destructive"  >Shorten</Button>
        </form>
      <img src="./banner.png" alt="banner" className='w-full my-11 md:px-11' />
      <Accordion type="multiple" collapsible className="w-full md:px-11" >
    <AccordionItem value="item-1">
      <AccordionTrigger>How does this work</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-1">
      <AccordionTrigger>Do I need and acoount to use the App?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-1">
      <AccordionTrigger>What analytics are available?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
    </div>
    
  
  )
}

export default LandingPage