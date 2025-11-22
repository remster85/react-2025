import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// Register AG Grid community modules (required by newer AG Grid versions)
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeData(count = 50) {
  const level1 = ['Cleared', 'Non Cleared'];
  const level2 = ['Brokers', 'Sponsored', 'Not sponsored'];
  const category = ['Brokers', 'Banks', 'Hedge Funds', 'Unclassified'];
  const counterparties = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Omicron'];

  const rows = [];
  for (let i = 0; i < count; i++) {
    const Asset_t1 = randInt(1_000_000, 5_000_000_000);
    const Liabilities_t1 = randInt(0, Asset_t1);
    const Asset_t0 = randInt(1_000_000, 5_000_000_000);
    const Liabilities_t0 = randInt(0, Asset_t0);

    rows.push({
      Level1: level1[randInt(0, level1.length - 1)],
      Level2: level2[randInt(0, level2.length - 1)],
      Category: category[randInt(0, category.length - 1)],
      Counterparty: counterparties[randInt(0, counterparties.length - 1)] + ' ' + (i + 1),
      Asset_t1,
      Liabilities_t1,
      Balance_t1: Asset_t1 - Liabilities_t1,
      Asset_t0,
      Liabilities_t0,
      Balance_t0: Asset_t0 - Liabilities_t0,
    });
  }
  return rows;
}

