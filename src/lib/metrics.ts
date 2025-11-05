import type { Endpoint, Ticket, Vulnerability } from "./mock-data";

export const getTicketSummary = (tickets: Ticket[]) => {
  const open = tickets.filter((ticket) => ticket.status !== "Resolved");
  const slaBreaches = open.filter((ticket) => ticket.slaBreached).length;
  const critical = open.filter((ticket) => ticket.priority === "P1").length;
  const averageHoursOpen =
    open.reduce((total, ticket) => {
      const created = new Date(ticket.createdAt).getTime();
      const updated = new Date(ticket.updatedAt).getTime();
      return total + (updated - created);
    }, 0) /
    (open.length || 1) /
    1000 /
    60 /
    60;

  return {
    total: tickets.length,
    open: open.length,
    resolved: tickets.filter((ticket) => ticket.status === "Resolved").length,
    critical,
    slaBreaches,
    averageHoursOpen: Math.max(averageHoursOpen, 0.1),
  };
};

export const getTierDistribution = (tickets: Ticket[]) => {
  const tier1 = tickets.filter((ticket) => ticket.tier === 1).length;
  const tier2 = tickets.filter((ticket) => ticket.tier === 2).length;
  const total = tickets.length || 1;

  return {
    tier1,
    tier2,
    tier1Pct: Math.round((tier1 / total) * 100),
    tier2Pct: Math.round((tier2 / total) * 100),
  };
};

export const getVulnerabilityDistribution = (items: Vulnerability[]) => {
  const summary = items.reduce(
    (acc, item) => {
      acc[item.severity] += 1;
      acc.totalAssets += item.affectedAssets;
      acc.progress += item.progress;
      return acc;
    },
    {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      totalAssets: 0,
      progress: 0,
    },
  );

  const overallProgress = Math.round(summary.progress / (items.length || 1));

  return { ...summary, overallProgress };
};

export const getEndpointHealth = (endpoints: Endpoint[]) => {
  const totals = endpoints.reduce(
    (acc, endpoint) => {
      acc[endpoint.health] += 1;
      acc.vulnerabilities += endpoint.vulnerabilities;
      acc.patchCompliance += endpoint.patchLevel;
      if (!endpoint.encryption) acc.unencrypted += 1;
      return acc;
    },
    {
      Healthy: 0,
      Warning: 0,
      Offline: 0,
      vulnerabilities: 0,
      patchCompliance: 0,
      unencrypted: 0,
    },
  );

  const complianceScore = Math.round(totals.patchCompliance / (endpoints.length || 1));

  return {
    healthy: totals.Healthy,
    warning: totals.Warning,
    offline: totals.Offline,
    vulnerabilities: totals.vulnerabilities,
    complianceScore,
    unencrypted: totals.unencrypted,
    total: endpoints.length,
  };
};
