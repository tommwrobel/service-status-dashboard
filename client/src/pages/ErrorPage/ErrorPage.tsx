import { Box, CircularProgress, Typography } from "@mui/material";
import "./ErrorPage.css";
import { ErrorOutlineOutlined } from "@mui/icons-material";

type ErrorPageProps = {
    message?: string,
}

const ErrorPage = ({message}: ErrorPageProps): JSX.Element => {
    return (
        <Box
            className="errorPageContainer"
        >
            <ErrorOutlineOutlined className="errorIcon" color="error"  fontSize="large"/>
            {message && <Typography className="message">{message}</Typography>}
        </Box>
    );
};

export default ErrorPage;
