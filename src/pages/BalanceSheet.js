import React, { useState } from 'react';
import GrossNotionalLimit from '../components/GrossNotionalLimit';
import GrossNotionalLimitRecharts from '../components/GrossNotionalLimitReCharts';
import HighYieldTotalGrossAssets from '../components/HighYieldTotalGrossAssets';
import GrossBalanceSheet from '../components/GrossBalanceSheet';
import OvernightLiabilityConcentration from '../components/OvernightLiabilityConcentration';  
export default function BalanceSheet() {
  const [value, setValue] = useState(30.22);

  return (
    <div>
      {/* Two gauges side-by-side with matching size and thin grey borders */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', width: '100%' }}>
        <div title="Updated as 2024-11-22 10:30 AM" style={{ width: 280, height: 250, boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: 6, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GrossNotionalLimit
            value={80}
            min={0}
            max={100}
            title="Gross Notional Limit"
            limit={135000000}
            width={260}
            height={200}
            style={{ border: 'none', padding: 0, background: 'transparent' }}
            updatedAt={new Date()}
          />
        </div>

        <div style={{ width: 280, height: 250, boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: 6, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GrossNotionalLimit
            value={99.69}
            min={0}
            max={100}
            title="Gross Notional Limit"
            limit={135000000000}
            width={240}
            height={200}
            needleEnabled={false}
            style={{ border: 'none', padding: 0, background: 'transparent' }}
            updatedAt={new Date()}
          />
        </div>

          <div style={{ width: 260, height: 250, boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: 6, padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'transparent',   userSelect: 'none'}}  tabIndex={-1}>
            <HighYieldTotalGrossAssets value={6450987111} />
          </div>

        <div style={{ width: 260, height: 250, boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: 6, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GrossNotionalLimitRecharts />
        </div>

        
        <div style={{ width: 260, height: 250, boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: 6, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <OvernightLiabilityConcentration />
        </div>

      </div>

      <div style={{ marginTop: 20 }}>
        <GrossBalanceSheet rowCount={80} />
      </div>

    </div>
  );
}