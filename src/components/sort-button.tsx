"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownUp } from "lucide-react";

type props = {
  options: { name: string; value: string }[];
  sort: string;
  setSort: (sort: string) => void;
};

export function SortButton({ options, sort, setSort }: props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ArrowDownUp
          strokeWidth={0.7}
          size={18}
          className="ml-1.5 cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={sort}
          onValueChange={(value) => {
            setSort(value);
          }}
        >
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
