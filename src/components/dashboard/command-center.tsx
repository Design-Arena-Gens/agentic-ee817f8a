"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  Brain,
  Clock,
  Cpu,
  Gauge,
  LineChart,
  PlugZap,
  ServerCog,
  Shield,
  ListChecks,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  endpoints,
  integrations,
  knowledgeBase,
  performanceTrend,
  tickets,
  vulnerabilities,
  workflows,
} from "@/lib/mock-data";
import { getEndpointHealth, getTicketSummary, getTierDistribution, getVulnerabilityDistribution } from "@/lib/metrics";
import { cn } from "@/lib/utils";

const statusAccent: Record<string, string> = {
  New: "bg-sky-500/20 text-sky-200 border-sky-400/40",
  "In Progress": "bg-amber-500/20 text-amber-200 border-amber-400/40",
  Waiting: "bg-violet-500/20 text-violet-200 border-violet-400/40",
  Resolved: "bg-emerald-500/20 text-emerald-200 border-emerald-400/40",
  Escalated: "bg-rose-500/20 text-rose-200 border-rose-400/40",
};

const severityAccent: Record<string, string> = {
  Critical: "border-rose-400/60 bg-rose-500/10 text-rose-200",
  High: "border-amber-400/60 bg-amber-500/10 text-amber-100",
  Medium: "border-sky-400/60 bg-sky-500/10 text-sky-100",
  Low: "border-emerald-400/60 bg-emerald-500/10 text-emerald-100",
};

const platformAccent: Record<string, string> = {
  "Windows 11": "bg-blue-500/10 text-blue-100 border-blue-400/40",
  "Windows 10": "bg-blue-500/10 text-blue-100 border-blue-400/40",
  "macOS 14": "bg-slate-500/10 text-slate-100 border-slate-400/40",
  "macOS 13": "bg-slate-500/10 text-slate-100 border-slate-400/40",
  iOS: "bg-emerald-500/10 text-emerald-100 border-emerald-400/40",
  Android: "bg-emerald-500/10 text-emerald-100 border-emerald-400/40",
  Network: "bg-indigo-500/10 text-indigo-100 border-indigo-400/40",
};

