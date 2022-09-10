import {
    Box,
    Button,
    FormLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Toolbar,
} from "@mui/material";
import { OpenInNew, RefreshRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Environment } from "../../../types/types";
import "./StatusPageBar.css";
import { useQueryClient } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import OutsideLinkButton from "../../../components/OutsideLinkButton/OutsideLinkButton";
import RefreshDataButton from "../../../components/RefreshDataButton/RefreshDataButton";

type StatusPageBarProps = {
    environments: Environment[];
    onEnvironmentChange: (value: Environment) => void;
};

const StatusPageBar = ({
    environments,
    onEnvironmentChange,
}: StatusPageBarProps): JSX.Element => {

    const [currentEnvironment, setCurrentEnvironment] =
        useState<Environment>(environments[0]);

    useEffect(() => {
        setCurrentEnvironment(environments[0]);
    }, [environments]);

    const handleEnvironmentChange = (event: SelectChangeEvent): void => {
        let selectedEnvironment = environments.find(
            (env) => env.name === event.target.value
        );
        if (selectedEnvironment) {
            setCurrentEnvironment(selectedEnvironment);
            onEnvironmentChange(selectedEnvironment);
        }
    };

    return (
        <Toolbar className="Toolbar">
            <Box className="ToolbarItemsGroup">
                <Select
                    size={"small"}
                    defaultValue={environments[0].name}
                    onChange={handleEnvironmentChange}
                >
                    {environments.map((env) => (
                        <MenuItem key={env.name} value={env.name}>
                            {env.name}
                        </MenuItem>
                    ))}
                </Select>
                <OutsideLinkButton
                    url={currentEnvironment.configUrl}
                    label="open configuration" />
            </Box>
            <Box className="ToolbarItemsGroup">
                <RefreshDataButton />
            </Box>
        </Toolbar>
    );
};

export default StatusPageBar;
