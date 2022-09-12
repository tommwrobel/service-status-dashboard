import { Box, Typography } from "@mui/material";
import classes from "./ErrorPage.module.css";
import { ErrorOutlineOutlined } from "@mui/icons-material";

type ErrorPageProps = {
    message?: string,
}

const ErrorPage = ({message}: ErrorPageProps): JSX.Element => {
    return (
        <Box
            className={classes.errorPageContainer}
        >
            <ErrorOutlineOutlined className={classes.errorIcon} color="error"  fontSize="large"/>
            {message && <Typography className={classes.message}>{message}</Typography>}
        </Box>
    );
};

export default ErrorPage;
