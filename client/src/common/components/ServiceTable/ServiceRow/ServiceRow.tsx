import { ServiceType } from "../../../../react-app-env";
import { useServiceData } from "../../../hooks/useServiceData/useServiceData";
import StatusIndicator from "./StatusIndicator/StatusIndicator";
import { Button, IconButton, TableCell, TableRow } from "@mui/material";
import { ContentCopyRounded, RefreshRounded } from "@mui/icons-material";
import CopyContentButton from "../../CopyContentButton/CopyContentButton";
import { LoadingButton } from "@mui/lab";

type ServiceRowProps = {
    service: ServiceType,
}

const generateLink = (url: string) => {
    return <a href={url}>{url.substring(0, 24) + '...'}</a>
}

const ServiceRow = ({ service }: ServiceRowProps) => {

    const {serviceStatus, serviceCommit, isError, isLoading, refreshServiceStatus} = useServiceData(service);

    return(
        <TableRow>
            <TableCell>{service.name}</TableCell>
            <TableCell>
                <StatusIndicator isLoading={isLoading} serviceStatus={serviceStatus} />
                {isError && ("Error loading status.")}
            </TableCell>
            <TableCell>{service.branch} / {serviceCommit}</TableCell>
            <TableCell>
                {generateLink(service.repositoryUrl)}
                <CopyContentButton content={service.repositoryUrl} />
            </TableCell>
            <TableCell>
                {generateLink(service.swaggerUrl)}
                <CopyContentButton content={service.swaggerUrl} />
            </TableCell>
            <TableCell>
                {generateLink(service.jenkinsUrl)}
                <CopyContentButton content={service.jenkinsUrl} />
            </TableCell>
            <TableCell>
                <LoadingButton
                    loading={isLoading}
                    variant="outlined"
                    startIcon={<RefreshRounded />}
                    onClick={refreshServiceStatus}
                    loadingPosition="start"
                >
                    Refresh
                </LoadingButton>
            </TableCell>
        </TableRow>
    );

};

export default ServiceRow;
