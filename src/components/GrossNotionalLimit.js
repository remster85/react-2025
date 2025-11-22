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
	// new props to control the needle
	needleEnabled = true,
	needleProps = {},
}) {
	const options = useMemo(() => {
	// Define color stops for the gauge
	const colorStops = [
		{ offset: 0, color: '#22c55e' },    // green at 0%
		{ offset: 0.5, color: '#eab308' },  // yellow at 50%
		{ offset: 1, color: '#ef4444' }     // red at 100%
	];

	// Calculate color based on value percentage
	const percentage = (value - min) / (max - min);
	let labelColor;
	
	if (percentage <= 0.5) {
		// Interpolate between green and yellow
		const localPercent = percentage / 0.5;
		labelColor = percentage <= 0.33 ? '#22c55e' : '#eab308';
	} else {
		// Interpolate between yellow and red
		labelColor = percentage <= 0.75 ? '#eab308' : '#ef4444';
	}

	return {
		type: 'radial-gauge',
		title: { text: title, fontSize: 14 },
		subtitle: subtitle ? { text: subtitle, fontSize: 12 } : undefined,
		value,
		scale: {
		min,
		max,
		label: { enabled: false },
		},
		needle: { enabled: needleEnabled, ...needleProps },
		bar: { 
		enabled: true,
		fills: colorStops.map(stop => stop.color),
		fillOpacity: 1
		},
		innerRadiusRatio: 0.6,
		startAngle: -120,
		endAngle: 120,
		label: { 
		enabled: true,
		fontSize: 24,
		color: labelColor,
  			formatter: ({ value }) => `${value.toFixed(2)}%`
		},
	};
	}, [value, min, max, title, subtitle, needleEnabled, needleProps]);

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