export default function GrossBalanceSheet({ rowCount = 60 }) {
  const rowData = useMemo(() => makeData(rowCount), [rowCount]);

  // compute grand totals for pinned bottom row
  const pinnedBottomRowData = useMemo(() => {
    const totals = rowData.reduce(
      (acc, r) => {
        acc.Asset_t1 += r.Asset_t1 || 0;
        acc.Liabilities_t1 += r.Liabilities_t1 || 0;
        acc.Balance_t1 += r.Balance_t1 || 0;
        acc.Asset_t0 += r.Asset_t0 || 0;
        acc.Liabilities_t0 += r.Liabilities_t0 || 0;
        acc.Balance_t0 += r.Balance_t0 || 0;
        return acc;
      },
      { Asset_t1: 0, Liabilities_t1: 0, Balance_t1: 0, Asset_t0: 0, Liabilities_t0: 0, Balance_t0: 0 }
    );

    return [
      {
        Counterparty: 'Grand Total',
        ...totals,
      },
    ];
  }, [rowData]);

  const numberFormatter = (params) => {
    if (params.value == null) return '';
    return params.value.toLocaleString();
  };

  const columnDefs = useMemo(() => [
  // hide the source group columns so the auto group column is shown
  { field: 'Level1', rowGroup: true, hide: false },
  { field: 'Level2', rowGroup: true, hide: false },
  { field: 'Category', rowGroup: true, hide: false },
    { field: 'Counterparty', minWidth: 140, width: 200 },
    {
      headerName: 't-1',
      headerClass: 'centered-header',
      children: [
        { field: 'Asset_t1', headerName: 'Asset', headerClass: 'centered-header', aggFunc: 'sum', valueFormatter: numberFormatter, type: 'numericColumn', width: 140 },
        { field: 'Liabilities_t1', headerName: 'Liabilities', headerClass: 'centered-header', aggFunc: 'sum', valueFormatter: numberFormatter, type: 'numericColumn', width: 140 },
        { field: 'Balance_t1', headerName: 'Balance', headerClass: 'centered-header', aggFunc: 'sum', valueFormatter: numberFormatter, type: 'numericColumn', width: 140 },
      ]
    },
    {
      headerName: 't0',
      headerClass: 'centered-header',
      children: [
        { field: 'Asset_t0', headerName: 'Asset', headerClass: 'centered-header', aggFunc: 'sum', valueFormatter: numberFormatter, type: 'numericColumn', width: 140 },
        { field: 'Liabilities_t0', headerName: 'Liabilities', headerClass: 'centered-header', aggFunc: 'sum', valueFormatter: numberFormatter, type: 'numericColumn', width: 140 },
        { field: 'Balance_t0', headerName: 'Balance', headerClass: 'centered-header', aggFunc: 'sum', valueFormatter: numberFormatter, type: 'numericColumn', width: 140 },
      ]
    }
  ], []);

  const defaultColDef = useMemo(() => ({
    // prefer explicit widths on numeric and counterparty columns for compact layout
    flex: 1,
    minWidth: 80,
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  const autoGroupColumnDef = useMemo(() => ({
    headerName: 'Grouping',
    minWidth: 220,
    cellRendererParams: { suppressCount: false },
  }), []);

  return (
    <div style={{ width: '100%' }}>
      {/* container wraps title and grid so the border includes the title */}
        <div style={{ border: '1px solid #ddd', borderRadius: 6, padding: 8, boxSizing: 'border-box' }}>
        <h3 style={{ margin: '8px 0' }}>Gross Balance Sheet</h3>
        {/* inline CSS to center header labels, style the pinned total row, add column-group border and zebra row backgrounds */}
        <style>{`
          /* center header labels: apply broadly so group headers (t-1, t0) and child headers are centered */
          .centered-header .ag-header-cell-label{display:flex;justify-content:center;align-items:center}
          .centered-header .ag-header-group-cell-label{display:flex;justify-content:center;align-items:center}
          .ag-theme-alpine .ag-header-group-cell-label, .ag-theme-alpine .ag-header-cell-label { display:flex; justify-content:center; align-items:center; text-align:center; }
          /* emphasize the pinned bottom grand total */
          .ag-theme-alpine .ag-pinned-bottom-row {
            font-weight: 700;
            background: rgba(0,0,0,0.02);
          }

          /* zebra striping for data rows (odd white, even light gray) */
          .ag-theme-alpine .ag-center-cols-container .ag-row:nth-child(odd) .ag-cell {
            background: #ffffff;
          }
          .ag-theme-alpine .ag-center-cols-container .ag-row:nth-child(even) .ag-cell {
            background: #f1ebebff;
          }

          /* ensure grouping and pinned rows keep readable backgrounds */
          .ag-theme-alpine .ag-row-group, .ag-theme-alpine .ag-pinned-top-row, .ag-theme-alpine .ag-pinned-bottom-row {
            background: inherit;
          }

          /* border between t-1 and t0: add left border to the first t0 column cells and headers */
          /* border between group/Counterparty block and t-1: add left border to the first t-1 column cells and headers */
          .ag-theme-alpine .ag-cell[col-id="Asset_t1"],
          .ag-theme-alpine .ag-header-cell[col-id="Asset_t1"] {
            border-left: 1px solid #e0e0e0 !important;
            padding-left: 10px;
          }

          /* border between t-1 and t0: add left border to the first t0 column cells and headers */
          .ag-theme-alpine .ag-cell[col-id="Asset_t0"],
          .ag-theme-alpine .ag-header-cell[col-id="Asset_t0"] {
            border-left: 1px solid #e0e0e0 !important;
            padding-left: 10px;
          }

          /* small visual tweak: separate header group row from data */
          .ag-theme-alpine .ag-header {
            border-bottom: 1px solid #e8e8e8;
          }
        `}</style>
            <div className="ag-theme-alpine" style={{ height: 420, width: '100%' }}>
                <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                autoGroupColumnDef={autoGroupColumnDef}
                groupDisplayType={'singleColumn'}
                // show only Level1 groups initially (collapsed). Users can drill down to Level2 then Category.
                groupDefaultExpanded={0}
                // show side bar (columns/filters) so user can play with the grid
                // use explicit config and open the Columns panel by default
                sideBar={{ toolPanels: ['columns', 'filters'], defaultToolPanel: 'columns' }}
                animateRows={true}
                rowSelection={'single'}
                // compact appearance
                rowHeight={28}
                headerHeight={32}
                // show grand total as a pinned bottom row
                pinnedBottomRowData={pinnedBottomRowData}
                />
            </div>
        </div>
    </div>
  );
}
