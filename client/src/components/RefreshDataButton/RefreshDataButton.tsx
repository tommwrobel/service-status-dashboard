import { LoadingButton } from "@mui/lab";
import { RefreshRounded } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";

const RefreshDataButton = () => {

    const queryClient = useQueryClient();

    const handleRefreshData = () => {
        queryClient.refetchQueries(['serviceHealth']);
        queryClient.refetchQueries(['serviceInfo']);
    }

    return (
        <LoadingButton
            onClick={handleRefreshData}
            loading={queryClient.isFetching()  > 0}
            variant="outlined"
            startIcon={<RefreshRounded />}
            loadingPosition="start"
        >
            Refresh Data
        </LoadingButton>
    );
}

export default RefreshDataButton;
