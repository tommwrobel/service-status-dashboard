import React, { useEffect, useState } from "react";
import ServicesTable from "../../components/ServicesTable/ServicesTable";
import { Container } from "@mui/material";
import { Config, Environment } from "../../types/types";
import "./StatusPage.css";
import useServicesData from "../../hooks/useServicesData/useServicesData";
import StatusPageBar from "./StatusPageBar/StatusPageBar";
import { useQueryClient } from "@tanstack/react-query";

type StatusPageProps = {
    config: Config,
}

const StatusPage = ({config}: StatusPageProps): JSX.Element => {

    const [environment, setEnvironment] = useState<Environment>(config.envs[0]);

    const queryClient = useQueryClient();
    const {services, handleChangeEnvironment} = useServicesData(environment, queryClient);

    useEffect(() => {
        handleChangeEnvironment(environment);
    }, [environment]);

    return (
        <>
            <Container
                className="EnvironmentPageContainer"
                maxWidth={false}
            >
                <StatusPageBar
                    environments={config.envs}
                    onEnvironmentChange={setEnvironment}
                />
                <ServicesTable services={services} />
            </Container>
        </>
        );
};

export default StatusPage;
