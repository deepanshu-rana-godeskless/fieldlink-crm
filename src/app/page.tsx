"use client";

import React, { forwardRef, useRef } from "react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Highlighter } from "@/components/ui/highlighter";
import { useRouter } from "next/navigation";
import { useLocale } from "@/context/locale-context";
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { Confetti } from "@/components/magicui/confetti";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import { AnimatedList } from "@/components/ui/animated-list";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Calendar } from "@/components/ui/calendar";
import WorldMap from "@/components/ui/world-map";
import { Iphone15Pro } from "@/components/ui/iphone-15-pro"; // New import for iPhone mockup
import { PulsatingButton } from "@/components/magicui/pulsating-button";


// --------------------------
// Files Demo
// --------------------------
const files = [
  { name: "HVAC_System_Service", body: "HVAC System Repair - Routine Maintenance Required" },
  { name: "Plumbing_Emergency_Fix", body: "Plumbing Leak Fix - Immediate Action Required" },
  { name: "Electrical_Outage_Response", body: "Electrical Outage Response - Power Restoration" },
  { name: "Elevator_Maintenance", body: "Elevator Maintenance - Safety Inspection Needed" },
  { name: "Security_System_Check", body: "Security System Check - Alarm Malfunction" },
  { name: "AC_Unit_Tuneup", body: "AC Unit Tuneup - Performance Optimization" },
];

// --------------------------
// Notifications Demo
// --------------------------
const notifications = Array.from({ length: 10 }, () => [
  {
    name: "New Ticket Assigned",
    description: "Ticket #TICK-010 assigned to Agent John",
    time: "15m ago",
    icon: "🔔",
    color: "#1E86FF",
  },
  {
    name: "Ticket Resolved",
    description: "Ticket #TICK-011 closed by Agent Sarah",
    time: "10m ago",
    icon: "✅",
    color: "#00C9A7",
  },
  {
    name: "Escalation Alert",
    description: "Ticket #TICK-012 escalated to supervisor",
    time: "5m ago",
    icon: "⚠️",
    color: "#FF3D71",
  },
  {
    name: "Work Order Scheduled",
    description: "Work order for 04:30 PM IST today scheduled",
    time: "2m ago",
    icon: "📅",
    color: "#FFB800",
  },
]).flat();

const Notification = ({ name, description, icon, color, time }: any) => (
  <figure
    className={cn(
      "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
      "transition-all duration-200 ease-in-out hover:scale-[103%]",
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
    )}
  >
    <div className="flex flex-row items-center gap-3">
      <div
        className="flex size-10 items-center justify-center rounded-2xl"
        style={{ backgroundColor: color }}
      >
        <span className="text-lg">{icon}</span>
      </div>
      <div className="flex flex-col overflow-hidden">
        <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
          <span className="text-sm sm:text-lg">{name}</span>
          <span className="mx-1">·</span>
          <span className="text-xs text-gray-500">{time}</span>
        </figcaption>
        <p className="text-sm font-normal dark:text-white/60">{description}</p>
      </div>
    </div>
  </figure>
);

// --------------------------
// Circle + AnimatedBeamDemo
// --------------------------
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 flex size-14 items-center justify-center rounded-full border-2 bg-white shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
      className
    )}
  >
    {children}
  </div>
));
Circle.displayName = "Circle";

const Icons = {
  freshservice: () => <img src="/icons/freshservice.svg" alt="Freshservice" className="w-10 h-10" />,
  zendesk: () => <img src="/icons/zendesk.svg" alt="Zendesk" className="w-10 h-10" />,
  servicenow: () => <img src="/icons/servicenow.svg" alt="SN" className="w-10 h-10" />,
  godeskless: () => <img src="/icons/gd.svg" alt="GD" className="w-10 h-10" />,
  salesforce: () => <img src="/icons/salesforce.svg" alt="SF" className="w-12 h-12" />,
};

