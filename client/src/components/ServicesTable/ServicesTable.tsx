import { Environment, ServiceInfo, ServiceRow, ServiceStatus } from "../../types/types";
import AutoTable from "../AutoTable/AutoTable";
import ServiceInfoBox from "../ServiceInfoBox/ServiceInfoBox";
import CopyableLink from "../CopyableLink/CopyableLink";
import StatusIndicator from "../StatusIndicator/StatusIndicator";
import { IconButton } from "@mui/material";
import { RefreshRounded } from "@mui/icons-material";
import RefreshDataBar from "../RefreshDataBar/RefreshDataBar";
import useServicesData from "../../hooks/useServicesData/useServicesData";
import { useQueryClient } from "@tanstack/react-query";
import CopyableLinkButton from "../CopyableLinkButton/CopyableLinkButton";

type ServicesTableProps = {
    env: Environment;
};

const ServicesTable = ({ env }: ServicesTableProps): JSX.Element => {

    const queryClient = useQueryClient();

    const {services} = useServicesData(env.services, queryClient);

    return (
        <AutoTable
            searchBy={['name', 'status', 'buildInfo']}
            endBarContent={<RefreshDataBar />}
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
                    valueProcessor: (value, data: ServiceRow) => (
                        <ServiceInfoBox
                            data={value}
                            devBranchName={data.branch}
                            dataStatus={data.buildInfoDataStatus}
                        />
                    ),
                    valueComparator: (a: ServiceInfo, b: ServiceInfo) =>
                        a?.git?.branch.localeCompare(b?.git?.branch),
                },
                {
                    key: "repositoryUrl",
                    displayName: "Repository",
                    isHideable: true,
                    valueProcessor: (href: string) => <CopyableLinkButton href={href} label="Repository" />
                },
                {
                    key: "swaggerUrl",
                    displayName: "Swagger",
                    isHideable: true,
                    valueProcessor: (href: string) => <CopyableLinkButton href={href} label="Swagger" />
                },
                {
                    key: "jenkinsUrl",
                    displayName: "Jenkins",
                    isHideable: true,
                    valueProcessor: (href: string) => <CopyableLinkButton href={href} label="Jenkins" />
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
            data={[...services]}
        />
    );
};

export default ServicesTable;
