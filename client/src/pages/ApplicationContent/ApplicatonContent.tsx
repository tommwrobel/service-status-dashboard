import { useConfigData } from "../../hooks/useConfigData/useConfigData";
import StatusPage from "../StatusPage/StatusPage";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";

const ApplicationContent = (): JSX.Element => {

    const {config, isLoading, isError} = useConfigData();

    if (isLoading) return <LoadingPage message="Loading configuration..." />;
    if (isError) return <ErrorPage message="Error while loading config data." />;
    if (config) return <StatusPage config={config} />;
    return <></>;
};

export default ApplicationContent;
