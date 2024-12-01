import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronsRight } from "lucide-react";
import Link from "next/link";

export default function DemoStartPage() {
  return (
    <div className="grid place-content-center min-h-screen text-center">
      <div className="mb-32">
        <h1 className="text-[112px] font-thin tracking-[16px] -mb-10">BRAVO</h1>
        <h2 className="text-border font-thin text-[62px]">
          Rapid Responses Refined
        </h2>
        <h3 className="text-muted text-[18px]">Made with ☕️ by Macs Win</h3>

        <div className="cursor-pointer animate-demo">
          <Link href="/">
            <Button
              size="lg"
              variant="outline"
              className="mt-20 text-lg py-6 font-light"
            >
              Proceed to Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
