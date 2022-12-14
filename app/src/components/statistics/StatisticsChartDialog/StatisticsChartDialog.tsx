import React from 'react';
import './StatisticsChartDialog.scss';
import {IconButton} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer} from 'recharts';


interface StatisticsChartDialogProps {
  close: () => void;
  data: any[];
  label: string;
  YAxis: string;
}

const CustomTooltip = ({active, payload}: any) => {
  if (active && payload && payload.length) {
    return (
        <div>
          <div>
            {payload[0].payload.name &&
                <p>{payload[0].payload.name}: {payload[0].payload.value}</p>
            }
          </div>
        </div>
    );
  }

  return null;
};

const StatisticsChartDialog = (props: StatisticsChartDialogProps) => {

  const mapData = () => {
    return props.data.map(data => {
      return {value: data, name: props.label};
    })
  };

  return (
      <div className="StatisticsChartDialog">
        <IconButton onClick={props.close}><ArrowBack/></IconButton>
        <div className="chart-wrapper">
          <ResponsiveContainer>
            <LineChart data={mapData()} margin={{
              top: 0,
              right: 0,
              left: 15,
              bottom: 15
            }}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis/>
              <YAxis>
                <Label
                    value={props.YAxis}
                    angle={-90}
                    position="left"
                />
              </YAxis>
              <Tooltip content={<CustomTooltip payload={mapData()}/>}/>
              <Line type="monotone" dataKey="value" stroke="#0095FF"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
  );
}

export default StatisticsChartDialog;
