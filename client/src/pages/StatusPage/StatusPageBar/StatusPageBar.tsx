import {
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

    const queryClient = useQueryClient();

    const handleRefreshData = () => {
        queryClient.refetchQueries(['serviceHealth']);
        queryClient.refetchQueries(['serviceInfo']);
    }

    return (
        <Toolbar className="Toolbar">
            <div className="ToolbarItemsGroup">
                <FormLabel>Environment:</FormLabel>

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

                {currentEnvironment && (
                    <Button
                        variant="outlined"
                        endIcon={<OpenInNew />}
                        href={currentEnvironment.configUrl}
                        target="_blank"
                    >
                        Open configuration
                    </Button>
                )}
            </div>

            <div className="ToolbarItemsGroup">
                <LoadingButton
                    onClick={handleRefreshData}
                    loading={queryClient.isFetching()  > 0}
                    variant="outlined"
                    startIcon={<RefreshRounded />}
                    loadingPosition="start"
                >
                    Refresh Data
                </LoadingButton>
            </div>
        </Toolbar>
    );
};

export default StatusPageBar;
