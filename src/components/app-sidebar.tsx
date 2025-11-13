"use client"
import React from 'react'
import {
    CreditCardIcon,
    FolderOpenIcon,
    HistoryIcon,
    KeyIcon,
    LogOutIcon,
    StarIcon,
} from "lucide-react"

import Image from "next/image"
import Link from "next/link"
import {usePathname, useRouter} from "next/navigation";

import {
    Sidebar,
    SidebarInset,
    SidebarGroup,
    SidebarGroupAction,
    SidebarFooter,
    SidebarContent, SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarHeader, SidebarSeparator,
} from "@/components/ui/sidebar"
import {authClient} from "@/lib/auth-client";
import {useHasActiveSubscription, useSubscription} from "@/features/subscriptions/hooks/use-subscription";
import {Button} from "@/components/ui/button";

const menuItems = [
    {
        title: "WorkflowsList",
        items: [
            {
                title: "WorkflowsList",
                icon: FolderOpenIcon,
                url: "/workflows"
            },
        ]
    }, {
        title: "Executions",
        items: [
            {
                title: "Executions",
                icon: StarIcon,
                url: "/executions"
            },
        ]
    }, {
        title: "Credentials",
        items: [
            {
                title: "Credentials",
                icon: KeyIcon,
                url: "/credentials"
            },
        ]
    },
]

const AppSidebar = () => {
    const router = useRouter()
    const pathName = usePathname()

    const {
        hasActiveSubscription, isLoading
    } = useHasActiveSubscription()


    return (
        <Sidebar collapsible={"icon"}>
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className={"gap-x-4 h-10 px-4"
                    }>
                        <Link href={"/workflows"}>
                            <Image src={"/logos/logo.svg"} alt={"logo-image"} width={30} height={30}/>
                            <span className={"font-bold text-sm"}>Nodebase</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                {menuItems.map((group) => (
                    <SidebarGroupContent key={group.title}>
                        <SidebarMenu>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        isActive={item.url === "/" ? pathName === "/" : pathName.startsWith(item.url)}
                                        className={"gap-x-4 h-10 px-4"}>
                                        <Link href={item.url} prefetch>
                                            <item.icon/>
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    {!hasActiveSubscription && !isLoading && <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip={"Upgrade to Pро"}
                            className={"gap-x-4 h-10 px-4"}
                            onClick={() => {
                                authClient.checkout({
                                    slug: "pro"
                                })
                            }}
                        >
                            <StarIcon className={"h-4 w-4"}/>
                            <span>Upgrade to Pro</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>}

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip={"Billing Portal"}
                            className={"gap-x-4 h-10 px-4"}
                            onClick={() => {
                            }}
                        >
                            <CreditCardIcon className={"h-4 w-4"}/>
                            <span>Billing</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip={"Sign out"}
                            className={"gap-x-4 h-10 px-4"}
                            onClick={() => {
                                authClient.signOut({
                                    fetchOptions: {
                                        onSuccess: () => {
                                            router.push("/login")
                                        }
                                    }
                                })
                            }}
                        >
                            <LogOutIcon className={"h-4 w-4"}/>
                            <span>Sign out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
export default AppSidebar
