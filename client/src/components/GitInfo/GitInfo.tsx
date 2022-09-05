import { Typography } from "@mui/material";

type GitInfoProps = {
    branch?: string | null;
    commit?: string | null;
    isLoading: boolean;
}

// TODO: refactor this component
const GitInfo = ({ branch, commit, isLoading }: GitInfoProps): JSX.Element => {

    if (isLoading) return <Typography style={{fontSize: '0.875rem',fontStyle: "italic", color: "#bdbdbd"}}>Pending info...</Typography>
    if (!branch || !commit) return <Typography style={{fontSize: '0.875rem', fontStyle: "italic", color: "#bdbdbd"}}>(No data)</Typography>

    return (
        <>
            {`${branch} / ${commit}`}
        </>
    );
}

export default GitInfo;
