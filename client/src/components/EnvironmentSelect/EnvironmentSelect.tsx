import { Box, FormLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import OutsideLinkButton from "../OutsideLinkButton/OutsideLinkButton";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import classes from "./EnvironmentSelect.module.css";

const EnvironmentSelect = (): JSX.Element => {

    const {config, currentEnv, setCurrentEnv} = useContext(AppContext);
    if (!config || !currentEnv) return <></>;

    const handleEnvChange = (event: SelectChangeEvent): void => {
        let selectedEnv = config.envs.find(
            (env) => env.name === event.target.value
        );
        if (selectedEnv) {
            setCurrentEnv(selectedEnv);
        }
    };
    return (
        <>
            <Box className={classes.selectEnvContainer}>
                <FormLabel>
                    Environment:
                </FormLabel>

                <Select
                    size={"small"}
                    defaultValue={currentEnv.name}
                    onChange={handleEnvChange}
                >
                    {config.envs.map((env) => (
                        <MenuItem key={env.name} value={env.name}>
                            {env.name}
                        </MenuItem>
                    ))}
                </Select>

                <OutsideLinkButton
                    url={currentEnv.configUrl}
                    label="open configuration"
                />
            </Box>
        </>
    )
}

export default EnvironmentSelect;
