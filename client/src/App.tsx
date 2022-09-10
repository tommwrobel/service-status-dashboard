import React from "react";
import { ThemeProvider } from "@mui/material";
import ApplicationBar from "./components/ApplicationBar/ApplicationBar";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme } from "./config/ThemeConfig";
import { queryClient } from "./config/ReactQueryConfig";
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import AppContextProvider from "./context/AppContext";
import ApplicationContent from "./pages/ApplicationContent/ApplicationContent";

function App() {

    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline>
                    <AppContextProvider>
                        <QueryClientProvider client={queryClient}>
                            <ApplicationBar/>
                            <ApplicationContent />
                            <ReactQueryDevtools/>
                        </QueryClientProvider>
                    </AppContextProvider>
                </CssBaseline>
            </ThemeProvider>
        </div>
    );
}

export default App;
