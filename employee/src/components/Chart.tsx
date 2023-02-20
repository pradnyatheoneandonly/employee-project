import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import axios from 'axios';

interface chart{
    year:string,
    count:number
}

const Chart = () => {
    const [chartData,setData]=useState<
    Array<{
        key: string,
        value: number
    }>
>([]);
    const FetchChartData = async ()=>{
        const response =  await axios.get('http://localhost:8000/chart').then((data)=>{
           setData(data.data.resultArr)
        })
    }
    useEffect(()=>{
         FetchChartData();
    },[])
    
    const userData:any =(localStorage.getItem("user"));
    const user = JSON.parse(userData);
  const config = {
    data:chartData,
    xField: 'year',
    yField: 'count',
    label: {
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      year: {
        alias: 'year',
      },
      count: {
        alias: 'count',
      },
    },
  };
  return (<Column {...config}/>)
}
export default Chart;

