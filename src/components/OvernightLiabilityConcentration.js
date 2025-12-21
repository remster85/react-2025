import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

export default function OvernightTermRatioChart({
  overnight = 30,
  term = 70,
  limit = 92.5,
  width = 260,
  height = 200,
  title = 'Overnight Liability Concentration',
}) {
  // Color definitions
  const item1_color = '#2196F3'; // Blue for overnight
  const item2_color = '#FF9800'; // Orange for term
  const ratio_over_limit_color = '#f44336'; // Red for exceeding limit
  const ratio_under_limit_color = '#333'; // Dark gray for under limit
  const label_color = '#666'; // Gray for labels
  
    // Label definitions
  const item1_label = 'Overnight';
  const item2_label = 'Term';
  
  const total = overnight + term;
  const ratio = total > 0 ? (overnight / total) * 100 : 0;
  
  // Check if ratio exceeds limit
  const exceedsLimit = ratio > limit;

  const data = [
    { name: item1_label, value: overnight },
    { name: item2_label, value: term }
  ];

  const COLORS = [item1_color, item2_color];

  const cx = Math.round(width / 2);
  const cy = Math.round(height / 2) + 10; // Shift down slightly to account for title spacing
  const innerRadius = Math.round(Math.min(width, height) * 0.28);
  const outerRadius = Math.round(Math.min(width, height) * 0.40);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}>
      <style>{`
        .recharts-pie-sector, .recharts-layer, .recharts-surface, .recharts-text {
          cursor: default !important;
        }
        * {
          cursor: default !important;
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
        }
      `}</style>
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}>
        {/* Title positioned above the chart */}
        <div style={{ position: 'absolute', top: 4, left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
          <div style={{ fontSize: 12, fontWeight: 700 }}>{title}</div>
          <div style={{ fontSize: 11, color: label_color, marginBottom: 12 }}>Limit {limit}%</div>
        </div>

        <div style={{ marginTop: 20, cursor: 'default' }}>
          <PieChart width={width} height={height} style={{ cursor: 'default' }}>
            <Pie
              data={data}
              cx={cx}
              cy={cy}
              startAngle={90}
              endAngle={450}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              dataKey="value"
              stroke="none"
              isAnimationActive={false}
              label={({ name, cx, cy, midAngle, outerRadius }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 25;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                // Add extra padding for Overnight label (on the left)
                const adjustedX = x < cx ? x + 10 : x;
                return (
                  <text 
                    x={adjustedX} 
                    y={y} 
                    fill={label_color} 
                    textAnchor={adjustedX > cx ? 'start' : 'end'} 
                    dominantBaseline="central"
                    fontSize={11}
                    style={{ pointerEvents: 'none', cursor: 'default', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
                  >
                    {name}
                  </text>
                );
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} style={{ outline: 'none' }} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Center content: ratio percentage only */}
        <div style={{ 
          position: 'absolute', 
          left: 0, 
          right: 0, 
          top: '50%', 
          marginTop: 20,
          marginLeft: 5,
          textAlign: 'center', 
          transform: 'translateY(-50%)', 
          pointerEvents: 'none' 
        }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: exceedsLimit ? ratio_over_limit_color : ratio_under_limit_color, userSelect: 'none' }}>
            {ratio.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}