import { QueryClient, QueryKey } from "@tanstack/react-query";
import { DataStatus, Maybe, ServiceStatus } from "../../types/types";


export const getQueryDataStatus = (queryKey: QueryKey, queryClient: QueryClient): DataStatus => {
    const queryState = queryClient.getQueryState(queryKey);
    if (queryState === undefined) return undefined;
    if (queryState.fetchStatus === "fetching") return "loading";
    return queryState.status;
}

export const parseHealthCheckStatus = (status: Maybe<boolean>): ServiceStatus => {
    if(status === true) return "UP";
    if(status === false) return "DOWN";
    return undefined;
}