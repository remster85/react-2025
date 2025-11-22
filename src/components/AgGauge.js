import React from 'react';

// AgGauge stub: the app now uses AG Charts. This file remains for compatibility
// but renders a no-op and logs a hint to use AG Charts. The BalanceSheet page
// has been replaced to use ag-charts-react.
export default function AgGauge() {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.warn('AgGauge is deprecated: use AG Charts (ag-charts-react) instead.');
  }, []);
  return null;
}
