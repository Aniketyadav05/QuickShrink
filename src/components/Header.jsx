import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { LogOut, LinkIcon } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Header = () => {
    const navigate = useNavigate()
    const user = true;
    return (
        <nav className='py-4 px-6 flex justify-between items-center'>
            <Link to='/dashboard'>
                <img src="/AniKodes.png" className='h-16' alt="My logo" />
            </Link>
            <div>
                {!user ? <Button onClick={() => navigate("/auth")} >Login</Button>
                    : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden"><Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>Image</AvatarFallback>
                            </Avatar></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Aniket yadav</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LinkIcon />
                                    <span>My Links</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400">
                                    <LogOut classNamemr-2 h-4 w-4 />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    )
                }

            </div>

        </nav>
    )
}

export default Header