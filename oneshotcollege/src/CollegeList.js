import { Card, CardActionArea, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";

function ListItem(props){
    return(
        <Grid item xs={12}>
            <Card>
                <CardActionArea onClick={() =>{props.click(props.text)}}>
                    <CardContent>
                        <Typography>{props.text}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}
export function CollegeList(props){
    let list = []
    console.log(props.list);
    if(props.list !== undefined)
        props.list.data.forEach(element => {
            list.push(<ListItem text = {element.name} click={props.click}/>)
        });
    return(
        <Card>
            <CardHeader title={props.ste}/>
            <CardContent style={{overflowY:'scroll', maxHeight:450}}>
                {list}
            </CardContent>
        </Card>
    )
}