import { LoadingButton } from "@mui/lab";
import { RefreshRounded } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { Box, FormControlLabel, Switch } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import "./RefreshDataBar.css";

const RefreshDataBar = () => {

    const [isAutomaticRefresh, setIsAutomaticRefresh] = useState(false);

    const queryClient = useQueryClient();

    const handleRefreshData = () => {
        queryClient.refetchQueries(['serviceHealth']);
        queryClient.refetchQueries(['serviceInfo']);
    }

    useEffect(() => {
        let refreshInterval: NodeJS.Timer;
        if (isAutomaticRefresh) {
            refreshInterval = setInterval(() => {
                handleRefreshData();
            }, 30000);
        }
        return () => clearInterval(refreshInterval);
    } ,[isAutomaticRefresh]);

    const handleAutoRefreshChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setIsAutomaticRefresh(checked);
    }

    return (
        <Box className="refreshDataBarContainer">
            <LoadingButton
                onClick={handleRefreshData}
                loading={queryClient.isFetching()  > 0}
                variant="outlined"
                startIcon={<RefreshRounded />}
                loadingPosition="start"
            >
                Refresh Data
            </LoadingButton>

            <FormControlLabel control={<Switch onChange={handleAutoRefreshChange} />} label="Refresh every 30s" />
        </Box>
    );
}

export default RefreshDataBar;
