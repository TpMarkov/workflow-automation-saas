import React, {Suspense} from 'react'
import {Client} from "@/components/client"
import {HydrationBoundary} from "@tanstack/react-query";
import {dehydrate} from "@tanstack/query-core";
import {getQueryClient, trpc} from "@/trpc/server";


const Page = () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.getUsers.queryOptions())


    return (
        <div className={"flex items-center w-screen h-screen justify-center"}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                < Suspense fallback={<p>Loading...</p>}>
                    <Client/>
                </Suspense>
            </HydrationBoundary>
        </div>
    )
}
export default Page
