import { AppBar, Toolbar, Typography } from "@mui/material";

const ApplicationBar = (): JSX.Element => {

    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6">
                    Services Status Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default ApplicationBar;
