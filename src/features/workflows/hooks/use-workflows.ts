/**
 * Hook to fetch all workflows using suspense
 */
import {useTRPC} from "@/trpc/client";
import {useMutation, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {toast} from "sonner";
import {useWorkflowsParams} from "@/features/workflows/hooks/use-workflows-params";

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC()
    const [params] = useWorkflowsParams()
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params))
}

export const useCreateWorkflow = () => {
    const queryCLient = useQueryClient()
    const trpc = useTRPC()

    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow ${data.name} created.`)
            queryCLient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
        }, onError: (err) => {
            toast.error(`Failed to create workflow with error : ${err.message}`)
        }
    }))
}