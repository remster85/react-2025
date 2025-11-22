import React from 'react';

export default function HighYieldTotalGrossAssets({ value = 6450987111 }) {
  return (
    <>
      <div style={{ fontSize: 14, fontWeight: 600, textAlign: 'center', marginBottom: 8 }}>High Yield Total Gross Assets</div>
      <div style={{ fontSize: 20, fontWeight: 600, textAlign: 'center' }}>
        {"$  " + Intl.NumberFormat('de-DE').format(value)}
      </div>
    </>
  );
}
