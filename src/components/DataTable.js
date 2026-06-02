import React, { useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FiArrowDown, FiArrowUp, FiDownload, FiEye, FiPlus, FiSearch } from 'react-icons/fi';
import styles from './DataTable.module.css';

const getValueByPath = (row, path) => {
  if (!path) {
    return undefined;
  }

  if (Object.prototype.hasOwnProperty.call(row, path)) {
    return row[path];
  }

  return String(path)
    .split('.')
    .reduce((value, key) => (value == null ? undefined : value[key]), row);
};

const normalizeCellValue = value => {
  if (value == null) {
    return '';
  }

  return value;
};

const getHeaderStyle = meta => {
  const headerStyle = meta?.headerStyle || {};

  if (!headerStyle.backgroundColor || headerStyle.color) {
    return headerStyle;
  }

  return {
    color: '#0f172a',
    ...headerStyle,
  };
};

const normalizeColumns = (columns) => {
  const usedColumnIds = new Set();

  return columns.filter(column => !column.hidden).map((column, index) => {
    const baseColumnId = column.field || column.title || `column-${index}`;
    const columnId = usedColumnIds.has(baseColumnId)
      ? `${baseColumnId}-${index}`
      : baseColumnId;

    usedColumnIds.add(columnId);

    const normalizedColumn = {
      id: columnId,
      accessorFn: row => getValueByPath(row, column.field),
      header: column.title,
      cell: info => {
        const row = info.row.original;
        return normalizeCellValue(column.render ? column.render(row) : info.getValue());
      },
      enableSorting: column.sorting !== false,
      meta: {
        field: column.field,
        cellStyle: column.cellStyle,
        editable: column.editable,
        headerStyle: column.headerStyle,
        initialEditValue: column.initialEditValue,
        lookup: column.lookup,
        minWidth: column.minWidth || column.width,
        align: column.align || column.cellStyle?.textAlign || 'center',
        render: column.render,
      },
    };

    if (typeof column.sortingFn === 'function') {
      normalizedColumn.sortingFn = column.sortingFn;
    }

    return normalizedColumn;
  });
};

const setValueByPath = (row, path, value) => {
  if (!path) {
    return row;
  }

  const keys = String(path).split('.');
  const nextRow = { ...row };
  let target = nextRow;

  keys.slice(0, -1).forEach((key) => {
    target[key] = { ...(target[key] || {}) };
    target = target[key];
  });

  target[keys[keys.length - 1]] = value;
  return nextRow;
};

const createEmptyRow = (columns) => columns.reduce((row, column) => {
  if (column.field) {
    return setValueByPath(row, column.field, column.initialEditValue ?? '');
  }

  return row;
}, {});

const getCellStyle = (meta, rowData) => {
  const cellStyle = meta?.cellStyle;

  if (typeof cellStyle === 'function') {
    return cellStyle(rowData);
  }

  return cellStyle;
};

