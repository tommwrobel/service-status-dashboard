import { ApplicationSettings } from "../types/types";

export const loadSettings = (): ApplicationSettings => {
    return defaultSettings;
}

export const saveSettings = (settings: Partial<ApplicationSettings>): void  => {

}

const defaultSettings: ApplicationSettings = {
    theme: "Dark",
    columns: ["ServiceName", "Status", "ServiceInfo", "Repository", "Swagger" ,"Jenkins", "Actions"],
    autoRefresh: false,
    autoRefreshRate: 30
}
