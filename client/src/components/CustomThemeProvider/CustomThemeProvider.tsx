import { darkTheme } from "../../config/ApplicationConfig";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppSettingsContext } from "../../context/AppSettingsContext";
import { useContext } from "react";

type CustomThemeProviderProps = {
    children: JSX.Element | JSX.Element[]
}

const CustomThemeProvider = ({children}: CustomThemeProviderProps): JSX.Element => {

    const AppSettings = useContext(AppSettingsContext);

    return (
        <ThemeProvider theme={AppSettings?.theme || darkTheme}>
            <CssBaseline>
                {children}
            </CssBaseline>
        </ThemeProvider>
    )
}

export default CustomThemeProvider;
