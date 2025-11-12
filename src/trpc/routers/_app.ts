import {baseProcedure, createTRPCRouter, premiumProcedure, protectedProcedure} from '../init';
import {inngest} from "@/inngest/client";
import {TRPCError} from "@trpc/server";


export const appRouter = createTRPCRouter({
        testAI: premiumProcedure.mutation(async () => {
            // throw new TRPCError({message: "Something went wrong", code: "BAD_REQUEST"})
            return await inngest.send({name: "execute-ai"});
        }),
    })
;
// export type definition of API
export type AppRouter = typeof appRouter;

