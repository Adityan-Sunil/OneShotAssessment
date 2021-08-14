import './App.css';
import {Card, Grid, Paper}from '@material-ui/core'
import { Typography} from '@material-ui/core';
import { BarChart, DoughnutChart } from './ChartjsHelper';

import "react-svg-map/lib/index.css";
import StudentCount from './StudentCount';
import { SkillTile } from './SkillTile';
import { GraphTile } from './GraphTile';
import { useEffect, useState } from 'react';
import { sendReq } from './helpers/sendReqs';
import { CollegeList } from './CollegeList';
import { CollegeInfo } from './CollegeInfo';



function App() {
  const [collegeGraph, getCollege] = useState([]);
  const [topColleges, getTopCls] = useState([]);
  const [skillGraph, getSkills] = useState([]);
  const [activeCollege, setActiveCols] = useState({});
  const [activeState, setActivestate] = useState();
  const [stateclgdets, getStateclgdets] = useState();

  const [pieGraph, setPieData] = useState();
  const [barGraph, setBarData] = useState();
  const [cntrPie, setCntPie] = useState();
  const [clgList, setclgList] = useState();
  const [activestateclg, setStateclg] = useState();

  useEffect(()=>{
    async function getData(){
      let result = await sendReq('hget_popular_college');
      getTopCls(result.data);
    }getData();
  },[])
  
  useEffect(() =>{
    async function getData(){
      let result = await sendReq('/get_college', {name:activestateclg});
      let count_result = await sendReq('/get_student_count', {collegeId:parseInt(result.data[0].id)});
      result.data[0].count = count_result.data[0].count;
      getStateclgdets(result.data);
    }
    if(activestateclg !== undefined)
      getData();
  },[activestateclg])

  useEffect(() =>{
    async function getData(){
      let result = await sendReq('/get_college', {state:activeState})
      setclgList(result);
    }
    if(activeState !== undefined)
      getData();
  },[activeState])

  useEffect(() =>{
    async function getData(){
      let result = await sendReq('/get_college_state')
      let labels = [];
      let datas = [];
      result.data.forEach(element =>{
        labels.push(element._id);
        datas.push(element.num);
      })
      let graphData = {
        labels:labels,
        datasets:[{
          data:datas
        }]
      }
      setCntPie(graphData);
      setActivestate(labels[0]);
    }getData()
  },[])


  useEffect(() =>{
    async function getData(){
      let result = await sendReq('/get_skill_count');
      let labels = []
      let datas = []
      result.data.forEach(element => {
        labels.push(element._id);
        datas.push(element.count_students);
      });
      let graphData = {
        labels:labels, 
        datasets:[{
          data:datas
        }]
      }
      getSkills(result.data);
      setPieData(graphData);
    }
    getData();
  },[])

  useEffect(() =>{
    async function getData(){
      let result = await sendReq('/get_batch_year',{collegeId:activeCollege.id});
      let labels = [];
      let datas = [];
      getCollege(result.data);
      result.data.forEach(element => {
        labels.push(element._id)
        datas.push(element.students)
      });
      let graphData = {
        labels:labels, 
        datasets:[{
          data:datas
        }]
      }
      setBarData(graphData);
    }
    if(activeCollege.id !== undefined)
      getData()
  },[activeCollege])

  return (
    <Paper variant="elevation" elevation={3} className="root" style={{padding:16}}>
      <Grid container spacing={4} style={{padding:16}}>
        <Grid container item spacing={4} justifyContent="space-between" xs={12}>
          <Grid item><Typography variant="h4" color="initial">College Dashboard</Typography></Grid>
        </Grid>
        <Grid container item spacing={4} xs={6}>
          <Grid container item spacing={1} xs={12}>
            <Grid container item spacing={1} xs = {12}>
              {(topColleges.length !== 0 ? <><StudentCount idx={topColleges[0]._id} name={topColleges[0].name} count={topColleges[0].students} click={(obj) => setActiveCols(obj)} />
              <StudentCount idx={topColleges[1]._id} name={topColleges[1].name} count={topColleges[1].students} click={(obj) => setActiveCols(obj)} />
              <StudentCount idx={topColleges[2]._id} name={topColleges[2].name} count={topColleges[2].students} click={(obj) => setActiveCols(obj)} />
              <StudentCount idx={topColleges[3]._id} name={topColleges[3].name} count={topColleges[3].students} click={(obj) => setActiveCols(obj)} />
            </> : "")}
              </Grid>
          </Grid>
        </Grid>
        <Grid container item spacing={4} xs={6}>
            <GraphTile title={activeCollege.name} content = {<BarChart data={barGraph}/>} xs={12}/>
        </Grid>
        {/* <Grid container item xs ={5} spacing={1}> */}
            <GraphTile title="State wise college" content = {<DoughnutChart data = {cntrPie} click={(name)=>{setActivestate(name)}}/>} xs ={7}/>
        {/* </Grid> */}
        <Grid container item xs={5} spacing={1}>
          <Card style={{height:'100%', width:'100%'}}>
            <Grid container spacing={1}>
              <Grid item xs = {6} spacing={2} style={{maxHeight:400}}><CollegeList click={setStateclg} ste = {activeState} list = {clgList}/></Grid>
              <Grid item xs = {6} spacing={1} style={{height:450}} alignContent="stretch"><CollegeInfo info={stateclgdets}/></Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid container item spacing={1}>
        <Grid container item spacing={4} xs={3}>
          <Grid container item spacing={1} xs={12}>
            {(skillGraph.length !== 0 ? <> 
              <SkillTile skill={skillGraph[0]._id} count = {skillGraph[0].count_students}/>
              <SkillTile skill={skillGraph[1]._id} count = {skillGraph[1].count_students}/>
              <SkillTile skill={skillGraph[2]._id} count = {skillGraph[2].count_students}/>
              <SkillTile skill={skillGraph[3]._id} count = {skillGraph[3].count_students}/>
            </> : "")}
          </Grid>
        </Grid>
        <Grid container item spacing={1} xs={9}>
          <GraphTile title="Students Skill" content = {<DoughnutChart data = {pieGraph}/>}/>       
        </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default App;
