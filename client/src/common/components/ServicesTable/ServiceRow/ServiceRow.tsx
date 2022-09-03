import { MouseEvent } from "react";
import { ServiceType } from "../../../../react-app-env";
import { useServiceData } from "../../../hooks/useServiceData/useServiceData";
import StatusIndicator from "./StatusIndicator/StatusIndicator";
import { Divider, IconButton, Link, Menu, MenuItem, TableCell, TableRow } from "@mui/material";
import { ContentCopyRounded, MoreHoriz, Refresh, RefreshRounded } from "@mui/icons-material";
import CopyContentButton from "../../CopyContentButton/CopyContentButton";
import { LoadingButton } from "@mui/lab";

type ServiceRowProps = {
    service: ServiceType,
}

const ServiceRow = ({ service }: ServiceRowProps) => {

    const {
        serviceStatus,
        serviceCommit,
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
                {isError && ("Error loading status.")}
            </TableCell>
            <TableCell>{service.branch} / {serviceCommit}</TableCell>
            <TableCell>
                <Link href={service.repositoryUrl}>{service.repositoryUrl.substring(8, 28)}</Link>
                <CopyContentButton content={service.repositoryUrl} />
            </TableCell>
            <TableCell>
                <Link href={service.repositoryUrl}>{service.swaggerUrl.substring(8, 28)}</Link>
                <CopyContentButton content={service.swaggerUrl} />
            </TableCell>
            <TableCell>
                <Link href={service.repositoryUrl}>{service.jenkinsUrl.substring(8, 28)}</Link>
                <CopyContentButton content={service.jenkinsUrl} />
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
