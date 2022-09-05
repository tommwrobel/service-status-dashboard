import { useQueryClient } from "react-query";
import {
    Checkbox,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Toolbar
} from "@mui/material";
import { RefreshRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { ChangeEvent } from "react";
import { Environment } from "../../../types/types";

type EnvironmentPageBarProps = {
    environments: Environment[];
    onEnvironmentChange: (value: string) => void;
    onAutomaticallyRefreshChange: (value: boolean) => void;
}

const EnvironmentPageBar = ({ environments, onEnvironmentChange, onAutomaticallyRefreshChange }: EnvironmentPageBarProps): JSX.Element => {

    const queryClient = useQueryClient();

    const handleRefreshData = (): void => {
        queryClient.refetchQueries(['service']);
    }

    const handleEnvironmentChange = (event: SelectChangeEvent<string>): void => {
        onEnvironmentChange(event.target.value);
    }

    const handleAutomaticallyRefreshChange = (event: ChangeEvent<HTMLInputElement>): void => {
        onAutomaticallyRefreshChange(event.target.checked)
    }

    return (
            <Toolbar style={{ justifyContent: "space-between", gap: "1rem"}}>
                <div style={{display: "flex", gap: 12, alignItems: "center"}}>
                    <FormLabel>Environment: </FormLabel>

                    <Select size={"small"} defaultValue={environments[0].name || ''} onChange={handleEnvironmentChange}>
                        {environments.map(env => (
                            <MenuItem key={env.name} value={env.name}>{env.name}</MenuItem>
                        ))}
                    </Select>
                    {/*// TODO: add link to config envs.configUrl*/}
                </div>
                <div style={{display: "flex", gap: 12, alignItems: "center"}}>
                    <FormControlLabel
                        control={<Checkbox onChange={handleAutomaticallyRefreshChange}/>}
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
}

export default EnvironmentPageBar;
