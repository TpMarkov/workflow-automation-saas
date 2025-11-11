import React from 'react'
import {Button} from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";
import {redirect} from "next/navigation";

const LogoutButton = () => {
    return (
        <div>
            <Button onClick={() => {
                authClient.signOut()
                redirect("/login")
            }}>Sign Out</Button>
        </div>
    )
}
export default LogoutButton
