import { useQueryClient } from "react-query";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { RefreshRounded } from "@mui/icons-material";

const ApplicationBar = () => {

    const queryClient = useQueryClient();

    const handleRefreshData = (): void => {
        queryClient.invalidateQueries();
    }

    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Service Status Dashboard
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<RefreshRounded />}
                    color="inherit"
                    onClick={handleRefreshData}
                >
                    Refresh Data
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default ApplicationBar;
