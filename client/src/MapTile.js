
import India from '@svg-maps/india';
import {SVGMap} from "react-svg-map";
import {Grid, Paper}from '@material-ui/core'
export default function MapTile(params) {
    return(
        <Grid container item xs={12} spacing={1}>
        <Grid item xs={3} spacing={2}>
        <Paper>
            <SVGMap  map={India} />
        </Paper>
        </Grid>
        <Grid container item xs={9} spacing={1}> <Paper style={{height:'100%', width:'100%'}}>Hello</Paper> </Grid>
    </Grid>
    )
}