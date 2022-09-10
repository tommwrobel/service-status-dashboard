import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import "./ApplicationBar.css";
import EnvironmentSelect from "../EnvironmentSelect/EnvironmentSelect";

const ApplicationBar = (): JSX.Element => {
    return (
        <AppBar position="relative">
            <Toolbar className="appBarToolbar">
                <Box className="toolbarItemsGroup">
                    <img src="logo.svg" alt="" className="appLogo"/>
                    <Typography variant="h6">Services Status Dashboard</Typography>
                </Box>
                <Box className="toolbarItemsGroupCenter">
                    <EnvironmentSelect />
                </Box>
                <Box className="toolbarItemsGroup">
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default ApplicationBar;
