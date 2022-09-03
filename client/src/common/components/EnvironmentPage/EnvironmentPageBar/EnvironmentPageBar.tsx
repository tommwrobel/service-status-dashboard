import { useQueryClient } from "react-query";
import {
    Button,
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
import { EnvType } from "../../../../react-app-env";

type EnvironmentPageBarProps = {
    environments: EnvType[];
    onEnvironmentChange: (value: string) => void;
    onAutomaticallyRefreshChange: (value: boolean) => void;
}

const EnvironmentPageBar = ({ environments, onEnvironmentChange, onAutomaticallyRefreshChange }: EnvironmentPageBarProps) => {

    const queryClient = useQueryClient();

    const handleRefreshData = (): void => {
        queryClient.invalidateQueries();
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
                    <FormLabel>Select environment: </FormLabel>

                    <Select size={"small"} defaultValue={environments[0].name || ''} onChange={handleEnvironmentChange}>
                        {environments.map(env => (
                            <MenuItem key={env.name} value={env.name}>{env.name}</MenuItem>
                        ))}
                    </Select>
                </div>

                <div style={{display: "flex", gap: 12, alignItems: "center"}}>
                    <FormControlLabel
                        control={<Checkbox onChange={handleAutomaticallyRefreshChange}/>}
                        label="Refresh data automatically"
                        labelPlacement="start"
                    />
                    <LoadingButton
                        loading={queryClient.isFetching() > 0}
                        variant="outlined"
                        startIcon={<RefreshRounded />}
                        onClick={handleRefreshData}
                        loadingPosition="start"
                    >
                        Refresh Environment
                    </LoadingButton>
                </div>
            </Toolbar>
    );
}

export default EnvironmentPageBar;