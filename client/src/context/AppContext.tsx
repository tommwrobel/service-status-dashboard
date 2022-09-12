import { createContext, ReactNode, useEffect, useState } from "react";
import { Nullable, Config, Environment } from "../types/types";

type AppContextProps = {
    config: Nullable<Config>,
    setConfig: (config: Config) => void,
    currentEnv: Nullable<Environment>,
    setCurrentEnv: (env: Environment) => void,
}

export const AppContext = createContext<AppContextProps>({
    config: null,
    setConfig: () => null,
    currentEnv: null,
    setCurrentEnv: () => null,
});

type AppContextProviderProps = {
    children?: ReactNode,
}

export const AppContextProvider = ({ children }: AppContextProviderProps): JSX.Element => {

    const [config, setConfig] = useState<Nullable<Config>>(null);
    const [currentEnv, setCurrentEnv] = useState<Nullable<Environment>>(null);

    useEffect(() => {
        if (config) setCurrentEnv(config.envs[0]);
    }, [config])

    return (
        <AppContext.Provider value={{
            config: config,
            setConfig: setConfig,
            currentEnv: currentEnv,
            setCurrentEnv: setCurrentEnv,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;
