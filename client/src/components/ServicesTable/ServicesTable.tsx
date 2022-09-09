import { ServiceInfo, ServiceRow, ServiceStatus } from "../../types/types";
import AutoTable from "../AutoTable/AutoTable";
import ServiceInfoBox from "../ServiceInfoBox/ServiceInfoBox";
import CopyableLink from "../CopyableLink/CopyableLink";
import StatusIndicator from "../StatusIndicator/StatusIndicator";
import { IconButton } from "@mui/material";
import { RefreshRounded } from "@mui/icons-material";

type ServicesTableProps = {
    services: ServiceRow[];
};

const ServicesTable = ({ services }: ServicesTableProps): JSX.Element => {

    return (
        <AutoTable
            columns={[
                {
                    key: "name",
                    displayName: "Service Name",
                    isSortable: true,
                },
                {
                    key: "status",
                    displayName: "Status",
                    isSortable: true,
                    valueProcessor: (status: ServiceStatus, data: ServiceRow) => {
                        return <StatusIndicator status={status} dataStatus={data.statusDataStatus}/>
                    },
                },
                {
                    key: "buildInfo",
                    displayName: "Build Info",
                    isSortable: true,
                    isHideable: true,
                    valueProcessor: (value, data: ServiceRow) => {
                        return <ServiceInfoBox data={value} dataStatus={data.buildInfoDataStatus}/>
                    },
                    valueComparator: (a: ServiceInfo, b: ServiceInfo) =>
                        a?.git.branch.localeCompare(b?.git.branch),
                },
                {
                    key: "repositoryUrl",
                    displayName: "Repository",
                    isHideable: true,
                    valueProcessor: (href: string) => <CopyableLink href={href} />
                },
                {
                    key: "swaggerUrl",
                    displayName: "Swagger",
                    isHideable: true,
                    valueProcessor: (href: string) => <CopyableLink href={href} />
                },
                {
                    key: "jenkinsUrl",
                    displayName: "Jenkins",
                    isHideable: true,
                    valueProcessor: (href: string) => <CopyableLink href={href} />
                },
                {
                    key: "refreshServiceData",
                    displayName: "Actions",
                    valueProcessor: (refreshRowData: () => void, data: ServiceRow) =>
                        <IconButton
                            onClick={refreshRowData}
                            disabled={data.statusDataStatus === "loading" || data.buildInfoDataStatus === "loading"}
                        >
                            <RefreshRounded/>
                        </IconButton>,
                },
            ]}
            data={services}
        />
    );
};

export default ServicesTable;
