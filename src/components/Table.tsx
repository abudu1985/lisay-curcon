import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ICurrency } from "../types";

interface TableProps {
  data: ICurrency[];
}

export default function BasicTable({ data }: TableProps) {
  const tableHearData = ["Currency/Current Ddate", "Buy", "Sell"];
  const tableBodyData = data.map((item) => ({
    name: `${item.ccy}/${item.base_ccy}`,
    buy: +item.buy,
    sell: +item.sale,
  }));

  return (
    <TableContainer
      component={Paper}
      sx={{ marginBottom: "100px", width: "auto" }}
    >
      <Table sx={{ maxWidth: 600, minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHearData.map((item, index) => (
              <TableCell align="left" key={index}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBodyData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                align="left"
                sx={{ width: "120px" }}
              >
                {row.name}
              </TableCell>
              <TableCell align="left">{row.buy.toFixed(2)}</TableCell>
              <TableCell align="left">{row.sell.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
