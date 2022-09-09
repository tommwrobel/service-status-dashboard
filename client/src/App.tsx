import React from "react";
import { ThemeProvider } from "@mui/material";
import ApplicationBar from "./components/ApplicationBar/ApplicationBar";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme } from "./config/ThemeConfig";
import { queryClient } from "./config/ReactQueryConfig";
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ApplicationContent from "./pages/ApplicationContent/ApplicatonContent";
import "./App.css";

function App() {

    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline>
                    <QueryClientProvider client={queryClient}>
                        <ApplicationBar/>
                        <ApplicationContent />
                        <ReactQueryDevtools/>
                    </QueryClientProvider>
                </CssBaseline>
            </ThemeProvider>
        </div>
    );
}

export default App;