function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[200px] w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[140px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <Icons.freshservice />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.servicenow />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <Icons.zendesk />
          </Circle>
          <Circle ref={div4Ref} className="size-16">
            <Icons.godeskless />
          </Circle>
          <Circle ref={div6Ref}>
            <Icons.salesforce />
          </Circle>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div4Ref} curvature={-75} endYOffset={-10} />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div4Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div4Ref} curvature={75} endYOffset={10} />
      <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={div4Ref} curvature={-75} endYOffset={-10} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div4Ref} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={div7Ref} toRef={div4Ref} curvature={75} endYOffset={10} reverse />
    </div>
  );
}

// --------------------------
// Features for BentoGrid
// --------------------------
const features = [
  {
    Icon: FileTextIcon,
    name: "Track Tickets",
    description: "Automatically sync and save ticket details as you create them.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee pauseOnHover className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">{f.name}</figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Ticket Alerts",
    description: "Get notified on ticket updates and escalations.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute right-2 top-4 h-[500px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90">
        <AnimatedList>
          {notifications.map((item, idx) => (
            <Notification {...item} key={idx} />
          ))}
        </AnimatedList>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      </div>
    ),
  },
  {
    Icon: Share2Icon,
    name: "FSM Integrations",
    description: "Supports major FSM CRM integrations.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: <AnimatedBeamDemo />,
  },
  {
    Icon: CalendarIcon,
    name: "Schedule Visits",
    description: "Plan and Schedule work orders for field agents with ease.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top scale-75 rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-90"
      />
    ),
  },
];

// --------------------------
// BentoDemo wrapper
// --------------------------
function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}

// --------------------------
// Globe Section
// --------------------------
const GlobalCoverageSection = () => {
  // WorldMap connections (lat/lng pairs)
  const dots = [
    {
      start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
      end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    },
    {
      start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
      end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
    },
    {
      start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
      end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
    },
    {
      start: { lat: 51.5074, lng: -0.1278 }, // London
      end: { lat: 28.6139, lng: 77.209 }, // New Delhi
    },
    {
      start: { lat: 28.6139, lng: 77.209 }, // New Delhi
      end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
    },
    {
      start: { lat: 28.6139, lng: 77.209 }, // New Delhi
      end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
    },
  ];

  return (
    <section className="relative w-full py-16 bg-gradient-to-b from-background to-muted/50 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {/* Optional background pattern for cohesion */}
      </div>

      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Empowering Global Field Teams
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          FieldLink connects agents and customers worldwide—track tickets, schedule visits, and resolve issues seamlessly across borders.
        </p>

        <div className="relative mx-auto max-w-full h-[500px] md:h-[600px] mb-8">
          <WorldMap dots={dots} lineColor="#0ea5e9" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-3xl font-bold text-primary">
              <NumberTicker value={10} />K+
            </h3>
            <p className="text-muted-foreground">Tickets Globally</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary">
              <NumberTicker value={500} />+
            </h3>
            <p className="text-muted-foreground">Agents Connected</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary">
              <NumberTicker value={99} />%
            </h3>
            <p className="text-muted-foreground">On-Time Visits</p>
          </div>
        </div>

        <InteractiveHoverButton
          className="mt-2"
          onClick={() => window.open("https://godeskless.com/product/features/", "_blank")}
        >
          Discover Our Products
        </InteractiveHoverButton>
      </div>
    </section>
  );
};

