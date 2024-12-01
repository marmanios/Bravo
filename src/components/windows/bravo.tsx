"use client";

import { useState } from "react";
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
  TCallType,
  TResponderType,
  callTypeMap,
  responderTypeMap,
} from "@/utils/types";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/utils";

type props = {
  loading: "initialize" | "fetching" | "completed";
};

export default function Bravo({ loading }: props) {
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

  return (
    <Window
      className="col-span-2 row-span-3"
      title="Bravo"
      shield
      loadingOffset={1400}
      loading={loading}
    >
      <div className="p-4 font-light">
        <h3>Call Information</h3>
        <div className="pt-2 grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              autoComplete={"off"}
              type="text"
              placeholder="John Doe..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="name">Phone Number</Label>
            <Input
              id="phone-number"
              autoComplete={"off"}
              type="number"
              placeholder="+123-456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="name">Address</Label>
            <Input
              id="address"
              autoComplete={"off"}
              type="text"
              placeholder="1234 Elm St..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="name">City</Label>
            <Input
              id="city"
              autoComplete={"off"}
              type="text"
              placeholder="Springfield..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="name">Location Description</Label>
            <Textarea
              id="location-description"
              className="h-32"
              autoComplete={"off"}
              placeholder="The house with the red door..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="col-span-2 mb-6">
            <Label htmlFor="name">Situation Details</Label>
            <Textarea
              id="situation-details"
              className="h-32"
              autoComplete={"off"}
              placeholder="Person running away from the scene..."
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
            />
          </div>

          <hr className="col-span-2 mb-6 mx-4" />

          <div className="col-span-1">
            <Label>Case Type</Label>
            <Select onValueChange={setCallType} defaultValue={callType}>
              <SelectTrigger className="py-6">
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
          </div>

          <div className="col-span-1">
            <Label>Priority</Label>
            <Select onValueChange={setPriority} defaultValue={priority}>
              <SelectTrigger className="py-6">
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
                <SelectItem value="High">
                  <p className="flex items-center gap-2">
                    <TriangleAlert className={cn("w-6 h-6", "text-red-500")} />
                    High
                  </p>
                </SelectItem>
              </SelectContent>
            </Select>
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
                value={created}
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
                value={dispatched}
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
                value={ended}
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

          <hr className="col-span-2 mb-6 mx-4" />

          <div className="col-span-1">
            <Label>Response Type</Label>
            <Select onValueChange={setResponseType} defaultValue={responseType}>
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
                <SelectItem value="onScene">
                  <p className="flex items-center gap-2">On Scene</p>
                </SelectItem>
                <SelectItem value="Returning">
                  <p className="flex items-center gap-2">Returning</p>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
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
