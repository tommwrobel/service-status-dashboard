import { AppBar, Toolbar, Typography } from "@mui/material";
import "./ApplicationBar.css";

const ApplicationBar = (): JSX.Element => {
    return (
        <AppBar position="relative">
            <Toolbar className="appBarToolbar">
                <img src="logo.svg" alt="" className="appLogo"/>
                <Typography variant="h6">Services Status Dashboard</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default ApplicationBar;
