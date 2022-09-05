import { useServiceData } from "../../../hooks/useServiceData/useServiceData";
import StatusIndicator from "./StatusIndicator/StatusIndicator";
import { TableCell, TableRow } from "@mui/material";
import { RefreshRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import CopyableLink from "../../CopyableLink/CopyableLink";
import { Service } from "../../../types/types";
import ServiceInfo from "../../ServiceInfo/ServiceInfo";

type ServiceRowProps = {
    service: Service,
}

const ServiceRow = ({ service }: ServiceRowProps): JSX.Element => {

    const {
        serviceStatus,
        gitInfo,
        buildInfo,
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
                <ServiceInfo
                    gitInfo={gitInfo}
                    buildInfo={buildInfo}
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
