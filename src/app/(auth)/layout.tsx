import React from 'react'
import AuthLayout from "@/features/components/auth-layout";

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}
export default Layout
