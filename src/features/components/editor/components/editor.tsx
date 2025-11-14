"use client"

import {useSuspenseWorkflow} from "@/features/workflows/hooks/use-workflows";
import {ErrorView, LoadingView} from "@/components/entity-components";

type Props = {
    id: string
};

export const EditorLoader = () => {
    return <LoadingView message={"Loading Editor..."}/>
}

export const EditorError = () => {
    return <ErrorView message={"Error loading Editor"}/>
}

export const Editor = ({id}: Props) => {

    const {data: workflow} = useSuspenseWorkflow(id)

    return (
        <p>{JSON.stringify(workflow, null, 2)}</p>
    );
};
export default Editor



