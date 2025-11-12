import {inngest} from "./client";
import {generateText} from "ai";
import {createGoogleGenerativeAI,} from "@ai-sdk/google";
import {createOpenAI} from "@ai-sdk/openai";
import {createAnthropic} from "@ai-sdk/anthropic";
import * as Sentry from "@sentry/nextjs";

const google = createGoogleGenerativeAI()
const openai = createOpenAI()
//Implement if needed
// const =
// createAnthropic()

export const executeAI = inngest.createFunction(
    {id: "execute-ai"},
    {event: "exeanthropiccute-ai"},
    async ({event, step}) => {
        Sentry.logger.info("User triggered test log", {log_source: "test_sentry"});

        console.warn("Testing logging in sentry")
        console.error("Consoling error in sentry")

        const {steps: geminiSteps} = await step.ai.wrap("gemini-generate-text",
            generateText, {
                model: google("gemini-2.5-flash"),
                system: "You are a helpful assistant",
                prompt: "What is 2+2",
                experimental_telemetry: {
                    isEnabled: true,
                    recordInputs: true,
                    recordOutputs: true,
                },
            })

        const {steps: openaiSteps} = await step.ai.wrap("openai-generate-text",
            generateText, {
                model: openai("gpt-4"),
                system: "You are a helpful assistant",
                prompt: "What is 2+2",
                experimental_telemetry: {
                    isEnabled: true,
                    recordInputs: true,
                    recordOutputs: true,
                },
            })

        return {
            geminiSteps,
            openaiSteps,
        }
    },
);
