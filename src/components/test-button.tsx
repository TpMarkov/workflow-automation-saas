"use client"
import React from 'react'
import {Button} from "@/components/ui/button";
import {useTRPC} from "@/trpc/client";
import {useMutation} from "@tanstack/react-query";

export const TestButton = () => {
    const trpc = useTRPC()
    const mutation = useMutation(trpc.testAI.mutationOptions(
        {
            onSuccess: () => {
                console.log("Success")
            }, onError: (e) => {
                console.log(e.message)
            }
        }
    ))

    return (
        <Button onClick={() => mutation.mutate()}>Test AI</Button>
    )
}
