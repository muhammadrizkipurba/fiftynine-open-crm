
import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';

interface ColumnFilter {
  id: string
  value: unknown
};

export type ColumnFiltersState = ColumnFilter[];

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  initialColumnFilterState?: ColumnFiltersState;
}

function ReusableTable<TData extends object>({ data, columns, initialColumnFilterState }: TableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: columns as ColumnDef<TData | any>[],
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnFilters: initialColumnFilterState
    },
  });

  return (
    <table className='w-full shadow-sm my-5 rounded-xl overflow-hidden'>
      <thead className=''>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} className='text-center'>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              )
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className='text-sm font-semibold' style={{width: cell.column.getSize()}}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReusableTable;