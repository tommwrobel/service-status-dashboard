import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Settings } from "@mui/icons-material";
import "./ApplicationBar.css";

const ApplicationBar = (): JSX.Element => {
    return (
        <AppBar className="ApplicationBar" position="relative">
            <Toolbar className="Toolbar">
                <Typography variant="h6">Services Status Dashboard</Typography>
                <IconButton>
                    <Settings />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default ApplicationBar;
