import React from 'react'
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"

const Page = () => {
    const something = true
    return (
        <div className={cn("text-red-500 font-bold  ", something && "text-blue-400")}>Hello worlds
            <Button variant={"outline"}>Click me</Button>
        </div>
    )
}
export default Page
