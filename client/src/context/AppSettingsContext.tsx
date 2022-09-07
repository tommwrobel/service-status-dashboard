import { createContext, useState } from "react";
import { StatusTableColumn, ApplicationSettings, Nullable } from "../types/types";
import { createTheme, PaletteMode, Theme } from "@mui/material";
import { defaultAppSettings } from "../config/ApplicationConfig";


export const AppSettingsContext = createContext<ApplicationSettings>(defaultAppSettings);

type AppSettingsContextProviderProps = {
    settings: ApplicationSettings,
    children?: JSX.Element | JSX.Element[],
}

export const AppSettingsContextProvider = ({ settings, children }: AppSettingsContextProviderProps) => {
    const [visibleStatusTableColumns, setVisibleStatusTableColumns] = useState<StatusTableColumn[]>(settings.visibleStatusTableColumns);
    const [theme, setTheme] = useState<Theme>(settings.theme);
    const [autoRefreshRate, setAutoRefreshRate] = useState<number>(settings.autoRefreshRate);

    const handleSetTheme = (paletteMode: PaletteMode) => {
        setTheme(createTheme({ palette: { mode: paletteMode }}));
    }

    const showStatusTableColumn = (column: StatusTableColumn): void => {
        if (!visibleStatusTableColumns.includes(column))
            setVisibleStatusTableColumns(visibleColumns => [...visibleColumns, column]);
    }

    const hideStatusTableColumn = (column: StatusTableColumn): void => {
        setVisibleStatusTableColumns(visibleColumns => visibleColumns.filter(visibleColumn => visibleColumn !== column));
    }

    return (
        <AppSettingsContext.Provider value={{
            visibleStatusTableColumns: visibleStatusTableColumns,
            showStatusTableColumn: showStatusTableColumn,
            hideStatusTableColumn: hideStatusTableColumn,
            theme: theme,
            setTheme: handleSetTheme,
            autoRefreshRate: autoRefreshRate,
            setAutoRefreshRate: setAutoRefreshRate,
        }}>
            {children}
        </AppSettingsContext.Provider>
    );
}

export default AppSettingsContextProvider;
