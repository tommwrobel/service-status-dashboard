import React, { useContext } from "react";
import ServicesTable from "../../components/ServicesTable/ServicesTable";
import { Container } from "@mui/material";
import "./StatusPage.css";
import { AppContext } from "../../context/AppContext";

const StatusPage = (): JSX.Element => {

    const {currentEnv} = useContext(AppContext);
    {console.log(currentEnv)}

    return (
        <>
            <Container
                className="environmentPageContainer"
                maxWidth={false}
            >
                {currentEnv && <ServicesTable env={currentEnv} />}
            </Container>
        </>
    );
};

export default StatusPage;
