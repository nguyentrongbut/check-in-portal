'use client'

import React from "react"
import {useRouter, useSearchParams} from 'next/navigation'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {Button} from "@/components/ui/button"

interface DataTableServerProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    total: number
    currentPage: number
    pageSize: number
    totalPages: number
}

export function DataTableServer<TData, TValue>({
                                                   columns,
                                                   data,
                                                   total,
                                                   currentPage,
                                                   pageSize,
                                                   totalPages,
                                               }: DataTableServerProps<TData, TValue>) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [isPending, startTransition] = React.useTransition()

    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        pageCount: totalPages,
    })

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', newPage.toString())
        startTransition(() => {
            router.push(`?${params.toString()}`, { scroll: false })
        })
    }

    const handlePageSizeChange = (newSize: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('size', newSize.toString())
        params.set('page', '0')
        startTransition(() => {
            router.push(`?${params.toString()}`, { scroll: false })
        })
    }

    const handleGoToPage = (page: number) => {
        if (page >= 0 && page < totalPages) {
            handlePageChange(page)
        }
    }

    return (
        <div className="relative">
            {/* Bảng */}
            <div className={`rounded-md border transition-opacity ${isPending ? "opacity-50" : "opacity-100"}`}>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className={`opacity-80 select-none ${
                                            isPending ? "cursor-wait" : "cursor-pointer"
                                        }`}
                                        onClick={
                                            isPending ? undefined : header.column.getToggleSortingHandler()
                                        }
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                        {{}[header.column.getIsSorted() as string] ?? null}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="hover:bg-[#fafafa]">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Loading overlay */}
            {isPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
                </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between px-2 py-4">
                <div className="text-sm text-muted-foreground">
                    Page {currentPage + 1} of {totalPages} | Total {total} records
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0 || isPending}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages - 1 || isPending}
                    >
                        Next
                    </Button>
                    <span className="text-sm">
                        Page:
                        <input
                            type="number"
                            min={1}
                            max={totalPages}
                            defaultValue={currentPage + 1}
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                handleGoToPage(page)
                            }}
                            className="mx-2 w-12 rounded border text-center text-sm"
                            disabled={isPending}
                        />
                    </span>
                    <select
                        value={pageSize}
                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        className="rounded border px-2 py-1 text-sm"
                        disabled={isPending}
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <option key={size} value={size}>
                                Show {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}
