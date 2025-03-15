import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'



function Header() {

    const { user, isSignedIn } = useUser();
    return (
        <div className='p-2 px-3 flex justify-between items-center shadow-md h-16'>
         <img src="/logo.svg" className="h-30 w-30" />

            {isSignedIn ?

                <div className='flex gap-2 items-center'>
                    <Link to={'/dashboard'} >
                    <Button variant="outline">DashBoard</Button>
                    </Link>
                    <UserButton />
                </div> :
                <Link to={'/auth/sign-in'}>
                    <Button>GET Started</Button>
                </Link>

            }


        </div>
    )
}

export default Header