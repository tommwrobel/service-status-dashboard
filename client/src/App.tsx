import React from "react";
import { QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material";
import ApplicationBar from "./components/ApplicationBar/ApplicationBar";
import CssBaseline from "@mui/material/CssBaseline";
import EnvironmentPage from "./components/EnvironmentPage/EnvironmentPage";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme } from "./config/ThemeConfig";
import { queryClient } from "./config/ReactQueryConfig";
import "./App.css";

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
