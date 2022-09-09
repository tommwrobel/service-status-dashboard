import { Box, CircularProgress, Typography } from "@mui/material";
import "./LoadingPage.css";

type LoadingPageProps = {
    message?: string,
}

const LoadingPage = ({message}: LoadingPageProps): JSX.Element => {
    return (
            <Box className="loadingPageContainer">
                <CircularProgress />
                {message && <Typography>{message}</Typography>}
            </Box>
    );
};

export default LoadingPage;
