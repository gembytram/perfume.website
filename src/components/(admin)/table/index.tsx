"use client";

// import libs
import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  RowSelectionState,
  Table,
  ColumnDef,
  FilterFn,
  Row,
  FilterMeta,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";

// import components
import {
  Table as TableWrap,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTableHeader from "./table-header";
import DataTablePagination from "./table-pagination";

interface IAdminTable<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  deleteUrl: string;
  filterList?: string[];
}

function AdminTable<TData, TValue>({
  columns,
  data,
  deleteUrl,
  filterList = [],
}: IAdminTable<TData, TValue>) {
  // const tAdmin = useTranslations("AdminLocation");
  // const tDialog = useTranslations("AdminDialog");

  // console.log("datadatadatadata", data);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const fuzzyFilter = (
    row: Row<TData>,
    columnId: string,
    value: any,
    addMeta: (meta: FilterMeta) => void
  ) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);
    console.log("row.getValue(columnId)", row.getValue(columnId));

    // Store the itemRank info
    addMeta({ itemRank });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const table: Table<TData> = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    globalFilterFn: fuzzyFilter,
  });

  // table.setColumnFilters()

  return (
    <section className="w-full flex flex-col gap-3">
      <DataTableHeader
        table={table}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        deleteUrl={deleteUrl}
        filterList={filterList}
      />

      <div className="w-full relative rounded md max-h-[580px] overflow-auto">
        <TableWrap className="w-full p-2 bg-white dark:bg-zinc-950">
          <TableHeader className="w-full sticky top-0 z-10 bg-white dark:bg-zinc-950">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableWrap>
      </div>

      <DataTablePagination table={table} />
    </section>
  );
}

export default AdminTable;
