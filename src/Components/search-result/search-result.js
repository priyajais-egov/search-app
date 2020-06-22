import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

export default class SearchResult extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { messages = [] } = this.props;
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Module</TableCell>
                            <TableCell>Locale</TableCell>
                            <TableCell >Message</TableCell>
                            <TableCell >Code</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {messages.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.module}
                                </TableCell>
                                <TableCell >{row.locale}</TableCell>
                                <TableCell >{row.message}</TableCell>
                                <TableCell >{row.code}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

}