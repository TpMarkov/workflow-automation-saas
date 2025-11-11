"use client"
import React from 'react'
import {useForm} from "react-hook-form"

import {z} from "zod"
import {toast} from 'sonner'
import Link from "next/link"
import {zodResolver} from "@hookform/resolvers/zod"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardDescription, CardTitle} from "@/components/ui/card"
import {Form, FormField, FormLabel, FormControl, FormItem, FormMessage} from "@/components/ui/form"
import {useRouter} from "next/navigation"
import {Input} from "@/components/ui/input"
import {authClient} from "@/lib/auth-client";
import Image from "next/image";

const loginSchema = z.object({
    email: z.email("Please enter a valid email"), // ✅ fixed
    password:
        z.string().min(1, "Please enter a valid password"), // ✅ fixed
})
type LoginFormValues = z.infer<typeof loginSchema> // ✅ fixed typo in type name

const LoginForm = () => {

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const router = useRouter()

    const onSubmit = async (values: LoginFormValues) => {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
        }, {
            onSuccess: () => {
                router.push("/")
            }, onError: (ctx) => {
                toast.error(ctx.error.message)
            }
        })
    }

    const isPending = form.formState.isSubmitting // ✅ fixed typo

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>Login to continue</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <Button
                                    type="button"
                                    className="text-center w-full"
                                    variant="outline"
                                    disabled={isPending}
                                ><Image src={"/logos/google.svg"} alt={"github-logo"}
                                        width={20} height={20}
                                />
                                    Continue With Google

                                </Button>
                                <Button
                                    type="button"
                                    className="text-center w-full flex items-center justify-center gap-2"
                                    variant="outline"
                                    disabled={isPending}
                                > <Image src={"/logos/github.svg"} alt={"github-logo"}
                                         width={20} height={20}
                                />
                                    Continue With GitHub

                                </Button>
                            </div>
                            <div className={"grid gap-6"}>
                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type={"email"}
                                                placeholder={"m@example.com"}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>

                                    </ FormItem>

                                )} name={"email"}
                                           control={form.control}
                                />
                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type={"password"}
                                                placeholder={"**********"}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </ FormItem>
                                )} name={"password"}
                                           control={form.control}
                                />
                                <Button type="submit"
                                        className={"w-full"}
                                        disabled={isPending}
                                >
                                    Login
                                </Button>
                                <div className={"text-center text-sm"}>
                                    Don&apos;t have an account{" "}
                                    <Link href={"/sign-up"}
                                          className={"text-center text-blue-500 font-medium underline"}>
                                        Sign up
                                    </Link>
                                </div>
                            </div>

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginForm
