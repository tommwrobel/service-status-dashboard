import { Link, Typography } from "@mui/material";

type GitInfoProps = {
    branch?: string | null;
    commit?: string | null;
    isLoading: boolean;
}

const GitInfo = ({ branch, commit, isLoading }: GitInfoProps) => {

    if (isLoading) return <Typography style={{fontSize: '0.875rem',fontStyle: "italic", color: "#bdbdbd"}}>Pending info...</Typography>
    if (!branch || !commit) return <Typography style={{fontSize: '0.875rem', fontStyle: "italic", color: "#bdbdbd"}}>(No data)</Typography>

    return (
        <>
            {`${branch} / ${commit}`}
        </>
    );
}

export default GitInfo;
