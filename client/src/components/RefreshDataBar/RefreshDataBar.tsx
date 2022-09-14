import { LoadingButton } from "@mui/lab";
import { RefreshRounded } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { Box, FormControlLabel, Switch, Tooltip } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import classes from "./RefreshDataBar.module.css";

const RefreshDataBar = () => {

    const [isAutomaticRefresh, setIsAutomaticRefresh] = useState(false);

    const queryClient = useQueryClient();

    useEffect(() => {
        let refreshInterval: NodeJS.Timer;
        if (isAutomaticRefresh) {
            refreshInterval = setInterval(() => {
                queryClient.refetchQueries(['serviceHealth']);
                queryClient.refetchQueries(['serviceInfo']);
            }, 30000);
        }
        return () => clearInterval(refreshInterval);
    } ,[isAutomaticRefresh, queryClient]);

    const handleAutoRefreshChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setIsAutomaticRefresh(checked);
    }

    const handleRefreshData = () => {
        queryClient.refetchQueries(['serviceHealth']);
        queryClient.refetchQueries(['serviceInfo']);
    }

    return (
        <Box className={classes.refreshDataBarContainer}>
            <Tooltip title="Refresh services statuses and build info">
                <LoadingButton
                    onClick={handleRefreshData}
                    loading={queryClient.isFetching()  > 0}
                    variant="outlined"
                    startIcon={<RefreshRounded />}
                    loadingPosition="start"
                >
                    Refresh Data
                </LoadingButton>
            </Tooltip>

            <FormControlLabel control={<Switch onChange={handleAutoRefreshChange} />} label="Refresh every 30s" />
        </Box>
    );
}

export default RefreshDataBar;
