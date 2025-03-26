import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Copy, Delete, DeleteIcon, Download, Trash } from 'lucide-react'
import UseFetch from '@/hooks/UseFetch'
import { deleteUrl } from '@/db/apiUrls'
import { BeatLoader } from 'react-spinners'

const LinkCard = ({url, fetchUrls}) => {
  
const {laoding:loadingDelete,check:fnDelete}=UseFetch(deleteUrl,url?.id)
  return (
    <div className='flex flex-col md:flex-row gap-6 border p-4 bg-gray-900 rounded-lg'>
        <img src={url?.qr || url?.qr_code}

        className='h-32 object-contain ring ring-blue-600 self-start'
        alt="QRCODE" />
        
        <Link to={`/link/${url?.id}`} className='flex flex-col flex-1'>
        <span className='text-3xl font-extrabold hover:underline cursor-pointer'>
          {url?.title}
          </span>
        <span className='text-2xl text-blue-400 font-bold hover:underline cursor-pointer'>
            https://quickshrink.in/{url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className='flex items-center gap-1 text-xl hover:underline cursor-pointer'>
            {url?.original_url}
        </span>
        <span className='flex items-end font-extralight text-sm flex-1'>
            {new Date(url?.created_at).toLocaleString()}
        </span>
        
        </Link>
        <div className='flex gap-2'>
            <Button variant="ghost" onClick={() => {
              navigator.clipboard.writeText(`https://quickshrink.in/${url?.short_url}`)
            }}>
              <Copy/>
            </Button>
            <Link to={url?.qr_code}>
            <Button variant="ghost" >
              <Download/>
            </Button>
            </Link>
            <Button variant="ghost" onClick={() => fnDelete().then(() => fetchUrls())}>
              {loadingDelete? <BeatLoader size={5} color="white" />:<Trash/>}
            </Button>
        </div>
        
        
    </div>
  )
}

export default LinkCard