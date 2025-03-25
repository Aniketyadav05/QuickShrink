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
import { UrlState } from '@/Context'
import UseFetch from '@/hooks/UseFetch'
import { logout } from '@/db/apiAuth'
import { BarLoader } from 'react-spinners'

const Header = () => {
    const navigate = useNavigate()
    const {loading, check: fnLogout} = UseFetch(logout);
    const {user, fetchUser} = UrlState()
    return (
        <>
        <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/AniKodes.png" className="h-16" alt="Trimrr Logo" />
        </Link>
        <div className="flex gap-4">
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.profile_pic} className="object-fit"/>
                  <AvatarFallback>AA</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {console.log(user?.user_metadata?.name)
                  }
                {user?.user_metadata?.full_name || user?.user_metadata?.name || "User"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    fnLogout().then(() => {
                      fetchUser();
                      navigate("/");
                    });
                  }}
                  className="text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span onClick={()=> {
                    fnLogout().then(() => {
                        fetchUser()
                        navigate("/")
                    })
                    
                  }}>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
                
    )
}

export default Header