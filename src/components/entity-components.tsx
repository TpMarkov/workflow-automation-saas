import {Button} from "@/components/ui/button";
import Link from "next/link";
import {AlertTriangleIcon, ArrowLeftIcon, ArrowRightIcon, Loader2Icon, PlusIcon, SearchIcon} from "lucide-react";
import React from "react";
import {Input} from "@/components/ui/input";
import {Empty, EmptyHeader, EmptyTitle, EmptyMedia, EmptyDescription, EmptyContent} from "@/components/ui/empty";
import {PackageOpenIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

type EntityHeaderProps = {
    title: string
    description?: string
    newButtonLabel?: string
    disabled?: boolean
    isCreating?: boolean
} & (
    | { onNew: () => void; newButtonHref?: never }
    | { newButtonHref?: string; onNew?: never }
    | { onNew?: never; newButtonHref?: never }
    )

export const EntityHeader = ({
                                 title,
                                 description,
                                 onNew,
                                 newButtonLabel,
                                 newButtonHref,
                                 isCreating,
                                 disabled,
                             }: EntityHeaderProps) => {

    return (
        <div className={"flex flex-row items-center justify-between gap-x-4"}>
            <div className={"flex flex-col"}>
                <h1 className={"text-lg md:text-xl font-semibold"}>{title}</h1>
                {description && (
                    <p className={"text-xs md:text-sm text-muted-foreground"}>
                        {description}
                    </p>
                )}
            </div>
            {onNew && !newButtonHref && (
                <Button
                    disabled={disabled || isCreating}
                    size={"sm"}
                    onClick={onNew}
                >
                    <PlusIcon className={"size-4"}/>
                    {newButtonLabel}
                </Button>
            )}
            {!onNew && newButtonHref && (
                <Button
                    size={"sm"}
                    onClick={onNew}
                    asChild
                >
                    <Link href={newButtonHref}>
                        <PlusIcon className={"size-4"}/>
                        {newButtonLabel}
                    </Link>
                </Button>
            )}
        </div>
    )
}

type EntityContainerProps = {
    children: React.ReactNode;
    search?: React.ReactNode
    header?: React.ReactNode
    pagination?: React.ReactNode
}
export const EntityContainer = ({header, children, search, pagination}: EntityContainerProps) => {
    return <div className={"p-4 md:px-10 md:py-6 h-full"}>
        <div className={"mx-auto max-w-screen-xl w-full flex flex-col gap-y-8 h-full"}>
            {header}
            <div className={"flex flex-col gap-y-4 h-full"}>
                {search}
                {children}
            </div>
            {pagination}
        </div>
    </div>
}

interface EntitySearchProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export const EntitySearch = ({value, onChange, placeholder}: EntitySearchProps) => {
    return <div className={"relative ml-auto"}>
        <SearchIcon className={"size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"}/>
        <Input className={"max-w-[200px] bg-background shadow-none border-border pl-8"}
               placeholder={placeholder}
               value={value}
               onChange={(e) => onChange(e.target.value)}
        />
    </div>
}

interface EntityPagiationProps {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
    disabled?: boolean
}

export const EntityPagination = ({page, totalPages, onPageChange, disabled}: EntityPagiationProps
) => {
    return <div className={"flex items-center justify-between gap-x-2 w-full"}>
        <div className={"flex-1 text-sm text-muted-foreground"}>
            Page {page} of {totalPages || 1}
        </div>
        <div className={"[flex items-center justify-end space-x-2 py-4"}>
            <Button
                disabled={page === 1 || disabled}
                size={"sm"}
                onClick={() => onPageChange(Math.max(1, page - 1))}
            >
                Previous
                <ArrowLeftIcon className={"size-4"}/>
            </Button>
            <Button
                disabled={page === totalPages || disabled}
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                size={"sm"}
            >
                Next
                <ArrowRightIcon className={"size-4"}/>
            </Button>
        </div>
    </div>
}

interface StateViewProps {
    message?: string
}


export const LoadingView = (
    {
        message
    }:
    StateViewProps
) => {
    return <div className={"flex justify-center items-center h-full flex-1 flex-col gap-y-4"}>
        <Loader2Icon className={"size-6 animate-spin text-primary"}/>
        {message &&
            <p className={"text-sm text-muted-foreground"}>
                {message}
            </p>
        }
    </div>
}


export const ErrorView = (
    {
        message
    }:
    StateViewProps
) => {
    return <div className={"flex justify-center items-center h-full flex-1 flex-col gap-y-4"}>
        <AlertTriangleIcon className={"size-6 text-primary"}/>
        {message &&
            <p className={"text-sm text-muted-foreground"}>
                {message}
            </p>
        }
    </div>
}

interface EmptyViewProps extends StateViewProps {
    onNew?: () => void
}


export const EmptyView = ({onNew, message}: EmptyViewProps) => {
    return <Empty className={"border border-dashed bg-white"}>
        <EmptyHeader>
            <EmptyMedia variant={"icon"}>
                <PackageOpenIcon/>
            </EmptyMedia>
        </EmptyHeader>
        <EmptyTitle>
            No Items
        </EmptyTitle>
        {message &&
            <EmptyDescription>
                {message}
            </EmptyDescription>
        }
        {!!onNew && (
            <EmptyContent>
                <Button onClick={onNew}>
                    Add Workflow
                </Button>
            </EmptyContent>
        )}
    </Empty>
}

interface EntityListProps<T> {
    items: T[]
    renderItem: (item: T, index: number) => React.ReactNode
    getKey?: (item: T, index: number) => string | number
    emptyView?: React.ReactNode
    className?: string
}

export function EntityList<T>({items, renderItem, getKey, className, emptyView}: EntityListProps<T>) {

    if (items.length === 0 && emptyView) {
        return (
            <div className="flex flex-1 justify-center items-center h-full">
                <div className="max-w-sm mx-auto">
                    {emptyView}
                </div>
            </div>
        )
    }
    return (
        <div className={cn("flex flex-col gap-y-4",)}>
            {items.map((item, index) => {
                return <div key={getKey ? getKey(item, index) : index}>
                    {renderItem(item, index)}
                </div>
            })}
        </div>
    )
}

interface EntityItemProps {
    href: string
    title: string
    subtitle?: React.ReactNode
    image?: React.ReactNode
    actions?: React.ReactNode
    onRemove?: () => void | Promise<void>
    isRemoving?: boolean
    className?: string
}

export const EntityItem = ({
                               actions,
                               className,
                               image,
                               isRemoving,
                               onRemove,
                               title,
                               href,
                               subtitle
                           }: EntityItemProps) => {
    return <Link href={href} prefetch>
        <Card
            className={cn("p-4 shadow-none hover:shadow cursor-pointer", isRemoving && "opacity-50 cursor-not-allow")}
        >
            <CardContent className={"flex flex-row items-center justify-between p-0"}>
                <div className={"flex items-center gap-3"}>
                    {image}
                    <div>
                        <CardTitle className={'text-base font-medium'}>{title}</CardTitle>
                        {!!subtitle && (
                            <CardDescription className={"text-xs"}>
                                {subtitle}
                            </CardDescription>
                        )}
                    </div>
                </div>
                {(actions || onRemove) && (
                    <div className={"flex gap-x-4 items-center"}>
                        {actions}
                    </div>
                )}
            </CardContent>
        </Card>
    </Link>

}