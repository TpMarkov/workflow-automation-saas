import {createLoader} from "nuqs/server"
import {workflowsParams} from "@/features/workflows/constants";

export const workflowsParamsLoader = createLoader(workflowsParams);