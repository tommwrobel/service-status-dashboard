import React, { useContext } from "react";
import ServicesTable from "../../components/ServicesTable/ServicesTable";
import { Container } from "@mui/material";
import classes from "./StatusPage.module.css";
import { AppContext } from "../../context/AppContext";

const StatusPage = (): JSX.Element => {

    const {currentEnv} = useContext(AppContext);

    return (
        <>
            <Container
                className={classes.environmentPageContainer}
                maxWidth={false}
            >
                {currentEnv && <ServicesTable env={currentEnv} />}
            </Container>
        </>
    );
};

export default StatusPage;
