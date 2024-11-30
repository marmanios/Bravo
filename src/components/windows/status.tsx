"use client";

import useCallLogs from "@/hooks/getAllCallLogs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Window from "../window";
import { TCallLog, responderStatusMap, responderTypeMap } from "@/utils/types";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/utils";
import { typeMap } from "../call-card";
import { format } from "date-fns";
import { SortButton } from "../sort-button";
import { useState } from "react";

export default function Status() {
  const { data: callLogs, isLoading } = useCallLogs();
  const [sort, setSort] = useState("priority");

  if (isLoading) {
    return (
      <Window className="col-span-4 row-span-2" title="Status" circle="red">
        <p>Loading...</p>
      </Window>
    );
  }

  return (
    <Window
      className="col-span-4 row-span-2"
      title="Status"
      circle="red"
      sort={
        <SortButton
          options={[
            { name: "Priority", value: "priority" },
            { name: "Status", value: "status" },
            { name: "Time", value: "time" },
            { name: "Type", value: "type" },
          ]}
          sort={sort}
          setSort={setSort}
        />
      }
    >
      <Table>
        <TableHeader>
          <TableRow className="uppercase">
            <TableHead>ID</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Response Type</TableHead>
            <TableHead>Response Status</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm">
          {callLogs
            ?.filter((log) => {
              return log.status === "active" || log.status === "pending";
            })
            .sort((a, b) => {
              if (sort === "priority") {
                const priorityOrder = { low: 0, medium: 1, high: 2 };
                return (
                  (priorityOrder[b.priority!] || 0) -
                  (priorityOrder[a.priority!] || 0)
                );
              }
              if (sort === "status") {
                const statusOrder = {
                  active: 2,
                  pending: 1,
                  resolved: 0,
                  cancelled: 0,
                };
                return (
                  (statusOrder[b.status!] || 0) - (statusOrder[a.status!] || 0)
                );
              }
              if (sort === "time") {
                return (
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
                );
              }
              if (sort === "type") {
                return (a.type || "").localeCompare(b.type || "");
              }
              return 0;
            })
            ?.map((log) => (
              <TableRow
                key={log.id}
                className="cursor-pointer hover:bg-[#16253f] transition-all"
              >
                <TableCell className="text-muted">#{log.id}</TableCell>
                <TableCell>
                  <TriangleAlert
                    className={cn(
                      "w-6 h-6",
                      log.priority === "high" && "text-red-500",
                      log.priority === "medium" && "text-yellow-500",
                      log.priority === "low" && "text-green-500"
                    )}
                  />
                </TableCell>
                <TableCell>{typeMap[log.type ?? "Other"]}</TableCell>
                <TableCell>
                  {format(log.createdAt, "yyyy-mm-dd HH:mm:ss")}
                </TableCell>
                <TableCell className="text-sm font-light">{log.city}</TableCell>
                <TableCell className="text-sm font-light">
                  {log.address}
                </TableCell>
                <TableCell>
                  {log.responseType
                    ? responderTypeMap[log.responseType]
                    : "No Response."}
                </TableCell>
                <TableCell>
                  {log.responseStatus
                    ? responderStatusMap[log.responseStatus]
                    : "No Response."}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-light uppercase tracking-[1px]",
                    log.status === "pending" && "text-yellow-500",
                    log.status === "active" && "text-red-500"
                  )}
                >
                  {log.status}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Window>
  );
}
