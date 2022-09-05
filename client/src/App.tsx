import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from "@mui/material";
import ApplicationBar from "./components/ApplicationBar/ApplicationBar";
import CssBaseline from '@mui/material/CssBaseline';
import EnvironmentPage from "./components/EnvironmentPage/EnvironmentPage";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme } from "./config/ThemeConfig";
import { queryClient } from "./config/ReactQueryConfig";

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
