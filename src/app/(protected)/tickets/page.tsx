"use client";

import * as React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTable } from "@/hooks/use-data-table";
import { useCallback, useContext } from "react";
import { LoadingContext } from "@/context/LoadingContext";
import { fetchTickets, Ticket } from "@/services/ticketApi";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, Text, CheckCircle2, XCircle } from "lucide-react";

function useTimezone() {
    return React.useMemo(() => {
        if (typeof window !== "undefined") {
            return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
        return "Asia/Kolkata";
    }, []);
}

export default function TicketsPage() {
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const { setLoading: setGlobalLoading } = useContext(LoadingContext);
    const [tickets, setTickets] = React.useState<Ticket[]>([]);
    const [count, setCount] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(1);
    const [sorting, setSorting] = React.useState<any[]>([{ id: "reported_date", desc: true }]);
    const timezone = useTimezone();

    const fetchData = useCallback(() => {
        setLoading(true);
        setGlobalLoading(true);
        fetchTickets({ page, timezone })
            .then((res) => {
                setTickets(res.results);
                setCount(res.count);
                setTotalPages(res.total_pages);
            })
            .catch(() => {
                setTickets([]);
            })
            .finally(() => {
                setLoading(false);
                setGlobalLoading(false);
            });
    }, [page, timezone, setGlobalLoading]);

    React.useEffect(() => {
        fetchData();
    }, [page, sorting, fetchData]);

    const columns = React.useMemo(
        () => [
            {
                id: "select",
                header: ({ table }: any) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) =>
                            table.toggleAllPageRowsSelected(!!value)
                        }
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }: any) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                size: 32,
                enableSorting: false,
                enableHiding: false,
            },
            {
                id: "ticket_id",
                accessorKey: "fw_ticket_id",
                header: ({ column }: any) => (
                    <DataTableColumnHeader column={column} title="Ticket ID" />
                ),
                cell: ({ row }: any) => {
                    const fw_ticket_id = row.original.fw_ticket_id;
                    const id = row.original.id;
                    return <span>{fw_ticket_id ? fw_ticket_id : id}</span>;
                },
                enableSorting: true,
            },
            {
                id: "name",
                accessorKey: "name",
                header: ({ column }: any) => (
                    <DataTableColumnHeader column={column} title="Title" />
                ),
                cell: ({ cell }: any) => <div>{cell.getValue()}</div>,
                meta: {
                    label: "Title",
                    placeholder: "Search titles...",
                    variant: "text" as const,
                    icon: Text,
                },
                enableColumnFilter: true,
            },
            {
                id: "ticket_status",
                accessorKey: "ticket_status",
                header: ({ column }: any) => (
                    <DataTableColumnHeader column={column} title="Status" />
                ),
                cell: ({ cell }: any) => {
                    const status = cell.getValue();
                    const Icon = status === "Open" ? CheckCircle2 : XCircle;
                    return (
                        <Badge variant="outline" className="capitalize">
                            <Icon />
                            {status}
                        </Badge>
                    );
                },
                meta: {
                    label: "Status",
                    variant: "multiSelect" as const,
                    options: [
                        { label: "Open", value: "Open", icon: CheckCircle2 },
                        { label: "Closed", value: "Closed", icon: XCircle },
                    ],
                },
                enableColumnFilter: true,
            },
            {
                id: "ticket_priority",
                accessorKey: "ticket_priority",
                header: ({ column }: any) => (
                    <DataTableColumnHeader column={column} title="Priority" />
                ),
                cell: ({ cell }: any) => {
                    const priority = cell.getValue();
                    let variant: "secondary" | "destructive" | "outline" = "secondary";
                    let customClass = "capitalize";
                    if (priority === "critical") {
                        variant = "destructive";
                    } else if (priority === "low") {
                        variant = "outline";
                        customClass += " bg-yellow-400 text-black border-none";
                    }
                    return (
                        <Badge variant={variant} className={customClass}>
                            {priority}
                        </Badge>
                    );
                },
            },
            {
                id: "reported_date",
                accessorKey: "reported_date",
                header: ({ column }: any) => (
                    <DataTableColumnHeader column={column} title="Reported Date" />
                ),
                cell: ({ cell }: any) => {
                    const date = cell.getValue();
                    return (
                        <span>{new Date(date).toLocaleString(undefined, { timeZone: typeof timezone === 'string' ? timezone : 'Asia/Kolkata' })}</span>
                    );
                },
            },
            {
                id: "requester_name",
                accessorKey: "requester_name",
                header: ({ column }: any) => (
                    <DataTableColumnHeader column={column} title="Requester" />
                ),
                cell: ({ cell }: any) => <span>{cell.getValue()}</span>,
            },
            {
                id: "actions",
                cell: function Cell() {
                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
                size: 32,
            },
        ],
        [timezone]
    );

    const { table } = useDataTable({
        data: tickets,
        columns,
        pageCount: totalPages,
        initialState: {
            sorting,
            columnPinning: { right: ["actions"] },
        },
        getRowId: (row: Ticket) => String(row.id),
        onSortingChange: setSorting,
        onPaginationChange: (updaterOrValue: any) => {
            if (typeof updaterOrValue === "function") {
                const newPagination = updaterOrValue({ pageIndex: page - 1, pageSize: 20 });
                setPage(newPagination.pageIndex + 1);
            } else {
                setPage(updaterOrValue.pageIndex + 1);
            }
        },
    });

    return (
        <div className="data-table-container">
            <h1 className="text-2xl font-bold mb-2">Tickets</h1>
            <DataTable
                table={table}
                actionBar={null}
                className="mt-0"
            >
                <DataTableToolbar table={table} />
            </DataTable>
            <div className="flex justify-between items-center mb-2">
                <Button
                    variant="outline"
                    disabled={page <= 1 || loading}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                    Previous
                </Button>
                <span>
                    Page {page} of {totalPages} ({count} tickets)
                </span>
                <Button
                    variant="outline"
                    disabled={page >= totalPages || loading}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
