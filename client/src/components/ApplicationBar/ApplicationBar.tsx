import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import classes from "./ApplicationBar.module.css";
import EnvironmentSelect from "../EnvironmentSelect/EnvironmentSelect";

const ApplicationBar = (): JSX.Element => {
    return (
        <AppBar position="relative">
            <Toolbar className={classes.appBarToolbar}>
                <Box className={classes.toolbarItemsGroup}>
                    <img src="logo.svg" alt="" className={classes.appLogo}/>
                    <Typography variant="h6">Services Status Dashboard</Typography>
                </Box>
                <Box className={classes.toolbarItemsGroup}>
                    <EnvironmentSelect />
                </Box>
                <Box className={classes.toolbarItemsGroup}>
                    { /*empty place for future menu*/ }
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default ApplicationBar;
