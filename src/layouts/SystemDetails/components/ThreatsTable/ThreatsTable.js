import MDTypography from "../../../../components/MDTypography";
import { Box, Button, TableHead } from "@mui/material";
import { useEffect, useState } from "react";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import ThreatRow from "../ThreatRow/ThreatRow";


let   columns =  [
  { name: "Name", accessor: "name", width: "30%", props : {align: "left" }},
  { name: "Origin", accessor: "zones",  props : {align: "left" } },
  { name: "Actions", accessor: "action",  props : {align: "right" } },
]



const ThreatsTable = ({threats}) => {
  useEffect( () => {

  }, [])

  return (
    <Box sx={{ p:0, width: '100%', backgroundColor: '', my: 1}} >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{backgroundColor: ''  }}>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  {...column.props}
                >
                  <MDTypography variant="h6" color="dark">{column.name}</MDTypography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {/*{FRs.map((FR) => (*/}
            {/*  <FrRow key={FR.name} FR={FR} />*/}
            {/*))}*/}
            {threats?.map((threat, index) => (
              <ThreatRow key={threat.id} threat={threat} nextThreat={index < threat.length -1 ? threats[index+1] : null}/>
            ))}
            {/*{threats.length > 0 && <ThreatRow key={threats[0].id} threat={threats[0]} />}*/}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )

}

export default ThreatsTable
