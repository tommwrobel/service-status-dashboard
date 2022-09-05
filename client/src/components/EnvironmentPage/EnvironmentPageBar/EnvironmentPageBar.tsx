import { useQueryClient } from "react-query";
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Toolbar,
} from "@mui/material";
import { OpenInNew, RefreshRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { ChangeEvent, useEffect, useState } from "react";
import { Environment, Maybe } from "../../../types/types";
import "./EnvironmentPageBar.css";

type EnvironmentPageBarProps = {
    environments: Environment[];
    onEnvironmentChange: (value: Maybe<Environment>) => void;
};

const EnvironmentPageBar = ({
    environments,
    onEnvironmentChange,
}: EnvironmentPageBarProps): JSX.Element => {
    const [currentEnvironment, setCurrentEnvironment] =
        useState<Maybe<Environment>>();

    const queryClient = useQueryClient();

    useEffect(() => {
        setCurrentEnvironment(environments[0]);
    }, [environments]);

    const handleRefreshData = (): void => {
        queryClient.refetchQueries(["service"]);
    };

    const handleEnvironmentChange = (event: SelectChangeEvent): void => {
        let selectedEnvironment = environments.find(
            (env) => env.name === event.target.value
        );
        setCurrentEnvironment(selectedEnvironment);
        onEnvironmentChange(selectedEnvironment);
    };

    const handleAutomaticallyRefreshChange = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        queryClient.setDefaultOptions({
            queries: {
                ...queryClient.getDefaultOptions().queries,
                refetchInterval: event.target.checked ? 30000 : false,
            },
        });
        queryClient.refetchQueries();
    };

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
                        variant="text"
                        endIcon={<OpenInNew />}
                        href={currentEnvironment.configUrl}
                        target="_blank"
                    >
                        Open configuration
                    </Button>
                )}
            </div>
            <div className="ToolbarItemsGroup">
                <FormControlLabel
                    control={
                        <Checkbox onChange={handleAutomaticallyRefreshChange} />
                    }
                    label="Auto refresh every 30s"
                    labelPlacement="start"
                />

                <LoadingButton
                    loading={Boolean(queryClient.isMutating())}
                    variant="outlined"
                    startIcon={<RefreshRounded />}
                    onClick={handleRefreshData}
                    loadingPosition="start"
                >
                    Refresh All
                </LoadingButton>
            </div>
        </Toolbar>
    );
};

export default EnvironmentPageBar;
