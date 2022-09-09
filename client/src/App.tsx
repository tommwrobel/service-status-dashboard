import React from "react";
import { ThemeProvider } from "@mui/material";
import ApplicationBar from "./components/ApplicationBar/ApplicationBar";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme } from "./config/ThemeConfig";
import { queryClient } from "./config/ReactQueryConfig";
import { QueryClientProvider } from '@tanstack/react-query';

import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ApplicatonContent from "./pages/ApplicationContent/ApplicatonContent";

function App() {

    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline>
                    <QueryClientProvider client={queryClient}>
                        <ApplicationBar/>
                        <ApplicatonContent />
                        <ReactQueryDevtools/>
                    </QueryClientProvider>
                </CssBaseline>
            </ThemeProvider>
        </div>
    );
}

export default App;
