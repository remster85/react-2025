import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

export default function GrossNotionalLimitRecharts({
  value = 10,
  width = 260,
  height = 200,
  title = 'Gross Notional Limit',
  subtitle = 'Limit 135B',
}) {
  // clamp value to [0,100]
  const v = Math.max(0, Math.min(100, Number(value) || 0));

  const data = [
    { name: 'value', value: v },
    { name: 'remaining', value: Math.max(0, 100 - v) }
  ];

  const COLORS = ['#4CAF50', '#E0E0E0'];

  const cx = Math.round(width / 2);
  // nudge cy a bit lower so the semicircle visually sits at the same level
  // as the AG Charts radial gauge used in the sibling component
  const cy = Math.round(height * 0.58);
  // reduce radii so the Recharts semicircle matches the visual scale of the AG Gauge
  const innerRadius = Math.round(Math.min(width, height) * 0.28);
  const outerRadius = Math.round(Math.min(width, height) * 0.40);

  return (
    // Parent container should fill the bordered box from BalanceSheet and center contents
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Title / subtitle positioned above the chart, centered */}
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

        {/* Percentage text placed centered vertically near the lower-middle of the chart */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: '62%', 
          textAlign: 'center', transform: 'translateY(-50%)', fontWeight: 700,  }}  tabIndex={-1} userSelect="none" cursor="default">
          <span style={{ fontSize: 14, color: '#333', userSelect: 'none' }}>{v.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}