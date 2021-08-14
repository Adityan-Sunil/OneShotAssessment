import {Grid, Card, CardContent, Typography} from '@material-ui/core'

export function SkillTile(props) {
    return(
        <Grid container item xs={12} justifyContent="space-between" >
            <Card style={{height:'100%', width:'100%'}}>
                <CardContent>
                    <Grid container spacing={1} justifyContent="space-between">
                        <Grid item xs={2}>
                            <Typography variant="h6" color="initial">
                                {props.skill}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h6" color="initial">
                                {props.count}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card> 
        </Grid>
    )
}