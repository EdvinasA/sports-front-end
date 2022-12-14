import React from 'react';
import './StatisticsChartDialog.scss';
import {IconButton} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip } from 'recharts';


interface StatisticsChartDialogProps {
  close: () => void;
  data: any[];
  label: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
        <div>
          <div>
            {payload[0].payload.name &&
                <p>Workout duration: {payload[0].payload.value}</p>
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
      return { value: data, name: props.label };
    })
  };

  return (
      <div className="StatisticsChartDialog">
        <IconButton onClick={props.close}><ArrowBack/></IconButton>
        <LineChart width={395} height={750} data={mapData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis/>
          <YAxis/>
          <Tooltip content={<CustomTooltip payload={mapData()} />} />
          <Line type="monotone" dataKey="value" stroke="#0095FF" />
        </LineChart>
      </div>
  );
}

export default StatisticsChartDialog;
