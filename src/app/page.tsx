"use client"
import LogoutButton from "@/features/components/logout-button";
import {useTRPC} from "@/trpc/client";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";

const Page = () => {


    const trpc = useTRPC();
    const {data} = useQuery(trpc.getWorkflows.queryOptions());
    const queryClient = useQueryClient();

    const create = useMutation(trpc.createWorkflow.mutationOptions({
        onSuccess: async () => {
            queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
        }
    }))


    return (
        <div className={"flex flex-col items-center w-screen h-screen justify-center gap-6"}>
            <h1 className={"text-teal-600 font-bold text-xl"}>
                Protected page
            </h1>
            {JSON.stringify(data, null, 4)}
            <Button onClick={() => create.mutate()}
                    disabled={create.isPending}
            >
                Create workflow
            </Button>
            <LogoutButton/>
        </div>
    )
}
export default Page
