"use client"
import LogoutButton from "@/features/components/logout-button";
import {useTRPC} from "@/trpc/client";
import {useMutation} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";


const Page = () => {
    const trpc = useTRPC();


    const generateText = useMutation(
        trpc.testAI.mutationOptions({
            onSuccess: () => console.log("AI job is queued"),
            onError: (err) => {
                console.log("Something went wrong", err.message)
            }
        })
    );


    return (
        <div className={"flex flex-col items-center w-screen h-screen justify-center gap-6"}>
            <h1 className={"text-teal-600 font-bold text-xl"}>
                Protected page
            </h1>
            <LogoutButton/>
            <Button
                disabled={generateText.isPending}
                onClick={() => generateText.mutate()}>Generate Text</Button>

        </div>
    )
}
export default Page
