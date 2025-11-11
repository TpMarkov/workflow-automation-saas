import {inngest} from "./client";
import prisma from "@/lib/db"

export const createWorkflow = inngest.createFunction(
    {id: "workflow-create"},
    {event: "test-create-workflow"},
    async ({event, step}) => {
        await step.run("create-workflow", () => {
            return prisma.workflow.create({
                data: {
                    name: event.data.workflowName, // use the passed name
                },
            });
        });
    },
);
