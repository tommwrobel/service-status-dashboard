import React, { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from "react-query";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from "@mui/material";
import ApplicationBar from "./common/components/ApplicationBar/ApplicationBar";
import CssBaseline from '@mui/material/CssBaseline';
import EnvironmentPage from "./common/components/EnvironmentPage/EnvironmentPage";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
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

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {

    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline>
                    <QueryClientProvider client={queryClient}>
                        <ApplicationBar />
                        <EnvironmentPage />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </CssBaseline>
            </ThemeProvider>
        </div>
    );
}

export default App;
