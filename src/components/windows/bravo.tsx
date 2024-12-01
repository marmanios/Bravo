"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Window from "../window";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { typeMap } from "../call-card";
import {
  TCallLogInsertDB,
  TCallType,
  TEmergencyPriority,
  TResponderStatus,
  TResponderType,
  callTypeMap,
  emergencyPriorityMap,
  responderStatusMap,
  responderTypeMap,
} from "@/utils/types";
import { Lock, LockOpen, TriangleAlert } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "../ui/button";
import { format, set } from "date-fns";
import useCallLog from "@/context/use-call-log";
import usePutCallLog from "@/hooks/putCallLog";
import useCallLogs from "@/hooks/getAllCallLogs";

type props = {
  loading: "initialize" | "fetching" | "completed";
};

export default function Bravo({ loading }: props) {
  const putCallLog = usePutCallLog();
  const { data: callLogs } = useCallLogs();
  const {
    selectedCallLog,
    expandTranscript,
    metaData,
    editMode,
    setEditMode,
    createMode,
    setInCall,
    setCreateMode,
    setMetaData,
  } = useCallLog();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [situation, setSituation] = useState("");
  const [callType, setCallType] = useState("");
  const [priority, setPriority] = useState("");
  const [responseType, setResponseType] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const [created, setCreated] = useState("");
  const [dispatched, setDispatched] = useState("");
  const [ended, setEnded] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [responderOptions, setResponderOptions] = useState<TResponderStatus[]>(
    []
  );
  const [status, setStatus] = useState("");

  const [locks, setLocks] = useState({
    name: false,
    address: false,
    situation: false,
    callType: false,
    priority: false,
  });

  useEffect(() => {
    if (
      metaData?.callback_information !== undefined &&
      metaData.callback_information !== ""
    ) {
      setPhone(metaData.callback_information);
    }
    if (
      metaData?.caller_name !== undefined &&
      metaData.caller_name !== "" &&
      (locks.name === false || name === "")
    ) {
      setName(metaData.caller_name);
    }
    if (
      metaData?.latitude !== undefined &&
      typeof metaData.latitude === "string" &&
      !isNaN(Number(metaData.latitude))
    ) {
      console.log("Latitude", metaData.latitude);
      setLatitude(metaData.latitude);
    }
    if (
      metaData?.longitude !== undefined &&
      typeof metaData.longitude === "string" &&
      !isNaN(Number(metaData.longitude))
    ) {
      console.log("Longitude", metaData.longitude);
      setLongitude(metaData.longitude);
    }
    if (
      metaData?.incident_location !== undefined &&
      metaData.incident_location !== ""
    ) {
      setAddress(metaData.incident_location);
    }
    if (
      metaData?.location_details !== undefined &&
      metaData.location_details !== ""
    ) {
      setAddress(metaData.location_details);
    }
    if (
      metaData?.dispatch !== undefined &&
      typeof metaData.dispatch == "object"
    ) {
      setResponderOptions(metaData.dispatch);
    }
    if (
      metaData?.priority !== undefined &&
      metaData.priority in emergencyPriorityMap &&
      (locks.priority === false || priority === "")
    ) {
      setPriority(metaData.priority);
    }
    if (
      metaData?.case_type !== undefined &&
      metaData.case_type in callTypeMap &&
      (locks.callType === false || callType === "")
    ) {
      setCallType(metaData.case_type);
    }
    if (
      metaData?.situation_details !== undefined &&
      metaData.situation_details !== "" &&
      (locks.situation === false || situation === "")
    ) {
      setSituation(metaData.situation_details);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaData]);

  useEffect(() => {
    console.log("useffect triggered selectedCallLog", selectedCallLog);
    if (selectedCallLog) {
      const updatedLog = callLogs?.find((log) => log.id === selectedCallLog.id);

      console.log("updatedLog", updatedLog);
      if (!updatedLog) {
        return;
      }

      setMetaData(null);
      setName(updatedLog.name || "");
      setPhone(updatedLog.phoneNumber || "");
      setAddress(updatedLog.address || "");
      setCity(updatedLog.city || "");
      setLocation(updatedLog.locationDescription || "");
      setSituation(updatedLog.description || "");
      setCallType(updatedLog.type || "");
      setPriority(updatedLog.priority || "");
      setResponseType(updatedLog.responseType || "");
      setResponseStatus(updatedLog.responseStatus || "");
      setCreated(updatedLog.createdAt || "");
      setDispatched(updatedLog.dispatchedAt || "");
      setEnded(updatedLog.endedAt || "");
      setStatus(updatedLog.status || "");
    } else {
      setName("");
      setPhone("");
      setAddress("");
      setCity("");
      setLocation("");
      setSituation("");
      setCallType("");
      setPriority("");
      setResponseType("");
      setResponseStatus("");
      setCreated("");
      setDispatched("");
      setEnded("");
      setStatus("");
      setMetaData(null);
    }
  }, [selectedCallLog, editMode, callLogs, setMetaData]);

  type LockSwitchProps = {
    lockKey: "priority" | "name" | "address" | "situation" | "callType";
  };

  const LockSwitch: React.FC<LockSwitchProps> = ({ lockKey }) => (
    <>
      {locks[lockKey] ? (
        <Lock
          onClick={() => {
            setLocks({ ...locks, [lockKey]: false });
          }}
          className="absolute bottom-[50%] right-2 translate-y-1/2 cursor-pointer hover:stroke-2"
          strokeWidth={0.7}
          size={18}
        />
      ) : (
        <LockOpen
          onClick={() => {
            setLocks({ ...locks, [lockKey]: true });
          }}
          className="absolute bottom-[50%] right-2 translate-y-1/2 cursor-pointer hover:stroke-2"
          strokeWidth={0.7}
          size={18}
        />
      )}
    </>
  );

  return (
    <Window
      className={cn("col-span-2 row-span-3", expandTranscript && "col-span-4")}
      title={`Bravo`}
      shield
      controlSelected
      loadingOffset={1400}
      ai
      loading={loading}
    >
      {editMode || createMode ? (
        <div className="p-4 font-light">
          <h3>Call Information</h3>
          <div className="pt-2 grid grid-cols-2 gap-4">
            <div className="col-span-1 relative">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  autoComplete={"off"}
                  type="text"
                  placeholder="John Doe..."
                  className="pr-8"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <LockSwitch lockKey={"name"} />
              </div>
            </div>
            <div className="col-span-1">
              <Label htmlFor="name">Phone Number</Label>
              <Input
                id="phone-number"
                autoComplete={"off"}
                type="text"
                placeholder="+123-456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="name">Address</Label>
              <div className="relative">
                <Input
                  id="address"
                  autoComplete={"off"}
                  type="text"
                  placeholder="1234 Elm St..."
                  className="pr-8"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <LockSwitch lockKey={"address"} />
              </div>
            </div>
            {/* <div className="col-span-1">
              <Label htmlFor="name">City</Label>
              <Input
                id="city"
                autoComplete={"off"}
                type="text"
                placeholder="Springfield..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div> */}
            {/* <div className="col-span-2">
              <Label htmlFor="name">Location Description</Label>
              <Textarea
                id="location-description"
                className="h-32"
                autoComplete={"off"}
                placeholder="The house with the red door..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div> */}
            <div className="col-span-2 mb-6">
              <Label htmlFor="name">Situation Details</Label>
              <div className="relative">
                <Textarea
                  id="situation-details"
                  className="h-32 pr-8"
                  autoComplete={"off"}
                  placeholder="Person running away from the scene..."
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                />
                <LockSwitch lockKey={"situation"} />
              </div>
            </div>

            <hr className="col-span-2 mb-6 mx-4" />

            <div className="col-span-1">
              <Label>Case Type</Label>
              <div className="relative">
                <Select
                  value={callType}
                  onValueChange={setCallType}
                  defaultValue={callType}
                >
                  <SelectTrigger className="py-6 pr-8">
                    <SelectValue placeholder="Select a case type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(typeMap).map((type) => (
                      <SelectItem value={type} key={type}>
                        <p className="flex items-center gap-2">
                          {typeMap[type as TCallType]}{" "}
                          {callTypeMap[type as TCallType]}
                        </p>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <LockSwitch lockKey={"callType"} />
              </div>
            </div>

            <div className="col-span-1">
              <Label>Priority</Label>
              <div className="relative">
                <Select
                  value={priority}
                  onValueChange={setPriority}
                  defaultValue={priority}
                >
                  <SelectTrigger className="py-6 pr-8">
                    <SelectValue placeholder="Select a priority..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <p className="flex items-center gap-2">
                        <TriangleAlert
                          className={cn("w-6 h-6", "text-green-500")}
                        />
                        Low
                      </p>
                    </SelectItem>
                    <SelectItem value="medium">
                      <p className="flex items-center gap-2">
                        <TriangleAlert
                          className={cn("w-6 h-6", "text-yellow-500")}
                        />
                        Medium
                      </p>
                    </SelectItem>
                    <SelectItem value="high">
                      <p className="flex items-center gap-2">
                        <TriangleAlert
                          className={cn("w-6 h-6", "text-red-500")}
                        />
                        High
                      </p>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <LockSwitch lockKey={"priority"} />
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-4 mb-6">
              <div className="col-span-1">
                <Input
                  id="created"
                  className="text-center"
                  disabled
                  autoComplete={"off"}
                  type="text"
                  placeholder="NULL"
                  value={created && format(new Date(created), "mm-dd HH:mm:ss")}
                  onChange={(e) => setCreated(e.target.value)}
                />
                <Label
                  className="block text-center mt-1 text-sm font-extralight uppercase"
                  htmlFor="created"
                >
                  Call Started
                </Label>
              </div>
              <div className="col-span-1">
                <Input
                  id="dispatched"
                  className="text-center"
                  disabled
                  autoComplete={"off"}
                  type="text"
                  placeholder="NULL"
                  value={
                    dispatched && format(new Date(dispatched), "mm-dd HH:mm:ss")
                  }
                  onChange={(e) => setDispatched(e.target.value)}
                />
                <Label
                  className="block text-center mt-1 text-sm font-extralight uppercase"
                  htmlFor="created"
                >
                  Dispatched
                </Label>
              </div>
              <div className="col-span-1">
                <Input
                  id="ended"
                  className="text-center"
                  disabled
                  autoComplete={"off"}
                  type="text"
                  placeholder="NULL"
                  value={ended && format(new Date(ended), "mm-dd HH:mm:ss")}
                  onChange={(e) => setEnded(e.target.value)}
                />
                <Label
                  className="block text-center mt-1 text-sm font-extralight uppercase"
                  htmlFor="created"
                >
                  Call Ended
                </Label>
              </div>
            </div>

            <hr className="col-span-2 mb-4 mx-4" />

            {metaData?.dispatch && (
              <div className="col-span-2 mb-4">
                <Label>Bravo Quick Actions</Label>
                <Button
                  className="text-red-500 border-red-500 block mt-2 h-20 w-full"
                  variant="outline"
                  onClick={() => {
                    setResponseType(metaData.dispatch);
                    setResponseStatus("Dispatched");
                  }}
                >
                  Dispatch {metaData.dispatch}
                </Button>
              </div>
            )}

            <div className="col-span-1">
              <Label>Response Type</Label>
              <Select
                value={responseType}
                onValueChange={setResponseType}
                defaultValue={responseType}
              >
                <SelectTrigger className="py-6">
                  <SelectValue placeholder="Select a response..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(responderTypeMap).map((type) => (
                    <SelectItem value={type} key={type}>
                      <p className="flex items-center gap-2">
                        {responderTypeMap[type as TResponderType]}
                      </p>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1">
              <Label>Response Status</Label>
              <Select
                value={responseStatus}
                onValueChange={setResponseStatus}
                defaultValue={responseStatus}
              >
                <SelectTrigger className="py-6">
                  <SelectValue placeholder="Select response status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">
                    <p className="flex items-center gap-2">Available</p>
                  </SelectItem>
                  <SelectItem value="Dispatched">
                    <p className="flex items-center gap-2">Dispatched</p>
                  </SelectItem>
                  <SelectItem value="OnScene">
                    <p className="flex items-center gap-2">On Scene</p>
                  </SelectItem>
                  <SelectItem value="Returning">
                    <p className="flex items-center gap-2">Returning</p>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label>Case Status</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  className={cn(
                    "p-4 h-32 basis-40 tracking-[2px] uppercase",
                    "border-red-500 text-red-500",
                    status !== "active" && "opacity-50"
                  )}
                  variant="outline"
                  onClick={() => {
                    setStatus("active");
                  }}
                >
                  Active
                </Button>
                <Button
                  className={cn(
                    "p-4 h-32 basis-40 tracking-[2px] uppercase",
                    "border-yellow-500 text-yellow-500",
                    status !== "pending" && "opacity-50"
                  )}
                  variant="outline"
                  onClick={() => {
                    setStatus("pending");
                  }}
                >
                  Pending
                </Button>
                <Button
                  className={cn(
                    "p-4 h-32 basis-40 tracking-[2px] uppercase",
                    "border-green-500 text-green-500",
                    status !== "resolved" && "opacity-50"
                  )}
                  variant="outline"
                  onClick={() => {
                    setStatus("resolved");
                  }}
                >
                  Resolved
                </Button>
                <Button
                  className={cn(
                    "p-4 h-32 basis-40 tracking-[2px] uppercase",
                    "border-gray-500 text-gray-500",
                    status !== "cancelled" && "opacity-50"
                  )}
                  variant="outline"
                  onClick={() => {
                    setStatus("cancelled");
                  }}
                >
                  Cancelled
                </Button>
              </div>
              {/* <Select
                value={status}
                onValueChange={setStatus}
                defaultValue={status}
              >
                <SelectTrigger className="py-6">
                  <SelectValue placeholder="Select case status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">
                    <p className="flex items-center gap-2">Pending</p>
                  </SelectItem>
                  <SelectItem value="active">
                    <p className="flex items-center gap-2">Active</p>
                  </SelectItem>
                  <SelectItem value="resolved">
                    <p className="flex items-center gap-2">Resolved</p>
                  </SelectItem>
                  <SelectItem value="cancelled">
                    <p className="flex items-center gap-2">Cancelled</p>
                  </SelectItem>
                </SelectContent>
              </Select> */}
            </div>

            {editMode && (
              <Button
                onClick={() => {
                  setEditMode(false);
                }}
                className="col-span-1 mt-6"
                variant={"secondary"}
              >
                Cancel
              </Button>
            )}

            <Button
              onClick={() => {
                const newCallLog: TCallLogInsertDB = {
                  id: selectedCallLog?.id,
                  name,
                  phone_number: phone,
                  address,
                  city,
                  location_description: location,
                  description: situation,
                  type: callType || "Other",
                  priority: priority,
                  response_type: responseType,
                  response_status: responseStatus,
                  status: status,
                  latitude: latitude,
                  longitude: longitude,
                };

                console.log(newCallLog);

                putCallLog.mutate(newCallLog);
                setEditMode(false);
                setMetaData(null);
                setCreateMode(false);
                setInCall(false);
              }}
              className={cn("col-span-2 mt-6", editMode && "col-span-1")}
            >
              {editMode ? "Save Changes" : "Create Log"}
            </Button>
          </div>
        </div>
      ) : selectedCallLog ? (
        <div className="p-4 font-light">
          <h3>Call Information</h3>
          <div className="pt-2 grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <Label>Name</Label>
              <p className="py-2 px-4 bg-gray-800 rounded">{name || "NULL"}</p>
            </div>
            <div className="col-span-1">
              <Label>Phone Number</Label>
              <p className="py-2 px-4 bg-gray-800 rounded">{phone || "NULL"}</p>
            </div>
            <div className="col-span-2">
              <Label>Address</Label>
              <p className="py-2 px-4 bg-gray-800 rounded">
                {address || "NULL"}
              </p>
            </div>
            {/* <div className="col-span-1">
              <Label>City</Label>
              <p className="py-2 px-4 bg-gray-800 rounded">{city || "NULL"}</p>
            </div>
            <div className="col-span-2">
              <Label>Location Description</Label>
              <p className="py-2 px-4 bg-gray-800 rounded">
                {location || "NULL"}
              </p>
            </div> */}
            <div className="col-span-2 mb-6">
              <Label>Situation Details</Label>
              <p className="py-2 px-4 bg-gray-800 rounded">
                {situation || "NULL"}
              </p>
            </div>

            <hr className="col-span-2 mb-6 mx-4" />

            <div className="col-span-1">
              <Label>Case Type</Label>
              <p className="py-2 px-4 bg-gray-800 rounded flex items-center gap-2">
                {callType ? (
                  <>
                    {" "}
                    {typeMap[callType as TCallType]}{" "}
                    {callTypeMap[callType as TCallType]}
                  </>
                ) : (
                  "No case type selected."
                )}
              </p>
            </div>

            <div className="col-span-1">
              <Label>Priority</Label>
              <p className="py-2 px-4 bg-gray-800 flex gap-2 items-center capitalize rounded">
                {priority ? (
                  <>
                    <TriangleAlert
                      className={cn(
                        "w-6 h-6",
                        priority === "low" && "text-green-500",
                        priority === "medium" && "text-yellow-500",
                        priority === "high" && "text-red-500"
                      )}
                    />
                    {priority}
                  </>
                ) : (
                  "No priority selected."
                )}
              </p>
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-4 mb-6">
              <div className="col-span-1">
                <p className="text-center py-2 px-4 bg-gray-800 rounded">
                  {created
                    ? format(new Date(created), "MM-dd HH:mm:ss")
                    : "NULL"}
                </p>
                <Label className="block text-center mt-1 text-sm font-extralight uppercase">
                  Call Started
                </Label>
              </div>
              <div className="col-span-1">
                <p className="text-center py-2 px-4 bg-gray-800 rounded">
                  {dispatched
                    ? format(new Date(dispatched), "MM-dd HH:mm:ss")
                    : "NULL"}
                </p>
                <Label className="block text-center mt-1 text-sm font-extralight uppercase">
                  Dispatched
                </Label>
              </div>
              <div className="col-span-1">
                <p className="text-center py-2 px-4 bg-gray-800 rounded">
                  {ended ? format(new Date(ended), "MM-dd HH:mm:ss") : "NULL"}
                </p>
                <Label className="block text-center mt-1 text-sm font-extralight uppercase">
                  Call Ended
                </Label>
              </div>
            </div>

            <hr className="col-span-2 mb-6 mx-4" />

            <div className="col-span-1">
              <Label>Response Type</Label>
              <p className="py-2 px-4 bg-gray-800 rounded">
                {responseType
                  ? responderTypeMap[responseType as TResponderType]
                  : "No Response"}
              </p>
            </div>
            <div className="col-span-1">
              <Label>Response Status</Label>
              <p className="py-2 px-4 bg-gray-800 rounded">
                {responseStatus
                  ? responderStatusMap[responseStatus as TResponderStatus]
                  : "No Response"}
              </p>
            </div>

            <div className="col-span-2">
              <Label>Case Status</Label>
              <p
                className={cn(
                  "py-2 px-4 border text-center uppercase tracking-[2px] rounded mt-2",
                  status === "pending" && "border-yellow-500 text-yellow-500",
                  status === "active" && "border-red-500 text-red-500",
                  status === "resolved" && "border-green-500 text-green-500",
                  status === "cancelled" && "border-gray-500 text-gray-500"
                )}
              >
                {status || "No status"}
              </p>
            </div>
            <Button
              onClick={() => setEditMode(true)}
              className="col-span-2 mt-6"
            >
              Edit Log
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4 font-light grid place-content-center h-full">
          No call selected.
        </div>
      )}
    </Window>
  );
}

// name || phone
// address || city
// location description
// situation details
// call type || call priority
// timeline

// response type || response status
