import React, { ProfilerProps, ReactNode } from "react";

type Props = {
    metadata?: any;
    phases?: ("mount" | "update")[];
    children?: ReactNode;
} & Omit<ProfilerProps, "onRender">; 

let queue: unknown[] = [];
const sendProfileQueue = () => {
    if (!queue.length) return;
    const queueToSend = [...queue];
    queue = [];
    console.log("发送性能数据:", queueToSend);
};

setInterval(sendProfileQueue, 5000);

export const Profiler = ({ metadata, phases, children, ...props }: Props) => {
    const reportProfile: React.ProfilerOnRenderCallback = (
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions
    ) => {
        if (!phases || phases.includes(phase)) {
            queue.push({
                id,
                phase,
                actualDuration,
                baseDuration,
                startTime,
                commitTime,
                interactions,
                metadata,
            });
        }
    };

    return <React.Profiler onRender={reportProfile} {...props}>{children}</React.Profiler>;
};