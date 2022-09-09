import React from "react";
import { ThemeProvider } from "@mui/material";
import ApplicationBar from "./components/ApplicationBar/ApplicationBar";
import CssBaseline from "@mui/material/CssBaseline";
import EnvironmentPage from "./components/EnvironmentPage/EnvironmentPage";
import { darkTheme } from "./config/ThemeConfig";
import { queryClient } from "./config/ReactQueryConfig";
import { QueryClientProvider } from '@tanstack/react-query';

import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline>
                    <QueryClientProvider client={queryClient}>
                        <ApplicationBar/>
                        <EnvironmentPage/>
                        <ReactQueryDevtools/>
                    </QueryClientProvider>
                </CssBaseline>
            </ThemeProvider>
        </div>
    );
}

export default App;
