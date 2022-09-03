import { AppBar, Toolbar, Typography } from "@mui/material";

const ApplicationBar = () => {

    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Services Status Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default ApplicationBar;
