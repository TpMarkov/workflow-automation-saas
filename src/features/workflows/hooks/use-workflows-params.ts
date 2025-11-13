import {useQueryStates} from "nuqs";
import {workflowsParams} from "@/features/workflows/constants";

export const useWorkflowsParams = () => {
    return useQueryStates(workflowsParams);
}