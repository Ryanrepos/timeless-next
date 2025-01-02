import React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Divider, MenuItem } from '@mui/material';
import { Typography } from '@mui/material';
import { Stack } from 'phosphor-react';
const TestTable = () => {
  return (
   <>
    <Typography>Testing Table</Typography>
    <TableContainer component={Paper}>
        <Table>
            <TableHead sx={{background: "violet"}}>
                <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Context</TableCell>
                    <TableCell>Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tableData.map((row) => (
                    <TableRow key={row.category}>
                        <TableCell>{row.category}</TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.content}</TableCell>
                        <TableCell>{row.date}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
   </>
  )
}

const tableData = [
    {
        category: "Event",
        title: "Sale",
        content: "welcome to sale",
        date: "12.14.2024"
    }
]

export default TestTable