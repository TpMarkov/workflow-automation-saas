import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import prisma from "@/lib/db";
import {polar, checkout, portal, usage, webhooks} from "@polar-sh/better-auth";
import {polarClient} from "./polar"

export const auth = betterAuth({
    database: prismaAdapter(prisma, ({
            provider: "postgresql"
        })
    ), emailAndPassword: {
        enabled: true,
        autoIncrement: true
    }, plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "ba826ec9-2a93-4b13-b983-1991ebf0f327",
                            slug: "pro"
                        }
                    ], successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true
                }), portal()
            ]
        })
    ]
});