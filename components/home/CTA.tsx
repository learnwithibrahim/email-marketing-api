import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/testmo1.jpg')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative container mx-auto px-4 md:px-8 py-24 md:py-32">
        <div className="max-w-4xl text-white">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            Ready to scale your outreach?
          </h2>

          <p className="text-xl text-neutral-300 mb-12 max-w-2xl">
            Stop struggling with consumer-grade tools. Upgrade to a platform
            built for professional lead generation and campaign management.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link href="/register">
              <Button
                size="lg"
                className="h-16 px-10 rounded-none text-lg font-bold bg-white text-black hover:bg-neutral-200"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="h-16 px-10 rounded-none text-lg font-bold border-2 border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                Contact Sales
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-neutral-400 font-mono">
            // NO CREDIT CARD REQUIRED FOR SANDBOX ENVIRONMENT
          </p>
        </div>
      </div>
    </section>
  );
}
