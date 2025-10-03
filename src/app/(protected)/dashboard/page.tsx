"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// --- Drawer and Tooltip for Logged In FA Today ---
import Link from "next/link";
import { useLocale } from "@/context/locale-context";
import { fetchDashboardAnalytics, fetchLoggedInFA } from "@/services/dashboardApi";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription, CardAction } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import Image from "next/image";
import { BottomRightSheetPopup } from "@/components/BottomRightSheetPopup";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateTimeFormat } from "@/components/ui/DateTimeFormat";
import { CRMWelcomeBanner } from "@/components/ui/crm-welcome-banner";

type DashboardData = {
  till_date: {
    open_visits_cnt: number;
    total_user_cnt: number;
    total_fr_count: number;
    total_fm_count: number;
    resolved_visits_cnt: number;
    closed_visits_cnt: number;
    in_progress_visits_cnt: number;
    open_tickets_cnt: number;
    resolved_tickets_cnt: number;
    closed_tickets_cnt: number;
    pending_tickets_cnt: number;
  };
  todays: {
    todays_logged_in_usr_cnt: number;
    todays_registered_user_cnt: number;
    todays_open_visits_cnt: number;
    todays_resolved_visits_cnt: number;
    todays_closed_visits_cnt: number;
    todays_in_progress_visits_cnt: number;
    todays_open_tickets_cnt: number;
    todays_resolved_tickets_cnt: number;
    todays_closed_tickets_cnt: number;
    todays_pending_tickets_count: number;
  };
  mtd: {
    mtd_registered_user_cnt: number;
    mtd_open_visits_cnt: number;
    mtd_closed_visits_cnt: number;
    mtd_resolved_visits_cnt: number;
    mtd_pending_visits_cnt: number;
    mtd_open_tickets_cnt: number;
    mtd_closed_tickets_cnt: number;
    mtd_resolved_tickets_cnt: number;
    mtd_pending_ticket_cnt: number;
  };
  total?: {
    total_sms?: number;
    total_whatsapp?: number;
    total_video?: number;
  };
  max_admin_user_allowed: number;
  client_info: {
    paid_until: string;
    on_trial: boolean;
    created_on: string;
    trial_expired: boolean;
    business_email: string;
    company: string;
    allowed_users: number;
    s3_media_storage_path: string;
    subdomain: string;
    couch_db_name: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    pool_id: string;
    product_name: string;
    crm_type: string;
    crm_install: boolean;
    is_godeksless_source: boolean;
    is_paid_user: boolean;
    user_subscription: any;
    company_description: string;
    secondary_first_name: string | null;
    secondary_last_name: string | null;
    secondary_phone: string | null;
    secondary_email: string | null;
    support_number: string;
    trial_days_remaiming: number;
  };
};

