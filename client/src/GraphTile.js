import {Grid, Card, CardContent, CardHeader}from '@material-ui/core'

export function GraphTile(props){
    return(
        <Grid item  xs={ (props.xs !== undefined ? props.xs : 6)}>
            <Card>
              <CardHeader title={props.title}/>
              <CardContent>
                {props.content}
              </CardContent>
            </Card>
        </Grid>  
    )
}