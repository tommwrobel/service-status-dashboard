import React from "react";
import { QueryClientProvider } from "react-query";
import ApplicationBar from "./components/ApplicationBar/ApplicationBar";
import EnvironmentPage from "./components/EnvironmentPage/EnvironmentPage";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "./config/ReactQueryConfig";
import "./App.css";
import AppSettingsContextProvider from "./context/AppSettingsContext";
import { defaultAppSettings } from "./config/ApplicationConfig";
import CustomThemeProvider from "./components/CustomThemeProvider/CustomThemeProvider";

function App() {

    return (
        <div className="App">
            <AppSettingsContextProvider settings={defaultAppSettings}>
                <CustomThemeProvider>
                    <QueryClientProvider client={queryClient}>
                            <ApplicationBar />
                            <EnvironmentPage />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </CustomThemeProvider>
            </AppSettingsContextProvider>
        </div>
    );
}

export default App;
