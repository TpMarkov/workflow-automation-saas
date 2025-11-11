import {requireAuth} from "@/lib/require-auth";
import {caller} from "@/trpc/server";
import LogoutButton from "@/features/components/logout-button";

const Page = async () => {
    await requireAuth()

    const data
        = await caller.getUsers()
    return (
        <div className={"flex items-center w-screen h-screen justify-center gap-6"}>
            <h1 className={"text-teal-600 font-bold text-xl"}>
                Protected page
            </h1>
            {JSON.stringify(data, null, 4)}
            <LogoutButton>
                Sign out
            </LogoutButton>

        </div>
    )
}
export default Page