// --------------------------
// New: Mobile Ecosystem Section
// --------------------------
const MobileEcosystemSection = () => {
  const router = useRouter();

  return (
    <section className="relative w-full py-16 bg-gradient-to-b from-background to-muted/50 overflow-hidden">
      {/* Subtle pattern for cohesion with globe */}
      <DotPattern className="absolute inset-0 opacity-5" />

      <div className="container mx-auto px-4 text-center">
        {/* Headline & Story Hook */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <AuroraText className="font-extrabold">FieldLink for Dispatchers.</AuroraText> TrackHelp Pro for Agents.
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed p-4">
            Imagine dispatchers orchestrating from FieldLink's command center—tickets assigned in seconds, calendars synced globally. Meanwhile, agents on TrackHelp Pro navigate with precision: live routes, inventory checks, and instant updates.{' '}
            <Highlighter action="underline" color="#FC157E">
              Two sides. One unbreakable ecosystem.
            </Highlighter>
            <Highlighter action="underline" color="#1AE4F2"> <strong>FieldLink: Dispatcher's Core</strong> | <strong>TrackHelp Pro: Agent's Edge</strong>.</Highlighter>
          </p>
        </div>

        {/* Visual: iPhone Mockup with TrackHelp Pro Screenshot */}
        <div className="relative mx-auto mb-12">
          <div className="w-[300px] md:w-[350px] mx-auto shadow-2xl rounded-9xl overflow-hidden" style={{ aspectRatio: '433/882' }}>
            <Iphone15Pro
              src="/assets/trackhelp.png" // Replace with your actual screenshot path (e.g., agent dashboard view)
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15))' }} // Premium glow/shadow
            />
          </div>
          {/* Overlay Label for Context */}
          <div className="absolute -top-13 left-1/2 transform -translate-x-1/2 bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg mb-4">
            <Smartphone className="w-4 h-4 inline mr-2" />
            TrackHelp Pro: Agent's Command Post
          </div>
        </div>

        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">
              <NumberTicker value={40} />%
            </h3>
            <p className="text-muted-foreground">Faster Dispatches</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">
              <NumberTicker value={99} />%
            </h3>
            <p className="text-muted-foreground">On-Time Visits</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">
              <NumberTicker value={2} />x
            </h3>
            <p className="text-muted-foreground">Customer Retention</p>
          </div>
        </div>

        {/* CTA: Drive Action */}
        <InteractiveHoverButton
          className="text-lg px-8 py-4" // Larger for emphasis
          onClick={() => window.open("https://play.google.com/store/apps/details?id=com.godeskless.trackhelppro&hl=en_IN", "_blank")}
        >
          Explore TrackHelp Pro
        </InteractiveHoverButton>
      </div>
    </section>
  );
};

