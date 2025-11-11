import {createTRPCRouter, protectedProcedure} from '../init';
import {inngest} from "@/inngest/client";


export const appRouter = createTRPCRouter({
        testAI: protectedProcedure.mutation(async () => {
            return await inngest.send({name: "execute-ai"});
        }),
    })
;
// export type definition of API
export type AppRouter = typeof appRouter;

