import { Box, Link } from "@mui/material";
import CopyContentButton from "../CopyContentButton/CopyContentButton";
import classes from "./CopyableLink.module.css";

type CopyableLinkProps = {
    href: string;
};

const CopyableLink = ({ href }: CopyableLinkProps): JSX.Element => {
    return (
        <>
            <Box className={classes.copyableLinkContainer}>
                <CopyContentButton content={href} />
                <Link href={href} target="_blank" rel="noopener" className={classes.copyableLinkText}>
                    <span>{href}</span>
                </Link>
            </Box>
        </>
    );
};

export default CopyableLink;
