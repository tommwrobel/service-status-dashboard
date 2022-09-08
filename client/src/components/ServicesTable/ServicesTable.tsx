import { ExampleInfo, Service } from "../../types/types";
import AutoTable from "../AutoTable/AutoTable";

type ServicesTableProps = {
    services: Service[];
};

const ServicesTable = ({ services }: ServicesTableProps): JSX.Element => {

    return (
        <AutoTable
            columns={[
                {
                    key: 'serviceName',
                    displayName: 'Service Name',
                    isSortable: true,
                },
                {
                    key: 'serviceStatus',
                    displayName: 'Status',
                    isHideable: true,
                    isSortable: true,
                },
                {
                    key: 'branch',
                    displayName: 'Branch',
                    isHideable: true,
                    isSortable: true,
                },
                {
                    key: 'info',
                    displayName: 'info',
                    isSortable: true,
                    valueComparator: (a: ExampleInfo, b: ExampleInfo) => a.name.localeCompare(b.name),
                },
                {
                    key: 'actions',
                    displayName: 'Actions',
                    valueProcessor: () => <>Action buttons</>,
                },
            ]}
            data={[
                {serviceName: 'Local service', serviceStatus: 'Success', branch: 1, info: {id: 1, name: 'c'}},
                {serviceName: 'Mailing service', serviceStatus: 'Fail', branch: 4, info: {id: 2, name: 'd'}},
                {serviceName: 'CI/CD pipelines', serviceStatus: 'Pending', branch: 100, info: {id: 3, name: 'a'}},
                {serviceName: 'Other service', serviceStatus: 'Success', branch: 15, info: {id: 4, name: 'z'}}
            ]}
        />
    );
};

export default ServicesTable;