// --------------------------
// Main Welcome Component
// --------------------------
export default function Welcome() {
  const router = useRouter();
  const { t, setLang } = useLocale();

  React.useEffect(() => {
    setLang("en");
  }, [setLang]);

  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground overflow-hidden">
        <DotPattern className="[mask-image:radial-gradient(880px_circle_at_center,white,transparent)]" />
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
            <span
              className={cn(
                "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
              )}
              style={{
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "subtract",
                WebkitClipPath: "padding-box",
              }}
            />
            <span className="relative z-10 flex items-center">
              <span className="mr-2 text-xl">📣</span>
              <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
              <AnimatedGradientText className="text-sm font-medium">
                FieldLink by GoDeskless
              </AnimatedGradientText>
              <ChevronRight
                className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center w-full pt-2 pb-4">
          <Confetti />
          <span className="text-5xl font-extrabold tracking-tight text-foreground mt-0 mb-1">
            Introducing <AuroraText className="font-extrabold">FieldLink by GoDeskless</AuroraText>
          </span>
          <span className="text-lg font-medium text-muted-foreground mb-8">
            <Highlighter action="underline" color="#2C2B83">
              Your modern CRM{' '}
            </Highlighter>
            {' '}for field teams,{' '}
            <Highlighter action="underline" color="#8EF822">
              powered by GoDeskless
            </Highlighter>
          </span>
        </div>
        <InteractiveHoverButton className="mt-2" onClick={() => router.push("/login")}>
          {t("welcome.button") === "welcome.button" ? "Experience FieldLink Now" : t("welcome.button")}
        </InteractiveHoverButton>
      </div>
      <div>
        <div className="w-full max-w-6xl mx-auto mt-10 px-4 mb-12">
          <BentoDemo />
        </div>
      </div>
      <div>
        <GlobalCoverageSection />
      </div>
      <div>
        <MobileEcosystemSection />
      </div>

      {/* Magic UI Footer */}
      <footer className="w-full bg-white border border-gray-200 rounded-2xl mt-16 mb-4">
        <div className="w-full px-6 lg:px-16 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <h2 className="text-4xl font-bold mb-4 md:mb-0">Still have questions?</h2>
            <div className="flex gap-4 flex-nowrap">
              <InteractiveHoverButton
                className="px-8 py-4 text-lg font-semibold flex flex-row items-center gap-2 min-w-fit whitespace-nowrap"
                onClick={() => window.open("https://godeskless.com/", "_blank")}
              >
                <span className="whitespace-nowrap flex flex-row items-center gap-2">
                  Let's Chat
                </span>
              </InteractiveHoverButton>
              <PulsatingButton
                className="px-8 py-4 text-lg font-semibold flex flex-row items-center gap-2 min-w-fit whitespace-nowrap"
                pulseColor="30,134,255"
                duration="1.5s"
                onClick={() => window.open("https://godeskless.com/book-a-demo/", "_blank")}
              >
                Request Demo
              </PulsatingButton>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <img src="/icons/gd.svg" alt="Magic UI" className="w-12 h-12 rounded-full" />
            <div>
              <div className="text-xl font-bold">GoDeskless Inc.</div>
              <div className="text-base text-gray-700">AI-Powered Field Service Management</div>
              <div className="text-sm text-gray-400 mt-2">All rights reserved.</div>
            </div>
          </div>
          <div className="flex w-full justify-end pr-2 lg:pr-8 xl:pr-16">
            <div className="grid grid-cols-3 gap-8 text-lg">
              {/* Product Column */}
              <div className="flex flex-col gap-3">
                <a href="https://godeskless.com/product/" target="_blank" rel="noopener noreferrer" className="font-bold mb-2 hover:underline">Product</a>
                <a href="https://godeskless.com/product/#smartagent" target="_blank" rel="noopener noreferrer" className="hover:underline">SmartAgent Console</a>
                <a href="https://godeskless.com/product/#trackhelp" target="_blank" rel="noopener noreferrer" className="hover:underline">TrackHelp Pro App</a>
                <a href="https://godeskless.com/product/#onecloud" target="_blank" rel="noopener noreferrer" className="hover:underline">GoDeskless OneCloud</a>
                <a href="https://godeskless.com/product/#connector" target="_blank" rel="noopener noreferrer" className="hover:underline">CRM Connectors</a>
                <a href="https://godeskless.com/pricing/" target="_blank" rel="noopener noreferrer" className="hover:underline">Pricing</a>
                <a href="https://godeskless.com/lp/interactive-demo/" target="_blank" rel="noopener noreferrer" className="hover:underline">Interactive Demo</a>
              </div>
              {/* Roles Column */}
              <div className="flex flex-col gap-3">
                <a href="https://godeskless.com/roles/" target="_blank" rel="noopener noreferrer" className="font-bold mb-2 hover:underline">Roles</a>
                <a href="https://godeskless.com/roles/#schedulers" target="_blank" rel="noopener noreferrer" className="hover:underline">Customer Service Agents & Schedulers</a>
                <a href="https://godeskless.com/roles/#fieldtech" target="_blank" rel="noopener noreferrer" className="hover:underline">Field Technicians</a>
                <a href="https://godeskless.com/roles/#teamleads" target="_blank" rel="noopener noreferrer" className="hover:underline">Team Leaders</a>
              </div>
              {/* About Us Column */}
              <div className="flex flex-col gap-3">
                <a href="https://godeskless.com/company/" target="_blank" rel="noopener noreferrer" className="font-bold mb-2 hover:underline">About Us</a>
                <a href="https://godeskless.com/company/#our-team" target="_blank" rel="noopener noreferrer" className="hover:underline">Our Team</a>
                <a href="https://godeskless.com/resource-center/" target="_blank" rel="noopener noreferrer" className="hover:underline">Resource Center</a>
                <a href="https://godeskless.com/blog/" target="_blank" rel="noopener noreferrer" className="hover:underline">Blog</a>
              </div>
            </div>
          </div>
        </div>
      </footer >
    </>
  );
}