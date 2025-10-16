import React from "react";
import "./Monitoring.css"
import TimeAreaChart from "../../../components/TimeChart/TimeChart";
import { ChartPoint } from "../../../entities/chart-point";
import Card from "../../../components/Card/Card";

const Monitoring : React.FC = () => {

    const getDate = (hour: number, minute: number) => {
        let date = new Date();
        date.setHours(hour, minute, 0, 0);
        return date;
    }

    const datapoints: ChartPoint[] = [
        {value:1, time: getDate(10,20).toISOString()},
        {value:2, time: getDate(10,25).toISOString()},
        {value:3, time: getDate(10,30).toISOString()},
        {value:4, time: getDate(10,35).toISOString()},
        {value:2, time: getDate(10,40).toISOString()},
        {value:6, time: getDate(10,45).toISOString()},
        {value:3, time: getDate(10,50).toISOString()},
    ];

    return (
        <div className="monitoring-container-content">
            <h2>Total Stored Records: 30000 record(s)</h2>

            <div className="chart-container">
                <Card title="Login Traffic" content={
                <TimeAreaChart data={datapoints} xName="Time" yName="Call"/>
            }/>
            
            <Card title="Failed Login Call Rate" content={
                <TimeAreaChart data={datapoints} xName="Time" yName="Call"/>
            }/>

            <Card title="Sign Up Traffic" content={
                <TimeAreaChart data={datapoints} xName="Time" yName="Call"/>
            }/>

            <Card title="Token Call Rate" content={
                <TimeAreaChart data={datapoints} xName="Time" yName="Call"/>
            }/>

            <Card title="Invalid Token Call Rate" content={
                <TimeAreaChart data={datapoints} xName="Time" yName="Call"/>
            }/>
            </div>
        </div>
    );
}

export default Monitoring;