import React, { useEffect, useState } from 'react';
import { useConfigData } from "../../hooks/useConfigData/useConfigData";
import ServicesTable from "../ServicesTable/ServicesTable";
import { Container } from "@mui/material";
import EnvironmentPageBar from "./EnvironmentPageBar/EnvironmentPageBar";
import { ServiceType } from "../../../react-app-env";
import { useQueryClient } from "react-query";

const EnvironmentPage = () => {

    const queryClient = useQueryClient();

    const [environment, setEnvironment] = useState('');
    const [automaticRefresh, setAutomaticRefresh] = useState(false);

    const {config, isError, isLoading} = useConfigData();

    useEffect(() => {
        if (config?.envs) {
            setEnvironment(environment => config.envs[0].name)
        }
    }, [config]);

    useEffect(() => {
        queryClient.defaultQueryOptions({
            refetchInterval: (automaticRefresh ? 3000 : false),
        })
    }, [automaticRefresh])

    const findServices = (environmentName: string): ServiceType[] => {
        return config?.envs?.find(env => env.name === environmentName)?.services || [] as ServiceType[];
    }

    if (isLoading) return <span>Loading configuration...</span>;
    if (isError) return  <span>Error loading configuration!</span>;
    if (config)
        return (
            <>
                <EnvironmentPageBar
                    environments={config?.envs}
                    onEnvironmentChange={setEnvironment}
                    onAutomaticallyRefreshChange={setAutomaticRefresh}
                />
                <Container maxWidth={false} sx={{ m: "2rem auto" }}>
                    {environment && <ServicesTable services={findServices(environment)} />}
                </Container>
            </>
        );
    return <h3>Error loading settings</h3>
}

export default EnvironmentPage;
