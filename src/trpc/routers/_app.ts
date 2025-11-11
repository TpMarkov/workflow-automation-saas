import {createTRPCRouter, protectedProcedure} from '../init';
import prisma from "@/lib/db";
import {inngest} from "@/inngest/client";

export const appRouter = createTRPCRouter({
    getWorkflows: protectedProcedure.query(() => {
        return prisma.workflow.findMany()
    }),
    createWorkflow: protectedProcedure.mutation(async () => {
        const count = await prisma.workflow.count();


        return await inngest.send({
            name: "test-create-workflow",
            data: {
                workflowName: `name: Workflow N${count + 1}`
            }
        });
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;

