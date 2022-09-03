import React, { useEffect, useState } from 'react';
import { useConfigData } from "../../hooks/useConfigData/useConfigData";
import ServicesTable from "../ServicesTable/ServicesTable";
import { CircularProgress, Container } from "@mui/material";
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
        queryClient.setDefaultOptions({
            queries: {
                ...queryClient.getDefaultOptions().queries,
                refetchInterval: automaticRefresh ? 10000 : false
            },
        });
        queryClient.refetchQueries();
    }, [automaticRefresh])

    const findServices = (environmentName: string): ServiceType[] => {
        return config?.envs?.find(env => env.name === environmentName)?.services || [] as ServiceType[];
    }

    if (isLoading) return <CircularProgress size={60} style={{display: "block", margin: "5rem auto"}}/>;
    if (config)
        return (
            <>
                <Container maxWidth={false} sx={{ m: "1rem auto" }}>
                    <EnvironmentPageBar
                        environments={config?.envs}
                        onEnvironmentChange={setEnvironment}
                        onAutomaticallyRefreshChange={setAutomaticRefresh}
                    />
                    {environment && <ServicesTable services={findServices(environment)} />}
                </Container>
            </>
        );
    return <span>Error while loading configuration!</span>;
}

export default EnvironmentPage;
