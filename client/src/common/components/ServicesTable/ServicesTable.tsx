import { ServiceType } from "../../../react-app-env";
import ServiceRow from "./ServiceRow/ServiceRow";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

type StatusTableProps = {
    services: ServiceType[]
}

const ServicesTable = ({ services }: StatusTableProps) => {

    return(
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Service Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Branch / Commit</TableCell>
                            <TableCell>Repository</TableCell>
                            <TableCell>Swagger</TableCell>
                            <TableCell>Jenkins</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map(service => <ServiceRow key={service.name} service={service} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

};

export default ServicesTable;