function DrawerDemo({ loggedInToday }: { loggedInToday: number }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  type FAData = {
    id: number;
    email: string;
    full_name: string;
    agent_info?: {
      group_name?: string[];
      last_activity?: {
        highest_time?: string;
        activity_name?: string;
        child_ticket_id?: string;
        name?: string;
      };
    };
    last_login?: string;
  };
  const [data, setData] = useState<FAData[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [sort, setSort] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetchLoggedInFA({ page })
      .then((res) => {
        if (res.status && res.data && res.data[0]) {
          const d = res.data[0];
          if (Array.isArray(d.results)) {
            setData(d.results);
            setTotalPages(d.total_pages ?? 1);
            setCount(d.count ?? d.results.length);
            // Explicitly disable buttons if null
            setHasNext(Boolean(d.next));
            setHasPrev(Boolean(d.previous));
          } else if (Array.isArray(d)) {
            setData(d);
            setTotalPages(1);
            setCount(d.length);
            setHasNext(false);
            setHasPrev(false);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setHasNext(false);
        setHasPrev(false);
      });
  }, [open, page]);


  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
    if (!sort.key) return data;
    return [...data].sort((a, b) => {
      let aVal, bVal;
      switch (sort.key) {
        case "name":
          aVal = a.full_name;
          bVal = b.full_name;
          break;
        case "group":
          aVal = a.agent_info?.group_name?.[0] || "-";
          bVal = b.agent_info?.group_name?.[0] || "-";
          break;
        case "last_login":
          aVal = a.last_login;
          bVal = b.last_login;
          break;
        case "last_activity_time":
          aVal = a.agent_info?.last_activity?.highest_time || "";
          bVal = b.agent_info?.last_activity?.highest_time || "";
          break;
        case "last_activity":
          aVal = a.agent_info?.last_activity?.activity_name || "";
          bVal = b.agent_info?.last_activity?.activity_name || "";
          break;
        default:
          aVal = "";
          bVal = "";
      }
      aVal = aVal ?? "";
      bVal = bVal ?? "";
      if (sort.direction === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }, [data, sort]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="ml-2 text-blue-600 underline underline-offset-4 cursor-pointer font-bold"
            onClick={() => setOpen(true)}
          >
            {loggedInToday}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top">
          View agents
        </TooltipContent>
      </Tooltip>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Logged In Agents</DrawerTitle>
          </DrawerHeader>
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : (
            <div className="overflow-x-auto p-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">No.</TableHead>

                    <TableHead
                      className="text-center cursor-pointer"
                      onClick={() =>
                        setSort({
                          key: "name",
                          direction: sort.key === "name" && sort.direction === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Name {sort.key === "name" ? (sort.direction === "asc" ? "↑" : "↓") : "⇅"}
                    </TableHead>

                    <TableHead className="text-center">Email</TableHead>

                    <TableHead
                      className="text-center cursor-pointer"
                      onClick={() =>
                        setSort({
                          key: "group",
                          direction: sort.key === "group" && sort.direction === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Group {sort.key === "group" ? (sort.direction === "asc" ? "↑" : "↓") : "⇅"}
                    </TableHead>

                    <TableHead
                      className="text-center cursor-pointer"
                      onClick={() =>
                        setSort({
                          key: "last_login",
                          direction: sort.key === "last_login" && sort.direction === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Last Login Date {sort.key === "last_login" ? (sort.direction === "asc" ? "↑" : "↓") : "⇅"}
                    </TableHead>

                    <TableHead
                      className="text-center cursor-pointer"
                      onClick={() =>
                        setSort({
                          key: "last_activity_time",
                          direction: sort.key === "last_activity_time" && sort.direction === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Last Activity Time {sort.key === "last_activity_time" ? (sort.direction === "asc" ? "↑" : "↓") : "⇅"}
                    </TableHead>

                    <TableHead
                      className="text-center cursor-pointer"
                      onClick={() =>
                        setSort({
                          key: "last_activity",
                          direction: sort.key === "last_activity" && sort.direction === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Last Activity {sort.key === "last_activity" ? (sort.direction === "asc" ? "↑" : "↓") : "⇅"}
                    </TableHead>

                    <TableHead className="text-center">Visit - Subject</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {Array.isArray(sortedData) && sortedData.length > 0 ? (
                    sortedData.map((row, idx) => (
                      <TableRow key={row.id}>
                        <TableCell className="text-center">{(page - 1) * 10 + idx + 1}</TableCell>
                        <TableCell className="text-center font-medium">{row.full_name}</TableCell>
                        <TableCell className="text-center">{row.email}</TableCell>
                        <TableCell className="text-center">{row.agent_info?.group_name?.[0] || "N/A"}</TableCell>
                        <TableCell className="text-center"><DateTimeFormat value={row.last_login} /></TableCell>
                        <TableCell className="text-center"><DateTimeFormat value={row.agent_info?.last_activity?.highest_time} /></TableCell>
                        <TableCell className="text-center">{row.agent_info?.last_activity?.activity_name || "N/A"}</TableCell>
                        <TableCell className="text-center">{row.agent_info?.last_activity?.child_ticket_id ? `${row.agent_info.last_activity.child_ticket_id}-${row.agent_info.last_activity.name}` : "N/A"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-400">No data found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm">Page {page} of {totalPages}</span>
                <div className="flex gap-2">
                  <div className="flex gap-2">
                    <button
                      className="px-2 py-1 border rounded"
                      disabled={!hasPrev} // disabled if hasPrev is false
                      onClick={() => setPage(page - 1)}
                    >
                      Prev
                    </button>
                    <button
                      className="px-2 py-1 border rounded"
                      disabled={!hasNext} // disabled if hasNext is false
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </TooltipProvider>
  );
}

export default function Dashboard() {
  const { t } = useLocale();

  // States
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [openVisitsTab, setOpenVisitsTab] = useState<"till_date" | "mtd" | "today">("today");
  const [openTicketsTab, setOpenTicketsTab] = useState<"till_date" | "mtd" | "today">("today");
  const [combinedStatusTab, setCombinedStatusTab] = useState<"ticket" | "visit">("ticket");

  // Fetch data
  useEffect(() => {
    fetchDashboardAnalytics()
      .then((res) => {
        if (res.status && res.data && res.data.length > 0) {
          setDashboardData(res.data[0]);
        }
      })
      .catch(() => {
        setDashboardData(null);
      });
  }, []);

  // --- Computed values ---

  // Open Visits card
  let visitsCount = 0;
  let visitsPrevCount = 0;
  let visitsLabel = "";
  if (dashboardData) {
    if (openVisitsTab === "till_date") {
      visitsCount = dashboardData.till_date.open_visits_cnt;
      visitsPrevCount = dashboardData.mtd.mtd_open_visits_cnt;
      visitsLabel = "Till Date";
    } else if (openVisitsTab === "mtd") {
      visitsCount = dashboardData.mtd.mtd_open_visits_cnt;
      visitsPrevCount = dashboardData.todays.todays_open_visits_cnt;
      visitsLabel = "MTD";
    } else {
      visitsCount = dashboardData.todays.todays_open_visits_cnt;
      visitsPrevCount = dashboardData.mtd.mtd_open_visits_cnt;
      visitsLabel = "Today";
    }
  }
  const visitsPercentChange =
    visitsPrevCount !== 0 ? Math.round(((visitsCount - visitsPrevCount) / visitsPrevCount) * 100) : 0;
  const visitsIsPositive = visitsPercentChange >= 0;

  // Open Tickets card
  let ticketsCount = 0;
  let ticketsPrevCount = 0;
  let ticketsLabel = "";
  if (dashboardData) {
    if (openTicketsTab === "till_date") {
      ticketsCount = dashboardData.till_date.open_tickets_cnt;
      ticketsPrevCount = dashboardData.mtd.mtd_open_tickets_cnt;
      ticketsLabel = "Till Date";
    } else if (openTicketsTab === "mtd") {
      ticketsCount = dashboardData.mtd.mtd_open_tickets_cnt;
      ticketsPrevCount = dashboardData.todays.todays_open_tickets_cnt;
      ticketsLabel = "MTD";
    } else {
      ticketsCount = dashboardData.todays.todays_open_tickets_cnt;
      ticketsPrevCount = dashboardData.mtd.mtd_open_tickets_cnt;
      ticketsLabel = "Today";
    }
  }
  const ticketsPercentChange =
    ticketsPrevCount !== 0 ? Math.round(((ticketsCount - ticketsPrevCount) / ticketsPrevCount) * 100) : 0;
  const ticketsIsPositive = ticketsPercentChange >= 0;

  // Total Users card
  const totalUsers = dashboardData ? dashboardData.till_date.total_user_cnt : 0;
  const loggedInToday = dashboardData ? dashboardData.todays.todays_logged_in_usr_cnt : 0;

  return (
    <>
      <CRMWelcomeBanner />
      <div className="flex flex-col gap-8">
        {/* First Row: Main Cards (shadcn) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData === null ? (
            <>
              <Card><CardContent><Skeleton className="h-[90px] w-full rounded-xl mb-2" /><Skeleton className="h-4 w-1/2 mb-2" /><Skeleton className="h-4 w-1/3" /></CardContent></Card>
              <Card><CardContent><Skeleton className="h-[90px] w-full rounded-xl mb-2" /><Skeleton className="h-4 w-1/2 mb-2" /><Skeleton className="h-4 w-1/3" /></CardContent></Card>
              <Card><CardContent><Skeleton className="h-[90px] w-full rounded-xl mb-2" /><Skeleton className="h-4 w-1/2 mb-2" /><Skeleton className="h-4 w-1/3" /></CardContent></Card>
            </>
          ) : (
            <>
              {/* Open Tickets Card */}
              <Card className="py-3 gap-2">
                <CardHeader className="flex flex-row items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <CardTitle className="font-normal text-xl text-gray-600">Open Tickets</CardTitle>
                    <Image src="/icons/ic-ticket.svg" alt="Ticket Icon" width={24} height={24} />
                  </div>
                  <CardAction className="ml-auto">
                    <Select
                      value={openTicketsTab}
                      onValueChange={(v) => setOpenTicketsTab(v as "today" | "mtd" | "till_date")}
                    >
                      <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="mtd">MTD</SelectItem>
                        <SelectItem value="till_date">Till Date</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardAction>
                </CardHeader>

                <CardContent className="flex items-end justify-between flex-1">
                  <span className="text-5xl font-normal tracking-tight">{ticketsCount}</span>
                  <div className="flex flex-col items-end">
                    <span
                      className={`flex items-center gap-1 text-base font-semibold ${ticketsIsPositive ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {ticketsIsPositive ? `+${Math.abs(ticketsPercentChange)}%` : `-${Math.abs(ticketsPercentChange)}%`}
                      {ticketsIsPositive ? (
                        <Image src="/icons/green-uptrend.svg" alt="Uptrend" width={20} height={20} />
                      ) : (
                        <Image src="/icons/red-downtrend.svg" alt="Downtrend" width={20} height={20} />
                      )}
                    </span>
                    <span className="text-sm text-gray-500">
                      From Last {openTicketsTab === "till_date" ? "MTD" : openTicketsTab === "mtd" ? "Today" : "MTD"}
                    </span>
                  </div>
                </CardContent>
              </Card>


              {/* Open Visits Card */}
              <Card className="py-3 gap-2">
                <CardHeader className="flex flex-row items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <CardTitle className="font-normal text-xl text-gray-600">Open Visits</CardTitle>
                    <Image src="/icons/ic-page.svg" alt="Visits Icon" width={24} height={24} />
                  </div>
                  <CardAction className="ml-auto">
                    <Select value={openVisitsTab} onValueChange={v => setOpenVisitsTab(v as "today" | "mtd" | "till_date")}>
                      <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="mtd">MTD</SelectItem>
                        <SelectItem value="till_date">Till Date</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex items-end justify-between flex-1">
                  <span className="text-5xl font-normal tracking-tight">{visitsCount}</span>
                  <div className="flex flex-col items-end">
                    <span
                      className={`flex items-center gap-1 text-base font-semibold ${visitsIsPositive ? "text-green-600" : "text-red-600"}`}
                    >
                      {visitsIsPositive ? `+${Math.abs(visitsPercentChange)}%` : `-${Math.abs(visitsPercentChange)}%`}
                      {visitsIsPositive ? (
                        <Image src="/icons/green-uptrend.svg" alt="Uptrend" width={20} height={20} />
                      ) : (
                        <Image src="/icons/red-downtrend.svg" alt="Downtrend" width={20} height={20} />
                      )}
                    </span>
                    <span className="text-sm text-gray-500">
                      From Last {openVisitsTab === "till_date" ? "MTD" : openVisitsTab === "mtd" ? "Today" : "MTD"}
                    </span>
                  </div>
                </CardContent>
              </Card>
              {/* Total Users Card */}
              <Card className="py-3 gap-2">
                <CardHeader className="flex flex-row items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <CardTitle className="font-normal text-xl text-gray-600">Total Users</CardTitle>
                    <Image src="/icons/ic-people.svg" alt="Users Icon" width={24} height={24} />
                  </div>
                </CardHeader>
                <CardContent className="flex items-end justify-between flex-1">
                  <span className="text-5xl font-normal tracking-tight">{totalUsers}</span>
                  <div className="flex flex-col items-end">
                    <span className="text-base font-semibold text-gray-600">
                      Logged In FA Today:
                      <DrawerDemo loggedInToday={loggedInToday} />
                    </span>
                  </div>

                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Second Row: Ticket Status, Visit Status, Communication Stats Cards */}

        {/* Second Row: Ticket Status, Visit Status, Communication Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboardData === null ? (
            <>
              <Card className="w-full md:w-auto lg:w-auto">
                <CardContent>
                  <Skeleton className="h-[32px] w-1/2 rounded mb-2" />
                  <div className="flex flex-col gap-2 mt-2">
                    <Skeleton className="h-5 w-full rounded" />
                    <Skeleton className="h-5 w-full rounded" />
                    <Skeleton className="h-5 w-full rounded" />
                    <Skeleton className="h-5 w-full rounded" />
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full md:w-auto lg:w-auto">
                <CardContent>
                  <Skeleton className="h-[32px] w-1/2 rounded mb-2" />
                  <div className="flex flex-col gap-2 mt-2">
                    <Skeleton className="h-5 w-full rounded" />
                    <Skeleton className="h-5 w-full rounded" />
                    <Skeleton className="h-5 w-full rounded" />
                    <Skeleton className="h-5 w-full rounded" />
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full md:w-auto lg:w-auto">
                <CardHeader>
                  <Skeleton className="h-6 w-1/3 mb-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[80px] w-full rounded mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-4 w-1/3" />
                </CardFooter>
              </Card>
            </>
          ) : (
            <>
              {/* Ticket Status Table */}
              <Card className="w-full md:w-auto lg:w-auto py-2 gap-2">
                <CardHeader className="flex flex-row items-center gap-2 pb-0 pt-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="font-normal text-lg text-gray-600">Ticket Status</CardTitle>
                    <Image src="/icons/ic-ticket.svg" alt="Ticket Icon" width={20} height={20} />
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Status</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { status: "Resolved", count: dashboardData.till_date.resolved_tickets_cnt },
                        { status: "Closed", count: dashboardData.till_date.closed_tickets_cnt },
                        { status: "Pending", count: dashboardData.till_date.pending_tickets_cnt },
                        { status: "Open", count: dashboardData.till_date.open_tickets_cnt },
                      ].map((item, idx) => (
                        <TableRow key={item.status}>
                          <TableCell className="font-medium">{item.status}</TableCell>
                          <TableCell className="text-right">{item.count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell className="font-bold">Total</TableCell>
                        <TableCell className="text-right">
                          {dashboardData.till_date.resolved_tickets_cnt +
                            dashboardData.till_date.closed_tickets_cnt +
                            dashboardData.till_date.pending_tickets_cnt +
                            dashboardData.till_date.open_tickets_cnt}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </CardContent>
              </Card>

              {/* Visit Status Table */}
              <Card className="w-full md:w-auto lg:w-auto py-2 gap-2">
                <CardHeader className="flex flex-row items-center gap-2 pb-0 pt-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="font-normal text-lg text-gray-600">Visit Status</CardTitle>
                    <Image src="/icons/ic-page.svg" alt="Visit Icon" width={20} height={20} />
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Status</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { status: "Resolved", count: dashboardData.till_date.resolved_visits_cnt },
                        { status: "Closed", count: dashboardData.till_date.closed_visits_cnt },
                        { status: "Pending", count: dashboardData.till_date.in_progress_visits_cnt },
                        { status: "Open", count: dashboardData.till_date.open_visits_cnt },
                      ].map((item, idx) => (
                        <TableRow key={item.status}>
                          <TableCell className="font-medium">{item.status}</TableCell>
                          <TableCell className="text-right">{item.count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell className="font-bold">Total</TableCell>
                        <TableCell className="text-right">
                          {dashboardData.till_date.resolved_visits_cnt +
                            dashboardData.till_date.closed_visits_cnt +
                            dashboardData.till_date.in_progress_visits_cnt +
                            dashboardData.till_date.open_visits_cnt}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </CardContent>
              </Card>

              {/* Communication Stats Card using official shadcn ChartContainer and ChartTooltip */}
              <Card className="w-full md:w-auto lg:w-auto py-2 gap-2">
                <CardHeader className="pb-0 pt-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="font-normal text-lg text-gray-600">Media Count</CardTitle>
                    <Image src="/icons/ic-chat.svg" alt="Visit Icon" width={20} height={20} />
                  </div>
                </CardHeader>
                <CardContent>
                  {dashboardData && (
                    <ChartContainer
                      config={{
                        value: {
                          label: "Count",
                          color: "var(--chart-1)",
                        },
                      }}
                    >
                      <BarChart
                        accessibilityLayer
                        data={[
                          { metric: "SMS", value: dashboardData.total?.total_sms ?? 0 },
                          { metric: "WhatsApp", value: dashboardData.total?.total_whatsapp ?? 0 },
                          { metric: "Video", value: dashboardData.total?.total_video ?? 0 },
                        ]}
                        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                      >
                        {/* Vertical bar chart (default) */}
                        <XAxis
                          dataKey="metric"
                          type="category"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={10}
                        />
                        <YAxis
                          type="number"
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => value}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="value" radius={5} barSize={40} fill="#90CAF9" />
                      </BarChart>
                    </ChartContainer>
                  )}
                </CardContent>
              </Card>

            </>
          )}
        </div>
      </div >
    </>
  );
}
