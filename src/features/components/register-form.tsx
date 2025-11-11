"use client"
import React from 'react'
import {useForm} from "react-hook-form"

import {z} from "zod"
import {toast} from 'sonner'
import Link from "next/link"
import {zodResolver} from "@hookform/resolvers/zod"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardDescription, CardFooter, CardTitle} from "@/components/ui/card"
import {Form, FormDescription, FormField, FormLabel, FormControl, FormItem, FormMessage} from "@/components/ui/form"
import {useRouter} from "next/navigation" // ✅ fixed import (Next.js 13+)
import {Input} from "@/components/ui/input"
import {authClient} from "@/lib/auth-client";
import Image from "next/image"

const registerSchema = z.object({
    email: z.email("Please enter a valid email"),
    password: z.string().min(1, "Please enter a valid password"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
})
type RegisterValues = z.infer<typeof registerSchema> // ✅ fixed typo in type name
const RegisterForm = () => {
    const router = useRouter()

    const form = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })
    const onSubmit = async (values: RegisterValues) => {
        await authClient.signUp.email({
            email: values.email,
            password: values.password,
            name: values.email,
            callbackURL: '/'
        }, {
            onSuccess: () => {
                router.push("/")
            }, onError: () => {
                toast.error("Failed to resiter")
            }
        })
    }

    const isPending = form.formState.isSubmitting // ✅ fixed typo

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Get started</CardTitle>
                    <CardDescription>Create an account to get started</CardDescription>
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
                                > <Image src={"/logos/google.svg"} alt={"google-logo"}
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
                                <FormField render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Confirm Password
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
                                )} name={"confirmPassword"}
                                           control={form.control}
                                />
                                <Button type="submit"
                                        className={"w-full"}
                                        disabled={isPending}
                                >
                                    Sign up
                                </Button>
                                <div className={"text-center text-sm"}>
                                    Already have an account{" "}
                                    <Link href={"/login"}
                                          className={"text-center text-blue-500 font-medium underline"}>
                                        Login
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

export default RegisterForm
