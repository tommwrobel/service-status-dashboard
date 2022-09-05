import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            refetchOnWindowFocus: false,
            suspense: false,
            staleTime: 1000 * 60 * 10,
            refetchInterval: false,
        },
    },
});
