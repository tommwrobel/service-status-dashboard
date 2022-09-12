import { Box, CircularProgress, Typography } from "@mui/material";
import classes from "./LoadingPage.module.css";

type LoadingPageProps = {
    message?: string,
}

const LoadingPage = ({message}: LoadingPageProps): JSX.Element => {
    return (
            <Box className={classes.loadingPageContainer}>
                <CircularProgress />
                {message && <Typography>{message}</Typography>}
            </Box>
    );
};

export default LoadingPage;
