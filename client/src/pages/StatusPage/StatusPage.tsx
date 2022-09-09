import React, { useEffect, useState } from "react";
import ServicesTable from "../../components/ServicesTable/ServicesTable";
import { Container } from "@mui/material";
import { Config, Environment } from "../../types/types";
import "./StatusPage.css";
import useServicesData from "../../hooks/useEnvironmentData/useServicesData";
import StatusPageBar from "./StatusPageBar/StatusPageBar";

type StatusPageProps = {
    config: Config,
}

const StatusPage = ({config}: StatusPageProps): JSX.Element => {

    const [environment, setEnvironment] = useState<Environment>(config.envs[0]);

    const {services, handleChangeEnvironment} = useServicesData(environment);

    useEffect(() => {
        handleChangeEnvironment(environment);
    }, [environment]);

    if (config)
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
    return <span>Error while loading configuration!</span>;
};

export default StatusPage;
