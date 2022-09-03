import { ServiceType } from "../../../react-app-env";
import ServiceRow from "./ServiceRow/ServiceRow";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

type StatusTableProps = {
    services: ServiceType[]
}

const ServiceTable = ({ services }: StatusTableProps) => {

    return(
        <>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Service Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Branch / commit</TableCell>
                        <TableCell>Repository</TableCell>
                        <TableCell>Swagger</TableCell>
                        <TableCell>Jenkins</TableCell>
                        <TableCell>Refresh</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {services.map(service => <ServiceRow key={service.name} service={service} />)}
                </TableBody>
            </Table>
        </>
    );

};

export default ServiceTable;
