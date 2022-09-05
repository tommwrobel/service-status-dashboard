import ServiceRow from "./ServiceRow/ServiceRow";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { Service } from "../../types/types";

type StatusTableProps = {
    services: Service[];
};

const ServicesTable = ({ services }: StatusTableProps): JSX.Element => {
    return (
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
                        {services.map((service) => (
                            <ServiceRow key={service.name} service={service} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ServicesTable;
