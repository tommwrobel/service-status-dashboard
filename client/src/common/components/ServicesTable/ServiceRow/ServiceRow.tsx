import { MouseEvent } from "react";
import { ServiceType } from "../../../../react-app-env";
import { useServiceData } from "../../../hooks/useServiceData/useServiceData";
import StatusIndicator from "./StatusIndicator/StatusIndicator";
import { Divider, IconButton, Link, Menu, MenuItem, TableCell, TableRow } from "@mui/material";
import { ContentCopyRounded, MoreHoriz, Refresh, RefreshRounded } from "@mui/icons-material";
import CopyContentButton from "../../CopyContentButton/CopyContentButton";
import { LoadingButton } from "@mui/lab";
import CopyableLink from "../../CopyableLink/CopyableLink";
import GitInfo from "../../GitInfo/GitInfo";

type ServiceRowProps = {
    service: ServiceType,
}

const ServiceRow = ({ service }: ServiceRowProps) => {

    const {
        serviceStatus,
        serviceCommit,
        serviceBranch,
        isError,
        isLoading,
        isFetching,
        refreshServiceStatus
    } = useServiceData(service);

    return(
        <TableRow>
            <TableCell>{service.name}</TableCell>
            <TableCell>
                <StatusIndicator isLoading={isLoading || isFetching} serviceStatus={serviceStatus} />
                {isError && ("(Error)")}
            </TableCell>
            <TableCell>
                <GitInfo
                    branch={serviceBranch}
                    commit={serviceCommit}
                    isLoading={isLoading || isFetching}
                />
            </TableCell>
            <TableCell>
                <CopyableLink href={service.repositoryUrl} />
            </TableCell>
            <TableCell>
                <CopyableLink href={service.swaggerUrl} />
            </TableCell>
            <TableCell>
                <CopyableLink href={service.jenkinsUrl} />
            </TableCell>
            <TableCell>
                <LoadingButton
                    loading={isLoading || isFetching}
                    variant="outlined"
                    startIcon={<RefreshRounded />}
                    onClick={refreshServiceStatus}
                    loadingPosition="start"
                    size="small"
                >
                    Refresh
                </LoadingButton>
            </TableCell>
        </TableRow>
    );

};

export default ServiceRow;
