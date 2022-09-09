import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            refetchOnWindowFocus: false,
            cacheTime: 0,
            retryOnMount: true,
            suspense: false,
            staleTime: 1,
            refetchInterval: false,
        },
    },
});
