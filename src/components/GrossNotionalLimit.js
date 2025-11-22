import React, { useMemo } from 'react';
import { AgGauge } from 'ag-charts-react';

export default function GrossNotionalLimit({
	value = 0,
	min = 0,
	max = 100,
	title = 'Gross Notional Limit',
	limit = 0,
	width = 260,
	height = 200,
	style = {},
	// new props to control the needle
	needleEnabled = true,
	needleProps = {},
	// new prop for tooltip
	updatedAt = null, // e.g., "2024-11-22 10:30 AM" or Date object
	showTooltip = true,
}) {

	function formatHumanNumber(n) {
		if (n == null || Number.isNaN(Number(n))) return String(n);
		const num = Number(n);
		const abs = Math.abs(num);
		const units = [
			{ value: 1e12, symbol: 'T' },
			{ value: 1e9, symbol: 'B' },
			{ value: 1e6, symbol: 'M' },
			{ value: 1e3, symbol: 'K' },
		];
		for (const u of units) {
			if (abs >= u.value) {
				const v = num / u.value;
				// choose decimals: no decimals for >=100, 1 decimal for >=10, else 2
				const decimals = Math.abs(v) >= 100 ? 0 : Math.abs(v) >= 10 ? 1 : 2;
				return `${v.toFixed(decimals)}${u.symbol}`;
			}
		}
		return num.toLocaleString();
	}

	// allow subtitle to be a number (or a string containing a number) and format it smartly
	const subtitleText = useMemo(() => {
		if (limit == null) return '';
		if (typeof limit === 'number') return `Limit ${formatHumanNumber(limit)}`;
		// if subtitle is a string, try to find a number inside and format it
		if (typeof limit === 'string') {
			const m = limit.match(/(-?\d[\d,\.]*)/);
			if (m) {
				const raw = m[1].replace(/,/g, '');
				const n = Number(raw);
				if (!Number.isNaN(n)) {
					return limit.replace(m[1], formatHumanNumber(n));
				}
			}
			return limit;
		}
		return String(limit);
	}, [limit]);
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
		subtitle: subtitleText ? { text: subtitleText, fontSize: 12 } : undefined,
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
	}, [value, min, max, title, subtitleText, needleEnabled, needleProps]);

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

	const tooltipText = useMemo(() => {
		if (!updatedAt) return '';
		
		if (updatedAt instanceof Date) {
			return `Updated as ${updatedAt.toLocaleString('en-US', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit'
			})}`;
		}
		
		return `Updated as ${updatedAt}`;
	}, [updatedAt]);

	return (
		<div title={tooltipText || undefined} style={wrapperStyle}>
			<AgGauge options={options} style={{ width: '100%', height: '100%' }} />
		</div>
	);
}