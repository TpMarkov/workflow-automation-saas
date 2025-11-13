import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader, AlertDialogCancel, AlertDialogTitle, AlertDialogDescription
} from "@/components/ui/alert-dialog";
import {authClient} from "@/lib/auth-client";

interface PremiumModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const UpgradeModal = ({open, onOpenChange}: PremiumModalProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Upgrade to Pro</AlertDialogTitle>
                    <AlertDialogDescription>
                        You need an active subscription to perform this action. Upgrade to Pro to unlock
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => authClient.checkout({slug: "pro"})}>
                        Upgrade Now
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default UpgradeModal
