import StatusPage from "../StatusPage/StatusPage";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useConfigData } from "../../hooks/useConfigData/useConfigData";

const ApplicationContent = (): JSX.Element => {
    const appContext = useContext(AppContext);
    const {config, isLoading, isError} = useConfigData();

    useEffect(() => {
        if (config) appContext.setConfig(config);
    }, [appContext, config, isLoading, isError])

    if (isLoading) return <LoadingPage message="Loading configuration..." />;
    if (isError) return <ErrorPage message="Error while loading config data." />;
    if (config) return <StatusPage />;
    return <ErrorPage message="No config data available." />;
};

export default ApplicationContent;
