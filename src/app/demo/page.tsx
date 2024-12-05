import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronsRight } from "lucide-react";
import Link from "next/link";

export default function DemoStartPage() {
  return (
    <div className="grid place-content-center min-h-screen text-center">
      <div className="mb-32 mt-40">
        <h1 className="text-[112px] font-thin tracking-[16px] -mb-10">BRAVO</h1>
        <h2 className="text-slate-500 font-thin text-[62px]">
          Rapid Responses Refined
        </h2>
        <div className="mt-20 text-xl space-y-2">
          <p className="text-2xl font-bold">HackWestern 11</p>
          <p className="mt-2">🥇 First Place Overal</p>
          <p>🏆 Best AI Application Built with Cloudflare</p>
        </div>

        <div className="cursor-pointer">
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
      <h3 className="text-slate-500 text-[18px] mt-40">
        Made with ☕️ by Zayn, Maged, Jinal, and Jane
      </h3>
    </div>
  );
}
