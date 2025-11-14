/**
 * Hook to fetch all workflows using suspense
 */
import {useTRPC} from "@/trpc/client";
import {useMutation, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {toast} from "sonner";
import {useWorkflowsParams} from "@/features/workflows/hooks/use-workflows-params";
import {router} from "next/client";
import {useRouter} from "next/navigation";

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


/**
 *  Hook to remove workflow
 */
export const useRemoveWorkflow = () => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation(trpc.workflows.remove.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow ${data.name} removed successfully.`)
            queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
            queryClient.invalidateQueries(trpc.workflows.getOne.queryOptions({
                id: data.id
            }))
        }
    }))
}


/**
 *  A hook used to fetch a single workflow using suspense
 */
export const useSuspenseWorkflow = (id: string) => {
    const trpc = useTRPC()
    return useSuspenseQuery(trpc.workflows.getOne.queryOptions({id}))
}

/**
 *  A hook used to update workflow name
 */
export const useUpdateWorkflowName = () => {
    const queryCLient = useQueryClient()
    const trpc = useTRPC()

    return useMutation(trpc.workflows.updateName.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow ${data.name} updated.`)
            queryCLient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
            queryCLient.invalidateQueries(trpc.workflows.getOne.queryOptions({id: data.id}))
        }, onError: (err) => {
            toast.error(`Failed to update workflow with error : ${err.message}`)
        }
    }))
}
