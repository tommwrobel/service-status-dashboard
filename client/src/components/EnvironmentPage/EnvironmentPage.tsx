import React, { useEffect, useState } from "react";
import { useConfigData } from "../../hooks/useConfigData/useConfigData";
import ServicesTable from "../ServicesTable/ServicesTable";
import { CircularProgress, Container } from "@mui/material";
import EnvironmentPageBar from "./EnvironmentPageBar/EnvironmentPageBar";
import { useQueryClient } from "react-query";
import { Environment, Maybe } from "../../types/types";
import "./EnvironmentPage.css";

const EnvironmentPage = (): JSX.Element => {
    const queryClient = useQueryClient();

    const [environment, setEnvironment] = useState<Maybe<Environment>>();

    const { config, isLoading } = useConfigData();

    useEffect(() => {
        if (config?.envs) {
            setEnvironment(config.envs[0]);
        }
    }, [config, queryClient]);

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
                        <ServicesTable services={environment.services} />
                    )}
                </Container>
            </>
        );
    return <span>Error while loading configuration!</span>;
};

export default EnvironmentPage;
