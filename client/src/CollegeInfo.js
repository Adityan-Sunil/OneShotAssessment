import { Card, CardContent, CardHeader, Table, TableBody, TableCell, TableRow, Typography, Container } from "@material-ui/core";

export function CollegeInfo(props){
    console.log(props);
    let _props
    if(props.info !== undefined)
        _props = props.info[0]
    else
        return(<><Container style={{width:'100%'}}>
          <Typography variant="h6" color="initial">Choose a College from the adjacent list</Typography>
        </Container></>);
    return(
        <Card style={{height:'100%'}}>
            <CardHeader title={_props.name}/>
            <CardContent>
                <Table style={{height:'100%'}}>
                    <TableBody>
                        <TableRow>
                            <TableCell>Established Year</TableCell>
                            <TableCell align="right">{_props.data}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>State</TableCell>
                            <TableCell align="right">{_props.state}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell align="right">{_props.address}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Students enrolled</TableCell>
                            <TableCell align="right">{_props.count}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}