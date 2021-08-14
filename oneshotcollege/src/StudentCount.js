import {Grid, Card, CardContent, Typography, CardActionArea}from '@material-ui/core'

export default function StudentCount(props){
    return(
        <Grid item xs={6}>
            <Card variant="outlined"> 
                <CardActionArea onClick={() =>{props.click({id:props.idx, name:props.name})}}>
                    <CardContent>
                    <Typography variant="h5" color="initial" gutterBottom>{props.name}</Typography>
                    <Grid container item xs={12} spacing={1} justifyContent="space-between">
                        <Grid item>
                        <Typography variant="h6">
                            Students
                        </Typography>
                        </Grid>
                        <Grid item>
                        <Typography variant="h4" color="initial">{props.count}</Typography>
                        </Grid>
                    </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}