import {baseProcedure, createTRPCRouter, protectedProcedure} from '../init';
import {inngest} from "@/inngest/client";
import {TRPCError} from "@trpc/server";


export const appRouter = createTRPCRouter({
        testAI: baseProcedure.mutation(async () => {
            // throw new TRPCError({message: "Something went wrong", code: "BAD_REQUEST"})
            return await inngest.send({name: "execute-ai"});
        }),
    })
;
// export type definition of API
export type AppRouter = typeof appRouter;

