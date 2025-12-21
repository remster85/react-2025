import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function GrossNotionalLimitRecharts({
  value = 88,
  width = 260,
  height = 200,
  title = 'Gross Notional Limit',
  subtitle = 'Limit 135B',
  grossAssets = 66000000,
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

  // Color constants
  const percentageOverLimitColor = '#000'; // Black for over 100%
  const percentageUnderLimitColor = '#333'; // Dark gray for under 100%
  const subtitleColor = '#666'; // Gray for subtitle
  const remainingColor = '#E0E0E0'; // Light gray for remaining portion
  const blinkColor = '#FFFFFF'; // White for blinking effect

  // Style constants
  const containerStyle = { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' };
  const innerContainerStyle = { position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' };
  const titleContainerStyle = { position: 'absolute', top: 8, left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' };
  const titleStyle = { fontSize: 12, fontWeight: 700 };
  const subtitleStyle = { fontSize: 11, color: subtitleColor };
  const percentageContainerStyle = { position: 'absolute', left: 0, right: 0, top: '58%', marginLeft: 5, textAlign: 'center', transform: 'translateY(-50%)', fontWeight: 700 };
  const percentageTextStyle = { fontSize: 20, userSelect: 'none' };
  const percentageStyle = { ...percentageTextStyle, color: v > 100 ? percentageOverLimitColor : percentageUnderLimitColor };

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

  const fillColor = v > 100 && isBlinking ? blinkColor : getColor(v);
  const COLORS = [fillColor, remainingColor];

  const cx = Math.round(width / 2);
  const cy = Math.round(height * 0.58);
  const innerRadius = Math.round(Math.min(width, height) * 0.28);
  const outerRadius = Math.round(Math.min(width, height) * 0.40);

  // Custom tooltip
  const CustomTooltip = ({ active }) => {
    if (active) {
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '8px 12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div>Gross Assets: {grossAssets.toLocaleString()}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <div style={titleContainerStyle}>
          <div style={titleStyle}>{title}</div>
          <div style={subtitleStyle}>{subtitle}</div>
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
          <Tooltip content={<CustomTooltip />} />
        </PieChart>

        <div style={percentageContainerStyle} tabIndex={-1}>
          <span style={percentageStyle}>
            {v.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
