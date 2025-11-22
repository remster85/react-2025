import React, { useMemo } from 'react';
import { AgGauge } from 'ag-charts-react';

export default function GrossNotionalLimit({
	value = 0,
	min = 0,
	max = 100,
	title = 'Gross Notional Limit',
	subtitle = '',
	width = 260,
	height = 200,
	style = {},
}) {
	const options = useMemo(() => ({
		type: 'radial-gauge',
		title: { text: title, fontSize: 14 },
		subtitle: subtitle ? { text: subtitle, fontSize: 12 } : undefined,
		value,
		scale: {
			min,
			max,
			label: { enabled: false },
		},
		needle: { enabled: true },
		bar: { enabled: true },
		innerRadiusRatio: 0.6,
		startAngle: -120,
		endAngle: 120,
		label: { enabled: false },
	}), [value, min, max, title, subtitle]);

	const wrapperStyle = {
		width,
		height,
		boxSizing: 'border-box',
		border: '1px solid #ddd',
		borderRadius: 6,
		padding: 8,
		background: 'rgba(255,255,255,0.02)',
		...style,
	};

	return (
		<div style={wrapperStyle}>
			<AgGauge options={options} style={{ width: '100%', height: '100%' }} />
		</div>
	);
}

