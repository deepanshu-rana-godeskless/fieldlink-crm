"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/context/locale-context";
import { fetchDashboardAnalytics } from "@/services/dashboardApi";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription, CardAction } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import { TrendingUp } from "lucide-react";
import { BottomRightSheetPopup } from "@/components/BottomRightSheetPopup";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
              <Card>
                <CardHeader className="flex flex-row items-center gap-8 mb-3">
                  <CardTitle className="font-normal text-xl text-gray-600">Open Tickets</CardTitle>
                  <CardAction className="ml-auto">
                    <Select value={openTicketsTab} onValueChange={v => setOpenTicketsTab(v as "today" | "mtd" | "till_date")}>
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
                  <span className="text-5xl font-bold tracking-tight">{ticketsCount}</span>
                  <div className="flex flex-col items-end">
                    <span
                      className={`flex items-center gap-1 text-base font-semibold ${ticketsIsPositive ? "text-green-600" : "text-red-600"}`}
                    >
                      {ticketsIsPositive ? "▲" : "▼"} {Math.abs(ticketsPercentChange)}%
                    </span>
                    <span className="text-sm text-gray-500">
                      From Last {openTicketsTab === "till_date" ? "MTD" : openTicketsTab === "mtd" ? "Today" : "MTD"}
                    </span>
                  </div>
                </CardContent>
              </Card>
              {/* Open Visits Card */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-8 mb-3">
                  <CardTitle className="font-normal text-xl text-gray-600">Open Visits</CardTitle>
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
                  <span className="text-5xl font-bold tracking-tight">{visitsCount}</span>
                  <div className="flex flex-col items-end">
                    <span
                      className={`flex items-center gap-1 text-base font-semibold ${visitsIsPositive ? "text-green-600" : "text-red-600"}`}
                    >
                      {visitsIsPositive ? "▲" : "▼"} {Math.abs(visitsPercentChange)}%
                    </span>
                    <span className="text-sm text-gray-500">
                      From Last {openVisitsTab === "till_date" ? "MTD" : openVisitsTab === "mtd" ? "Today" : "MTD"}
                    </span>
                  </div>
                </CardContent>
              </Card>
              {/* Total Users Card */}
              <Card>
                <CardHeader className="flex items-center gap-8 mb-3">
                  <CardTitle className="font-normal text-xl text-gray-600">Total Users</CardTitle>
                </CardHeader>
                <CardContent className="flex items-end justify-between flex-1">
                  <span className="text-5xl font-bold tracking-tight">{totalUsers}</span>
                  <div className="flex flex-col items-end">
                    <span className="text-base font-semibold text-gray-600">
                      Logged In FA Today: {loggedInToday}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Second Row: Combined Ticket/Visit Status Card (shadcn, single card width) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Combined Ticket/Visit Status Card */}
          {dashboardData === null ? (
            <>
              <Card className="w-full md:w-auto lg:w-auto">
                <CardContent>
                  <Skeleton className="h-[40px] w-1/2 rounded mb-2" />
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Skeleton className="h-6 w-full rounded" />
                    <Skeleton className="h-6 w-full rounded" />
                    <Skeleton className="h-6 w-full rounded" />
                    <Skeleton className="h-6 w-full rounded" />
                  </div>
                </CardContent>
              </Card>
              {/* Communication Stats Card Skeleton */}
              <Card className="w-full md:w-auto lg:w-auto">
                <CardHeader>
                  <Skeleton className="h-6 w-1/3 mb-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[120px] w-full rounded mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-4 w-1/3" />
                </CardFooter>
              </Card>
            </>
          ) : (
            <>
              <Card className="w-full md:w-auto lg:w-auto">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center gap-6 w-full">
                    {/* Tabs for Ticket Status and Visit Status */}
                    <div className="flex gap-4">
                      {["ticket", "visit"].map((tab) => (
                        <span
                          key={tab}
                          className={`cursor-pointer text-base font-semibold pb-1 ${combinedStatusTab === tab
                            ? "text-blue-700 border-b-2 border-blue-700"
                            : "text-gray-500 border-b-2 border-transparent"
                            } transition-colors`}
                          onClick={() => setCombinedStatusTab(tab as "ticket" | "visit")}
                        >
                          {tab === "ticket" ? "Ticket Status" : "Visit Status"}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-1 pb-2">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Status blocks: Resolved, Closed, Pending, Open */}
                    {combinedStatusTab === "ticket" ? (
                      <>
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">Resolved</span>
                          <span className="text-xl font-bold">{dashboardData.till_date.resolved_tickets_cnt}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">Closed</span>
                          <span className="text-xl font-bold">{dashboardData.till_date.closed_tickets_cnt}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">Pending</span>
                          <span className="text-xl font-bold">{dashboardData.till_date.pending_tickets_cnt}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">Open</span>
                          <span className="text-xl font-bold">{dashboardData.till_date.open_tickets_cnt}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">Resolved</span>
                          <span className="text-xl font-bold">{dashboardData.till_date.resolved_visits_cnt}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">Closed</span>
                          <span className="text-xl font-bold">{dashboardData.till_date.closed_visits_cnt}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">Pending</span>
                          <span className="text-xl font-bold">{dashboardData.till_date.in_progress_visits_cnt}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">Open</span>
                          <span className="text-xl font-bold">{dashboardData.till_date.open_visits_cnt}</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
              {/* Communication Stats Card */}
              <Card className="w-full md:w-auto lg:w-auto">
                <CardHeader className="flex flex-row items-center gap-8 mb-3">
                  <CardTitle className="font-normal text-xl text-gray-600">Communication Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-gray-600">SMS</span>
                      <span className="text-xl font-bold tracking-tight">{dashboardData.total?.total_sms ?? 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-gray-600">WhatsApp</span>
                      <span className="text-xl font-bold tracking-tight">{dashboardData.total?.total_whatsapp ?? 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-gray-600">Video</span>
                      <span className="text-xl font-bold tracking-tight">{dashboardData.total?.total_video ?? 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </>
  );
}