const TierToggle = ({
  active,
  onChange,
}: {
  active: string;
  onChange: (value: string) => void;
}) => {
  const options = ["All", "Tier 1", "Tier 2"];
  return (
    <div className="inline-flex items-center rounded-full border border-slate-600/60 bg-slate-900/60 p-1 text-sm xl:text-base">
      {options.map((option) => {
        const isActive = active === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full px-4 py-1.5 font-medium transition",
              isActive
                ? "bg-cyan-400/20 text-cyan-100 shadow-[0_10px_20px_rgba(34,211,238,0.18)]"
                : "text-slate-400 hover:text-slate-200",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

const statusOptions = ["All", "New", "In Progress", "Waiting", "Escalated", "Resolved"];

const StatusPill = ({ label }: { label: string }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
      statusAccent[label] ?? "border-slate-500/40 bg-slate-500/10 text-slate-200",
    )}
  >
    <span className="size-1.5 rounded-full bg-current" />
    {label}
  </span>
);

const SparkBar = ({ value }: { value: number }) => (
  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800/80">
    <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500" style={{ width: `${value}%` }} />
  </div>
);

export const CommandCenter = () => {
  const [tierView, setTierView] = useState("All");
  const [statusView, setStatusView] = useState("All");

  const ticketSummary = useMemo(() => getTicketSummary(tickets), []);
  const tierDistribution = useMemo(() => getTierDistribution(tickets), []);
  const vulnerabilitySummary = useMemo(() => getVulnerabilityDistribution(vulnerabilities), []);
  const endpointSummary = useMemo(() => getEndpointHealth(endpoints), []);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const tierMatch =
        tierView === "All" ||
        (tierView === "Tier 1" && ticket.tier === 1) ||
        (tierView === "Tier 2" && ticket.tier === 2);

      const statusMatch = statusView === "All" || ticket.status === statusView;

      return tierMatch && statusMatch;
    });
  }, [tierView, statusView]);

  return (
    <div className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col gap-8 px-6 pb-20 pt-10 xl:px-12">
      <div className="grid-dot-overlay pointer-events-none absolute inset-0 -z-10" />
      <div className="absolute inset-x-32 top-0 -z-10 h-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <header className="flex flex-col gap-6 rounded-[36px] border border-white/10 bg-slate-900/70 p-8 shadow-[0_45px_100px_rgba(6,20,50,0.35)] xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-100">
            <Brain className="size-4" />
            Autonomous IT Runbook Active
          </div>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl xl:text-5xl">
            AI-Powered Vulnerability Management & Technical Support Assistant
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-300">
            Centralize Level 1 & Level 2 response, align enterprise onboarding automation, and keep every endpoint compliant
            with intelligent insights from ServiceNow, Jira, and Freshservice in real-time.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-600/60 px-3 py-1.5">
              <Shield className="size-4 text-emerald-300" />
              {vulnerabilitySummary.totalAssets} exposed assets tracked
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-600/60 px-3 py-1.5">
              <Cpu className="size-4 text-sky-300" />
              {endpointSummary.total} endpoints monitored
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-600/60 px-3 py-1.5">
              <PlugZap className="size-4 text-cyan-300" />
              Integrations healthy · {integrations.filter((x) => x.status === "Operational").length}/3 operational
            </span>
          </div>
        </div>
        <Card className="w-full max-w-sm space-y-6 border-cyan-400/30 bg-gradient-to-br from-slate-900/70 via-slate-900/30 to-slate-900/80">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">Live Command Summary</p>
            <LineChart className="size-5 text-cyan-300" />
          </div>
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-3xl font-semibold text-white">{ticketSummary.open}</p>
                <p className="text-sm text-slate-400">Active incidents tracked within SLA</p>
              </div>
              <StatusPill label={`${ticketSummary.slaBreaches} SLA alerts`} />
            </div>
            <SparkBar value={Math.min(100, Math.round((ticketSummary.resolved / (ticketSummary.total || 1)) * 100))} />
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="space-y-1 rounded-2xl border border-slate-700/50 bg-slate-900/40 p-3">
                <span className="text-xs uppercase tracking-wide text-slate-500">Tier Distribution</span>
                <p className="text-lg font-semibold text-white">{tierDistribution.tier1Pct}% Tier 1</p>
                <SparkBar value={tierDistribution.tier1Pct} />
              </div>
              <div className="space-y-1 rounded-2xl border border-slate-700/50 bg-slate-900/40 p-3">
                <span className="text-xs uppercase tracking-wide text-slate-500">Critical Focus</span>
                <p className="text-lg font-semibold text-white">{ticketSummary.critical} P1 tickets</p>
                <SparkBar value={Math.min(100, ticketSummary.critical * 25)} />
              </div>
            </div>
          </div>
        </Card>
      </header>

      <section className="grid gap-6 xl:grid-cols-[2fr_1.2fr]">
        <Card className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Real-Time Support Operations</h2>
              <p className="text-sm text-slate-400">
                Level 1 and Level 2 incidents synchronized with ServiceNow, Jira, and Freshservice queues.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <TierToggle active={tierView} onChange={setTierView} />
              <select
                value={statusView}
                onChange={(event) => setStatusView(event.target.value)}
                className="rounded-full border border-slate-700/60 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 outline-none focus:border-cyan-400/60"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "All" ? "All Statuses" : option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="group rounded-3xl border border-slate-700/50 bg-slate-900/40 p-5 transition hover:border-cyan-400/50 hover:bg-slate-900/70"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-semibold text-slate-200">{ticket.id}</span>
                      <StatusPill label={ticket.status} />
                      <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase", severityAccent[ticket.priority === "P1" ? "Critical" : ticket.priority === "P2" ? "High" : ticket.priority === "P3" ? "Medium" : "Low"])}>
                        {ticket.priority}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
                          platformAccent[ticket.platform] ?? "border-slate-600/60 bg-slate-800/70 text-slate-200",
                        )}
                      >
                        {ticket.platform}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-600/60 px-3 py-1 text-xs text-slate-300">
                        <PlugZap className="size-3" />
                        {ticket.integration}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">{ticket.title}</h3>
                      <p className="text-sm text-slate-300">{ticket.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-2">
                        <BadgeCheck className="size-4 text-cyan-300" />
                        Tier {ticket.tier} ownership
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock className="size-4 text-amber-300" />
                        Updated {new Date(ticket.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <ServerCog className="size-4 text-slate-300" />
                        {ticket.device}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Brain className="size-4 text-emerald-300" />
                        {ticket.category} · Auto-triaged
                      </span>
                    </div>
                  </div>

                  <div className="flex min-w-[220px] flex-col gap-3 rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 text-sm text-slate-300">
                    <p className="text-xs uppercase tracking-wide text-slate-500">AI Suggested Actions</p>
                    <ul className="space-y-2 font-medium text-slate-200">
                      {ticket.category === "Security" && (
                        <>
                          <li>• Validate containment state via Intune / Jamf</li>
                          <li>• Confirm user identity with adaptive MFA challenge</li>
                          <li>• Escalate IOC set to Tier 3 if repeated</li>
                        </>
                      )}
                      {ticket.category === "Networking" && (
                        <>
                          <li>• Push VPN mesh profile with split-tunnel fix</li>
                          <li>• Gather `netsh trace` logs from endpoint</li>
                          <li>• Offer hotspot data stipend if persists</li>
                        </>
                      )}
                      {ticket.category === "Access" && (
                        <>
                          <li>• Validate request against least-privilege policy</li>
                          <li>• Auto-create Jira change for elevated scopes</li>
                          <li>• Trigger synchronous approval in ServiceNow</li>
                        </>
                      )}
                      {ticket.category === "Hardware" && (
                        <>
                          <li>• Restart print spooler via Intune PowerShell</li>
                          <li>• Notify facilities of on-site verification</li>
                          <li>• Post-mortem: confirm driver rollback success</li>
                        </>
                      )}
                      {ticket.category === "Software" && (
                        <>
                          <li>• Push configuration baseline via Intune</li>
                          <li>• Capture telemetry from affected endpoints</li>
                          <li>• Verify license sync with SaaS provider</li>
                        </>
                      )}
                    </ul>
                    <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:opacity-90">
                      Escalate with full ITSM log
                      <ArrowUpRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Critical Vulnerability Response</h2>
                <p className="text-sm text-slate-400">Prioritized exposures across Windows, macOS, and network infrastructure.</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold text-white">{vulnerabilitySummary.overallProgress}%</p>
                <p className="text-xs uppercase tracking-wide text-slate-500">Risk reduction pace</p>
              </div>
            </div>

            <div className="space-y-4">
              {vulnerabilities.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-2xl border px-4 py-4 transition hover:border-cyan-400/50 hover:bg-slate-900/60",
                    severityAccent[item.severity],
                  )}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-slate-200">{item.id}</p>
                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/60 px-3 py-1 text-xs text-slate-100">
                        <Shield className="size-4" />
                        {item.cve}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
                      <span className="inline-flex items-center gap-2">
                        <AlertTriangle className="size-4 text-amber-200" />
                        {item.severity} severity · {item.affectedAssets} assets
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Cpu className="size-4 text-sky-200" />
                        Owned by {item.owner}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock className="size-4 text-emerald-200" />
                        ETA {item.remediationEta}
                      </span>
                    </div>
                    <SparkBar value={item.progress} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-4 border-emerald-400/30">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Endpoint Health Snapshot</h2>
                <p className="text-sm text-slate-400">Unified telemetry across desktop, mobile, and network devices.</p>
              </div>
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-100">
                {endpointSummary.complianceScore}% patch compliance
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-3 text-center text-sm text-slate-300">
                <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-4">
                  <p className="text-2xl font-semibold text-emerald-200">{endpointSummary.healthy}</p>
                  <p className="uppercase tracking-wide text-[11px] text-slate-500">Healthy</p>
                </div>
                <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-4">
                  <p className="text-2xl font-semibold text-amber-200">{endpointSummary.warning}</p>
                  <p className="uppercase tracking-wide text-[11px] text-slate-500">Warning</p>
                </div>
                <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-4">
                  <p className="text-2xl font-semibold text-rose-200">{endpointSummary.offline}</p>
                  <p className="uppercase tracking-wide text-[11px] text-slate-500">Offline</p>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-slate-200">
                {endpoints.map((endpoint) => (
                  <li
                    key={endpoint.id}
                    className="flex flex-col gap-2 rounded-2xl border border-slate-700/50 bg-slate-900/50 px-4 py-3 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">
                        {endpoint.id} · {endpoint.owner}
                      </p>
                      <p className="text-xs text-slate-400">
                        {endpoint.type} · {endpoint.platform} · {endpoint.location}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-600/50 px-3 py-1">
                        <Gauge className="size-3 text-cyan-300" />
                        {endpoint.patchLevel}% patched
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-600/50 px-3 py-1">
                        <Shield className="size-3 text-emerald-300" />
                        {endpoint.vulnerabilities} open vulns
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-600/50 px-3 py-1">
                        <Clock className="size-3 text-amber-300" />
                        Seen {endpoint.lastSeen}
                      </span>
                      {!endpoint.encryption && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-rose-400/40 bg-rose-500/10 px-3 py-1 text-rose-100">
                          <AlertTriangle className="size-3" />
                          Encryption pending
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="space-y-6 border-indigo-400/30">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Automation & Lifecycle Runbooks</h2>
              <p className="text-sm text-slate-400">AI-curated flows keep onboarding, offboarding, and access reviews predictable and fast.</p>
            </div>
            <button className="rounded-full border border-indigo-400/50 bg-indigo-500/20 px-4 py-1.5 text-xs font-semibold text-indigo-100 transition hover:bg-indigo-500/30">
              Launch Workflow
            </button>
          </div>

          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="rounded-3xl border border-indigo-400/20 bg-slate-900/50 p-5 transition hover:border-indigo-300/60 hover:bg-slate-900/70"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-300">{workflow.type}</p>
                    <h3 className="text-lg font-semibold text-white">{workflow.name}</h3>
                    <p className="text-xs text-slate-400">
                      {workflow.steps.length} automated steps · Owned by {workflow.owner}
                    </p>
                  </div>
                  <div className="flex gap-4 text-sm text-slate-200">
                    <div className="text-center">
                      <p className="text-xl font-semibold text-white">{workflow.averageDurationHours.toFixed(1)}h</p>
                      <p className="text-xs uppercase tracking-wide text-slate-500">Avg duration</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold text-cyan-200">{workflow.automationRate}%</p>
                      <p className="text-xs uppercase tracking-wide text-slate-500">Automation</p>
                    </div>
                  </div>
                </div>
                <ul className="mt-4 grid gap-2 text-sm text-slate-200 md:grid-cols-2">
                  {workflow.steps.map((step) => (
                    <li key={step} className="inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-900/60 px-3 py-1.5">
                      <ListChecks className="size-3 text-indigo-200" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="space-y-5 border-slate-600/40">
            <div>
              <h2 className="text-xl font-semibold text-white">Integration Telemetry</h2>
              <p className="text-sm text-slate-400">Synchronized runbooks and ticket states across connected ITSM platforms.</p>
            </div>
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div
                  key={integration.tool}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition hover:border-cyan-400/40 hover:bg-slate-900/60",
                    integration.status === "Operational"
                      ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                      : integration.status === "Degraded"
                        ? "border-amber-400/30 bg-amber-500/10 text-amber-100"
                        : "border-rose-400/30 bg-rose-500/10 text-rose-100",
                  )}
                >
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-white">{integration.tool}</p>
                    <p className="text-xs text-slate-200">
                      {integration.incidentsSyncedToday} tickets synced today · Latency {integration.syncLatencyMinutes} min
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold uppercase tracking-wide">{integration.status}</p>
                    <p className="text-xs text-slate-200">
                      Automation {integration.automationEnabled ? "active" : "paused"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-5 border-slate-600/40">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Tier Acceleration Knowledge Base</h2>
                <p className="text-sm text-slate-400">Contextual runbooks enabling Level 1 agents to resolve quickly.</p>
              </div>
              <button className="rounded-full border border-slate-600/60 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/60">
                Open Library
              </button>
            </div>
            <ul className="space-y-3 text-sm text-slate-200">
              {knowledgeBase.map((article) => (
                <li
                  key={article.id}
                  className="flex flex-col gap-2 rounded-2xl border border-slate-700/50 bg-slate-900/40 px-4 py-3 transition hover:border-cyan-400/40 hover:bg-slate-900/60"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-base font-semibold text-white">{article.title}</p>
                    <span className="rounded-full border border-slate-600/50 px-3 py-1 text-xs text-slate-200">
                      {article.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span>Article ID {article.id}</span>
                    <span>Avg handle {article.avgHandleMinutes} min</span>
                    <span>Updated {article.lastUpdated}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <Card className="space-y-6 border-slate-600/40">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Weekly Operations Performance</h2>
              <p className="text-sm text-slate-400">
                Track how AI assistance accelerates ticket closures, vulnerability remediation, and automation runs.
              </p>
            </div>
            <div className="rounded-full border border-slate-700/50 bg-slate-900/50 px-4 py-1.5 text-xs text-slate-200">
              Auto-refreshed every 15 minutes
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3 md:items-end">
            {performanceTrend.map((day) => (
              <div key={day.label} className="flex flex-col gap-3">
                <div className="flex h-40 items-end gap-1 rounded-2xl border border-slate-700/40 bg-slate-900/40 p-3">
                  <div className="flex-1">
                    <div
                      className="w-full rounded-t-full bg-gradient-to-t from-indigo-500 via-sky-500 to-cyan-400 shadow-[0_12px_22px_rgba(14,165,233,0.35)]"
                      style={{ height: `${Math.min(day.ticketsResolved * 2, 160)}px` }}
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className="w-full rounded-t-full bg-gradient-to-t from-emerald-500 via-lime-400 to-amber-300"
                      style={{ height: `${Math.min(day.vulnerabilitiesClosed * 10, 160)}px` }}
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className="w-full rounded-t-full bg-gradient-to-t from-purple-500 via-fuchsia-500 to-pink-400"
                      style={{ height: `${Math.min(day.automationRuns * 6, 160)}px` }}
                    />
                  </div>
                </div>
                <div className="space-y-1 text-xs text-slate-400">
                  <p className="text-sm font-semibold text-white">{day.label}</p>
                  <p>Tickets resolved: {day.ticketsResolved}</p>
                  <p>Vulnerabilities closed: {day.vulnerabilitiesClosed}</p>
                  <p>Automations executed: {day.automationRuns}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-6 border-rose-400/30">
          <div>
            <h2 className="text-xl font-semibold text-white">AI Guardrails & Escalation Policies</h2>
            <p className="text-sm text-slate-400">
              Automated checks ensure human-in-the-loop oversight for sensitive or high impact remediation events.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-slate-200">
            <li className="flex items-start gap-3 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3">
              <AlertTriangle className="mt-0.5 size-5 text-rose-200" />
              <div>
                <p className="font-semibold text-white">Critical containment always dual-approved</p>
                <p className="text-xs text-rose-100">
                  Tier 2 agents require SOC validation before releasing isolated endpoints back onto production networks.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-rose-400/20 bg-slate-900/60 px-4 py-3">
              <Shield className="mt-0.5 size-5 text-emerald-200" />
              <div>
                <p className="font-semibold text-white">Privileged access changes logged with immutable chain</p>
                <p className="text-xs text-slate-300">
                  ServiceNow change control and Jira approvals are mirrored, timestamped, and stored for audit readiness.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-rose-400/20 bg-slate-900/60 px-4 py-3">
              <Brain className="mt-0.5 size-5 text-sky-200" />
              <div>
                <p className="font-semibold text-white">Continuous learning model feedback loop</p>
                <p className="text-xs text-slate-300">
                  Ticket resolutions feed the LLM to refine triage prompts while respecting data residency and privacy controls.
                </p>
              </div>
            </li>
          </ul>
        </Card>
      </section>
    </div>
  );
};
