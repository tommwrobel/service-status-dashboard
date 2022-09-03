import React from 'react';
import { useConfigData } from "../../hooks/useConfigData/useConfigData";
import ServiceTable from "../ServiceTable/ServiceTable";

const EnvironmentTab = () => {

    const {config, isError, isLoading} = useConfigData();

    if (isLoading) return <span>Loading configuration...</span>;
    if (isError) return  <span>Error loading configuration!</span>;

    return (
        <>
            {config && config.envs.map(env => <ServiceTable key={env.name} services={env.services} />)}
        </>
    );
}

export default EnvironmentTab;
