import { Link } from "@mui/material";
import CopyContentButton from "../CopyContentButton/CopyContentButton";

type CopyableLinkProps = {
    href: string;
}

const CopyableLink = ({ href }: CopyableLinkProps) => {

    return (
        <>
            <CopyContentButton content={href} />
            <Link
                href={href}
                target="_blank"
                rel="noopener"
            >
                {href.substring(0, 28)}...
            </Link>
        </>
    );
}

export default CopyableLink;
