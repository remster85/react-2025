import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

export default function GrossNotionalLimitRecharts({
  value = 88,
  width = 260,
  height = 200,
  title = 'Gross Notional Limit',
  subtitle = 'Limit 135B',
}) {
  // clamp value to [0,120] to allow for "over 100%" display
  const v = Math.max(0, Math.min(120, Number(value) || 0));
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (v > 110) {
      const interval = setInterval(() => {
        setIsBlinking(prev => !prev);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setIsBlinking(false);
    }
  }, [v]);

  // Calculate color based on value
  const getColor = (val) => {
    if (val > 100) {
      // Above 100%: black
      return '#000000';
    } else if (val > 90) {
      // 90-100%: aggressive gradient from orange to red
      const ratio = (val - 90) / 10;
      const red = 255;
      const green = Math.round(165 * (1 - ratio)); // 165 is orange, fades to 0 for red
      return `rgb(${red}, ${green}, 0)`;
    } else {
      // 0-90%: gentle gradient from green to yellow to orange
      // 0-45%: green to yellow
      // 45-90%: yellow to orange
      if (val <= 45) {
        const ratio = val / 45;
        const red = Math.round(255 * ratio);
        const green = 255;
        return `rgb(${red}, ${green}, 0)`;
      } else {
        const ratio = (val - 45) / 45;
        const red = 255;
        const green = Math.round(255 - 90 * ratio); // 255 to 165 (yellow to orange)
        return `rgb(${red}, ${green}, 0)`;
      }
    }
  };

  const data = [
    { name: 'value', value: Math.min(v, 100) },
    { name: 'remaining', value: Math.max(0, 100 - v) }
  ];

  const fillColor = v > 100 && isBlinking ? '#FFFFFF' : getColor(v);
  const COLORS = [fillColor, '#E0E0E0'];

  const cx = Math.round(width / 2);
  const cy = Math.round(height * 0.58);
  const innerRadius = Math.round(Math.min(width, height) * 0.28);
  const outerRadius = Math.round(Math.min(width, height) * 0.40);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 8, left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
          <div style={{ fontSize: 12, fontWeight: 700 }}>{title}</div>
          <div style={{ fontSize: 11, color: '#666' }}>{subtitle}</div>
        </div>

        <PieChart width={width} height={height}>
          <Pie
            data={data}
            cx={cx}
            cy={cy}
            startAngle={210}
            endAngle={-30}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>

        <div style={{ position: 'absolute', left: 0, right: 0, top: '62%', 
          textAlign: 'center', transform: 'translateY(-50%)', fontWeight: 700 }} tabIndex={-1}>
          <span style={{ fontSize: 14, color: v > 100 ? '#000' : '#333', userSelect: 'none' }}>
            {v.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}