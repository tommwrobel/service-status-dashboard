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

const queryClient = new QueryClient();

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function App() {
    const [theme, setTheme] = useState(darkTheme);

    const handleChangeTheme = (): void => {
        if (theme === lightTheme) setTheme(theme => darkTheme);
        else setTheme(theme => lightTheme);
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    <QueryClientProvider client={queryClient}>
                        <ApplicationBar onChangeTheme={handleChangeTheme}/>
                        <EnvironmentPage />
                    </QueryClientProvider>
                </CssBaseline>
            </ThemeProvider>
        </div>
    );
}

export default App;
