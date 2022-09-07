import { ApplicationSettings } from "../types/types";
import { createTheme } from "@mui/material";

export const defaultAppSettings: ApplicationSettings = {
    visibleStatusTableColumns: ["ServiceName", "Status", "ServiceInfo", "Repository", "Swagger", "Jenkins", "Actions"],
    theme: createTheme({palette: { mode: "dark"}}),
    autoRefreshRate: 30,
};

export const loadAppSettings = (): ApplicationSettings => {
    // TODO: implements this
    return defaultAppSettings;
}

export const saveAppSettings = (settings: Partial<ApplicationSettings>): void  => {
    // TODO: implements this
}

export const darkTheme = createTheme({palette: { mode: "dark"}});
export const lightTheme = createTheme({palette: { mode: "light"}});