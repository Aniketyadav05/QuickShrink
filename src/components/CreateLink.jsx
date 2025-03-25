import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UrlState } from '@/Context'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import Error from './Error'

const CreateLink = () => {
    const { user } = UrlState()
    const navigate = useNavigate()
    let [searchparams, setSearchParam] = useSearchParams()
    const longLink = searchparams.get("createNew")

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <Button variant="ghost">Create New Link</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">

                    <DialogHeader>
                        <DialogTitle>Create New</DialogTitle>
                    </DialogHeader>
                    <Input id="titlle" placeholder="Enter the title" />
                    <Error message={"some error"} />

                    <Input id="titlle" placeholder="Enter the Long Url" />
                    <Error message={"some error"} />

                    <div className='flex itmes-center gap-2'>
                        <Card className="p-2">QuickShrink.in</Card> /
                        <Input id="titlle" placeholder="Enter the Custom URL (optional) " />
                    </div>
                    <Error message={"some error"} />
                    <DialogFooter>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateLink