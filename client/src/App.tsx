import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from "react-query";
import EnvironmentTab from "./common/components/EnvironmentTab/EnvironmentTab";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppBar, Box, Button, ButtonBase, Toolbar, Typography } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import ApplicationBar from "./common/components/ApplicationBar/ApplicationBar";

const queryClient = new QueryClient()

function App() {

    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <ApplicationBar />
                <EnvironmentTab />
            </QueryClientProvider>
        </div>
    );
}

export default App;
