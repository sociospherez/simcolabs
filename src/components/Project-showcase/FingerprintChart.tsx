
import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { ComponentStat } from '../types';

interface FingerprintChartProps {
  data: ComponentStat[];
}

const FingerprintChart: React.FC<FingerprintChartProps> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis 
            dataKey="category" 
            tick={{ fill: '#64748b', fontSize: 12 }} 
          />
          <Radar
            name="Weight"
            dataKey="weight"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.5}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FingerprintChart;
