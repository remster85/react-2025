import React, { useState } from 'react';
import GrossNotionalLimit from '../components/GrossNotionalLimit';
import GrossNotionalLimitRecharts from '../components/GrossNotionalLimitReCharts';
import HighYieldTotalGrossAssets from '../components/HighYieldTotalGrossAssets';
import GrossBalanceSheet from '../components/GrossBalanceSheet';

export default function BalanceSheet() {
  const [value, setValue] = useState(30.22);

  return (
    <div>
      {/* Two gauges side-by-side with matching size and thin grey borders */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', width: '100%' }}>
        <div style={{ width: 280, height: 250, boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: 6, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GrossNotionalLimit
            value={80}
            min={0}
            max={100}
            title="Gross Notional Limit"
            subtitle="Limit 135B"
            width={260}
            height={200}
            style={{ border: 'none', padding: 0, background: 'transparent' }}
          />
        </div>

        <div style={{ width: 280, height: 250, boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: 6, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GrossNotionalLimit
            value={99.69}
            min={0}
            max={100}
            title="Gross Notional Limit"
            subtitle="Limit 135B"
            width={240}
            height={200}
            needleEnabled={false}
            style={{ border: 'none', padding: 0, background: 'transparent' }}
          />
        </div>

          {/* High Yield Total Gross Assets box */}
          <div style={{ width: 260, height: 250, boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: 6, padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
            <HighYieldTotalGrossAssets value={6450987111} />
          </div>

        <div style={{ width: 260, height: 250, boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: 6, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GrossNotionalLimitRecharts />
        </div>
      </div>
      {/* second row: Gross Balance Sheet grid */}
      <div style={{ marginTop: 20 }}>
        <GrossBalanceSheet rowCount={80} />
      </div>

    </div>
  );
}