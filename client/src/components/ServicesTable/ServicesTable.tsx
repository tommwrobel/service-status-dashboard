import { Environment, Service, ServiceInfo, ServiceRowData, ServiceStatus } from "../../types/types";
import AutoTable from "../AutoTable/AutoTable";
import ServiceInfoBox from "../ServiceInfoBox/ServiceInfoBox";
import CopyableLink from "../CopyableLink/CopyableLink";
import StatusIndicator from "../StatusIndicator/StatusIndicator";
import useEnvironmentData from "../../hooks/useEnvironmentData/useEnvironmentData";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";

type ServicesTableProps = {
    environment: Environment;
};

const ServicesTable = ({ environment }: ServicesTableProps): JSX.Element => {

    const queryClient = useQueryClient();
    console.log(environment)
    const {services, handleRefreshServiceData} = useEnvironmentData(environment, queryClient);
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
                    valueProcessor: (status: ServiceStatus, data: ServiceRowData) => {
                        return <StatusIndicator status={status} dataStatus={data.dataStatus}/>
                    },
                },
                {
                    key: "buildInfo",
                    displayName: "Build Info",
                    isSortable: true,
                    isHideable: true,
                    valueProcessor: (value, data: ServiceRowData) => {
                        return <ServiceInfoBox data={value} dataStatus={data.dataStatus}/>
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
                    key: "refreshData",
                    displayName: "Actions",
                    valueProcessor: (value) => <Button onClick={value}>Refresh</Button>,
                },
            ]}

            data={services?.map(service => ({
                name: service.name,
                status: service.status,
                buildInfo: service.buildInfo,
                repositoryUrl: service.repositoryUrl,
                swaggerUrl: service.swaggerUrl,
                jenkinsUrl: service.jenkinsUrl,
                dataStatus: service.dataStatus,
                refreshData: () => handleRefreshServiceData(service.appUrl, service.appHealthUrl, service.appInfoUrl),
            }))}
        />
    );
};

export default ServicesTable;