const escapeCsvValue = (value) => {
  if (value == null) {
    return '';
  }

  const stringValue = String(value);
  if (/[",\n\r]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
};

const downloadCsv = (filename, columns, rows) => {
  const csv = [
    columns.map(column => escapeCsvValue(column.columnDef.header)).join(','),
    ...rows.map(row => columns.map((column) => {
      const { render } = column.columnDef.meta || {};
      const rawValue = render
        ? render(row.original)
        : column.columnDef.accessorFn
          ? column.columnDef.accessorFn(row.original)
          : row.getValue(column.id);

      return escapeCsvValue(normalizeCellValue(rawValue));
    }).join(',')),
  ].join('\r\n');

  const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const DataTable = ({
  columns,
  data,
  isLoading = false,
  title,
  toolbar,
  search = true,
  sorting = true,
  exportButton = false,
  columnsButton = false,
  exportFileName = 'export.csv',
  filtering = false,
  maxBodyHeight = '60vh',
  minBodyHeight,
  emptyText = 'No data available',
  onRowClick,
  getRowClassName,
  rowStyle,
  selection = false,
  selectedRows = [],
  onSelectionChange,
  editable,
  rowActions,
  initialSorting = [],
}) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sortingState, setSortingState] = useState(initialSorting);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingDraft, setEditingDraft] = useState(null);
  const tableColumns = useMemo(() => normalizeColumns(columns), [columns]);

  const table = useReactTable({
    data: data || [],
    columns: tableColumns,
    state: {
      globalFilter,
      sorting: sortingState,
      columnFilters,
      columnVisibility,
    },
    enableSorting: sorting,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSortingState,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const visibleLeafColumns = table.getVisibleLeafColumns();
  const rows = table.getRowModel().rows;

  const handleExport = () => {
    downloadCsv(exportFileName, visibleLeafColumns, rows);
  };

  const isRowSelected = (row) => selectedRows.includes(row.original);

  const updateSelection = (nextRows) => {
    if (onSelectionChange) {
      onSelectionChange(nextRows);
    }
  };

  const toggleRowSelected = (row) => {
    if (isRowSelected(row)) {
      updateSelection(selectedRows.filter(selectedRow => selectedRow !== row.original));
      return;
    }

    updateSelection([...selectedRows, row.original]);
  };

  const toggleAllRowsSelected = () => {
    if (rows.length > 0 && rows.every(isRowSelected)) {
      updateSelection(selectedRows.filter(selectedRow => !rows.some(row => row.original === selectedRow)));
      return;
    }

    const nextRows = [
      ...selectedRows,
      ...rows
        .map(row => row.original)
        .filter(rowData => !selectedRows.includes(rowData)),
    ];

    updateSelection(nextRows);
  };

  const beginEdit = (row) => {
    setEditingRowId(row.id);
    setEditingDraft(row.original);
  };

  const beginAdd = () => {
    setEditingRowId('__new__');
    setEditingDraft(createEmptyRow(columns));
  };

  const cancelEdit = () => {
    setEditingRowId(null);
    setEditingDraft(null);
  };

  const saveEdit = async (row) => {
    if (editingRowId === '__new__') {
      if (editable?.onRowAdd) {
        await editable.onRowAdd(editingDraft);
      }

      cancelEdit();
      return;
    }

    if (editable?.onRowUpdate) {
      await editable.onRowUpdate(editingDraft, row.original);
    }

    cancelEdit();
  };

  const deleteRow = async (row) => {
    if (editable?.onRowDelete) {
      const confirmed = window.confirm('Confirm delete?');

      if (!confirmed) {
        return;
      }

      await editable.onRowDelete(row.original);
    }
  };

  const renderEditControl = (column) => {
    const field = column.columnDef.meta?.field;

    if (!field || column.columnDef.meta?.editable === 'never') {
      return null;
    }

    const lookup = column.columnDef.meta?.lookup;
    const value = getValueByPath(editingDraft, field) || '';
    const updateDraft = (nextValue) => {
      setEditingDraft(currentDraft => setValueByPath(currentDraft, field, nextValue));
    };

    if (lookup) {
      return (
        <select
          className={styles.editInput}
          onChange={event => updateDraft(event.target.value)}
          value={value}
        >
          <option value="" />
          {Object.entries(lookup).map(([optionValue, label]) => (
            <option key={optionValue} value={optionValue}>
              {label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        className={styles.editInput}
        onChange={event => updateDraft(event.target.value)}
        value={value}
      />
    );
  };

  const hasActions = Boolean(editable?.onRowAdd || editable?.onRowUpdate || editable?.onRowDelete || rowActions?.length);

  return (
    <section className={styles.root}>
      <div className={styles.toolbar}>
        <div className={styles.title}>{title}</div>
        <div className={styles.actions}>
          {search && (
            <label className={styles.search}>
              <FiSearch size={18} />
              <input
                value={globalFilter}
                onChange={event => setGlobalFilter(event.target.value)}
                placeholder="Search"
              />
            </label>
          )}
          {columnsButton && (
            <details className={styles.columnMenu}>
              <summary title="Show columns">
                <FiEye size={16} />
              </summary>
              <div className={styles.columnList}>
                {table.getAllLeafColumns().map(column => (
                  <label key={column.id}>
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                    />
                    {column.columnDef.header}
                  </label>
                ))}
              </div>
            </details>
          )}
          {exportButton && (
            <button
              className={styles.iconButton}
              disabled={rows.length === 0}
              onClick={handleExport}
              title="Export CSV"
              type="button"
            >
              <FiDownload size={16} />
            </button>
          )}
          {editable?.onRowAdd && (
            <button
              className={styles.iconButton}
              onClick={beginAdd}
              title="Add row"
              type="button"
            >
              <FiPlus size={16} />
            </button>
          )}
        </div>
      </div>
      {toolbar && <div className={styles.toolbarExtra}>{toolbar}</div>}

      <div
        className={styles.tableWrap}
        style={{
          maxHeight: maxBodyHeight,
          minHeight: minBodyHeight,
        }}
      >
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <React.Fragment key={headerGroup.id}>
                <tr>
                  {selection && (
                    <th style={getHeaderStyle({})}>
                      <input
                        checked={rows.length > 0 && rows.every(isRowSelected)}
                        onChange={toggleAllRowsSelected}
                        onClick={event => event.stopPropagation()}
                        type="checkbox"
                      />
                    </th>
                  )}
                  {hasActions && <th style={getHeaderStyle({})}>Actions</th>}
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        minWidth: header.column.columnDef.meta?.minWidth,
                        ...getHeaderStyle(header.column.columnDef.meta),
                      }}
                    >
                      <span className={styles.headerCell}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === 'asc' && <FiArrowUp size={14} />}
                        {header.column.getIsSorted() === 'desc' && <FiArrowDown size={14} />}
                      </span>
                    </th>
                  ))}
                </tr>
                {filtering && (
                  <tr>
                    {selection && <th style={getHeaderStyle({})} />}
                    {hasActions && <th style={getHeaderStyle({})} />}
                    {headerGroup.headers.map(header => (
                      <th
                        key={`${header.id}-filter`}
                        style={{
                          minWidth: header.column.columnDef.meta?.minWidth,
                          ...getHeaderStyle(header.column.columnDef.meta),
                        }}
                      >
                        <input
                          className={styles.columnFilter}
                          onChange={event => header.column.setFilterValue(event.target.value)}
                          onClick={event => event.stopPropagation()}
                          placeholder={String(header.column.columnDef.header || '')}
                          value={header.column.getFilterValue() || ''}
                        />
                      </th>
                    ))}
                  </tr>
                )}
              </React.Fragment>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={visibleLeafColumns.length + (selection ? 1 : 0) + (hasActions ? 1 : 0)}>
                  <div className={styles.loading}><span className={styles.spinner} /></div>
                </td>
              </tr>
            ) : rows.length > 0 || editingRowId === '__new__' ? (
              <>
                {editingRowId === '__new__' && (
                  <tr>
                    {selection && <td />}
                    {hasActions && (
                      <td className={styles.actionCell}>
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            saveEdit({ original: null });
                          }}
                          type="button"
                        >
                          Save
                        </button>
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            cancelEdit();
                          }}
                          type="button"
                        >
                          Cancel
                        </button>
                      </td>
                    )}
                    {visibleLeafColumns.map(column => (
                      <td
                        key={`new-${column.id}`}
                        style={{
                          minWidth: column.columnDef.meta?.minWidth,
                          textAlign: column.columnDef.meta?.align,
                          ...getCellStyle(column.columnDef.meta, editingDraft),
                        }}
                      >
                        {renderEditControl(column)}
                      </td>
                    ))}
                  </tr>
                )}
                {rows.map(row => (
                <tr
                  className={[
                    onRowClick ? styles.clickableRow : '',
                    getRowClassName ? getRowClassName(row.original) : '',
                  ].filter(Boolean).join(' ')}
                  key={row.id}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                  style={typeof rowStyle === 'function' ? rowStyle(row.original) : rowStyle}
                >
                  {selection && (
                    <td>
                      <input
                        checked={isRowSelected(row)}
                        onChange={() => toggleRowSelected(row)}
                        onClick={event => event.stopPropagation()}
                        type="checkbox"
                      />
                    </td>
                  )}
                  {hasActions && (
                    <td className={styles.actionCell}>
                      {editingRowId === row.id ? (
                        <>
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              saveEdit(row);
                            }}
                            type="button"
                          >
                            Save
                          </button>
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              cancelEdit();
                            }}
                            type="button"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          {editable?.onRowUpdate && (
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                beginEdit(row);
                              }}
                              type="button"
                            >
                              Edit
                            </button>
                          )}
                          {editable?.onRowDelete && (
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                deleteRow(row);
                              }}
                              type="button"
                            >
                              Delete
                            </button>
                          )}
                          {rowActions?.map(action => (
                            <button
                              key={action.label}
                              onClick={(event) => {
                                event.stopPropagation();
                                action.onClick(row.original);
                              }}
                              type="button"
                            >
                              {action.label}
                            </button>
                          ))}
                        </>
                      )}
                    </td>
                  )}
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      style={{
                        minWidth: cell.column.columnDef.meta?.minWidth,
                        textAlign: cell.column.columnDef.meta?.align,
                        ...getCellStyle(cell.column.columnDef.meta, row.original),
                      }}
                    >
                      {editingRowId === row.id && cell.column.columnDef.meta?.field ? (
                        renderEditControl(cell.column)
                      ) : flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={visibleLeafColumns.length + (selection ? 1 : 0) + (hasActions ? 1 : 0)} className={styles.empty}>{emptyText}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DataTable;
