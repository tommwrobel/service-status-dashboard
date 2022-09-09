import React, { useEffect, useState } from "react";
import { useConfigData } from "../../hooks/useConfigData/useConfigData";
import ServicesTable from "../ServicesTable/ServicesTable";
import { CircularProgress, Container } from "@mui/material";
import EnvironmentPageBar from "./EnvironmentPageBar/EnvironmentPageBar";
import { Environment, Maybe, Nullable, Service } from "../../types/types";
import "./EnvironmentPage.css";
import { useQueryClient } from "@tanstack/react-query";

const EnvironmentPage = (): JSX.Element => {

    const queryClient = useQueryClient();

    const [environment, setEnvironment] = useState<Maybe<Environment>>();
    const [services, setServices] = useState<Maybe<Service[]>>();

    const [count, setCount] = useState(0);

    const { config, isLoading } = useConfigData();

    useEffect(() => {
        if (config?.envs) {
            setEnvironment(config.envs[0]);
        }
    }, [config, queryClient]);

    useEffect(() => {
        if (environment) {
            setServices(environment.services);
        }
    }, [environment]);

    if (isLoading)
        return (
            <CircularProgress
                size={60}
                style={{ display: "block", margin: "5rem auto" }}
            />
        );
    if (config)
        return (
            <>
                <Container
                    className="EnvironmentPageContainer"
                    maxWidth={false}
                >
                    <EnvironmentPageBar
                        environments={config?.envs}
                        onEnvironmentChange={setEnvironment}
                    />
                    {environment && (
                        <ServicesTable environment={environment} />
                    )}
                </Container>
            </>
        );
    return <span>Error while loading configuration!</span>;
};

export default EnvironmentPage;
