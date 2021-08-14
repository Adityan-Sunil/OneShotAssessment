import { useRef } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
const d3 = window.d3;

function genColors(len){
    let arr = [];
    for(let i=0 ; i < len; i++){
        arr.push(d3.interpolateViridis(parseFloat(i)/len));
    }
    return arr;
}
export function DoughnutChart(props){

    const ref = useRef();
    if(props.data === undefined)
    return(<></>);
    let data = props.data;
    let len = data.labels.length;
    data.datasets[0].backgroundColor = genColors(len);
    // console.log(data);
    const options = {
        maintainAspectRatio:false,
        interaction:{
            mode: 'point'
        },
        plugins:{
            legend:{
                position:'left'
            }
        }
    }
    options.onClick = function(event, element){
        console.log(element);
        let idx = element[0].index;
        console.log(idx);
        let key = ref.current.data.labels[idx];
        props.click(key);
        
    }
    return(
        <Doughnut style={{minHeight:300}} ref = {ref} data = {data} options = {options}/>
    )
}

export function BarChart(props){
    const ref = useRef();
    if(props.data === undefined)
        return(<></>);
    let data = props.data;
    data.datasets[0].backgroundColor = genColors(data.labels.length);
    data.datasets[0].label = "Students per Batch"
    const options = {
        maintainAspectRatio:false,
        interaction:{
            mode: 'point'
        },
    }
    options.onClick = function(event, element){
        console.log(element);
        let idx = element[0].index;
        console.log(idx);
        console.log(ref.current.data.labels[idx]);
        console.log(ref.current.data);
    }
    return(
        <Bar ref={ref} data = {data} options={options}/>
    )
}
