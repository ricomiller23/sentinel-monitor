'use client';

import React, { useState } from 'react';
import { ShieldAlert, AlertOctagon, Terminal, Database, Server, Info, ExternalLink, Activity } from 'lucide-react';

export interface ThreatNode {
  id: string;
  targetSector: string;
  location: string;
  country: string;
  lat: number;
  lng: number;
  cveId: string;
  cisaKevDate: string;
  cvssScore: number;
  epssScorePct: number;
  ransomwareClaim: {
    actor: string;
    isUnverifiedClaim: boolean;
    victimStated: string;
    proofSamplePublished: boolean;
  };
  authority: string;
  mitigationDeadline: string;
}

export const MONITORED_NODES: ThreatNode[] = [
  {
    id: 'cisa-panos',
    targetSector: 'Government & Defense Core',
    location: 'Washington D.C.',
    country: 'United States',
    lat: 38.9072,
    lng: -77.0369,
    cveId: 'CVE-2024-3400',
    cisaKevDate: '2026-04-14',
    cvssScore: 10.0,
    epssScorePct: 96.8,
    ransomwareClaim: {
      actor: 'Akira Syndicate',
      isUnverifiedClaim: true,
      victimStated: 'Federal Contractor Gateway',
      proofSamplePublished: true
    },
    authority: 'CISA KEV Catalog / Shadowserver',
    mitigationDeadline: '2026-04-19 (Enforced)'
  },
  {
    id: 'bsi-ivanti',
    targetSector: 'Telecommunications & Backbone',
    location: 'Frankfurt am Main',
    country: 'Germany',
    lat: 50.1109,
    lng: 8.6821,
    cveId: 'CVE-2024-21887',
    cisaKevDate: '2026-01-15',
    cvssScore: 9.1,
    epssScorePct: 94.2,
    ransomwareClaim: {
      actor: 'LockBit 3.0 Resurgent',
      isUnverifiedClaim: true,
      victimStated: 'European Transit Provider',
      proofSamplePublished: false
    },
    authority: 'BSI CERT-Bund / GreyNoise',
    mitigationDeadline: 'Mandatory Emergency Patch'
  },
  {
    id: 'jpcert-scada',
    targetSector: 'Maritime Port Automation & SCADA',
    location: 'Tokyo & Yokohama Bay',
    country: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
    cveId: 'CVE-2024-1709',
    cisaKevDate: '2026-02-22',
    cvssScore: 9.8,
    epssScorePct: 88.5,
    ransomwareClaim: {
      actor: 'BlackCat / ALPHV Offshoot',
      isUnverifiedClaim: true,
      victimStated: 'Yokohama Terminal Controller',
      proofSamplePublished: false
    },
    authority: 'JPCERT/CC Surveillance Feed',
    mitigationDeadline: 'Active Containment'
  },
  {
    id: 'ncsc-banking',
    targetSector: 'Financial Clearing & SWIFT Gateways',
    location: 'London Financial Center',
    country: 'United Kingdom',
    lat: 51.5074,
    lng: -0.1278,
    cveId: 'CVE-2023-46805',
    cisaKevDate: '2026-01-16',
    cvssScore: 8.2,
    epssScorePct: 79.1,
    ransomwareClaim: {
      actor: 'Play Ransomware Group',
      isUnverifiedClaim: true,
      victimStated: 'London Derivatives Brokerage',
      proofSamplePublished: true
    },
    authority: 'UK NCSC Alert Network',
    mitigationDeadline: 'Immediate Remediation'
  },
  {
    id: 'singcert-logistics',
    targetSector: 'Semiconductor Fabrication Supplies',
    location: 'Jurong Island Corridor',
    country: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    cveId: 'CVE-2024-27198',
    cisaKevDate: '2026-03-04',
    cvssScore: 9.8,
    epssScorePct: 91.0,
    ransomwareClaim: {
      actor: 'Rhysida Consortium',
      isUnverifiedClaim: true,
      victimStated: 'Chemical Supply Logistics',
      proofSamplePublished: false
    },
    authority: 'SingCERT National Vulnerability Bulletin',
    mitigationDeadline: 'Enforced Zero-Trust Isolation'
  }
];

function projectGlobalCoords(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 100;
  const y = ((85 - lat) / 170) * 100;
  return {
    x: Math.max(2, Math.min(98, x)),
    y: Math.max(3, Math.min(97, y))
  };
}

export function CyberThreatMap() {
  const [selectedNode, setSelectedNode] = useState<ThreatNode>(MONITORED_NODES[0]);

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl overflow-hidden shadow-sm my-6">
      {/* Header bar */}
      <div className="bg-[#F6F8FB] px-5 py-4 border-b border-[#E4E9F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#B42318] animate-pulse"></span>
            <h2 className="text-base font-bold text-[#101828] uppercase tracking-wide">
              Global Cyber Threat & CISA KEV Exploitation Map
            </h2>
            <span className="text-xs bg-[#E4E9F0] text-[#344054] px-2 py-0.5 rounded font-mono font-semibold">
              CISA KEV / FIRST EPSS / GreyNoise
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Strict Invariant: CVSS severity ≠ EPSS exploitability probability ≠ CISA KEV confirmed wild activity. Claims kept unblended.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono font-bold bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA] px-2.5 py-1 rounded-md flex items-center gap-1.5">
            <AlertOctagon className="w-3.5 h-3.5" />
            Active Exploitation In The Wild
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full bg-[#F8FAFC] border-b border-[#E4E9F0] overflow-hidden" style={{ minHeight: '360px' }}>
        <svg
          viewBox="0 0 100 55"
          className="w-full h-auto max-h-[440px] select-none pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Lat / Lng Grid */}
          <line x1="0" y1="27.5" x2="100" y2="27.5" stroke="#E2E8F0" strokeWidth="0.3" strokeDasharray="1 1" />
          <line x1="50" y1="0" x2="50" y2="55" stroke="#E2E8F0" strokeWidth="0.3" strokeDasharray="1 1" />

          {/* Continents */}
          <path d="M 12,8 L 26,8 L 32,16 L 24,24 L 20,28 L 14,24 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
          <path d="M 24,29 L 34,31 L 32,46 L 27,51 L 24,38 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
          <path d="M 46,10 L 58,10 L 56,19 L 48,19 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
          <path d="M 46,21 L 58,21 L 60,38 L 52,47 L 46,33 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
          <path d="M 59,7 L 90,8 L 86,28 L 68,26 L 60,18 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
          <path d="M 80,36 L 93,36 L 90,48 L 78,46 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />

          {/* Cyber attack vectors connections */}
          <path d="M 28,14 Q 40,8 52,14" fill="none" stroke="#B42318" strokeWidth="0.6" strokeDasharray="1 1" opacity="0.5" />
          <path d="M 52,14 Q 70,12 85,19" fill="none" stroke="#B42318" strokeWidth="0.6" strokeDasharray="1 1" opacity="0.5" />
          <path d="M 28,14 Q 60,28 78,32" fill="none" stroke="#B42318" strokeWidth="0.6" strokeDasharray="1 1" opacity="0.4" />
        </svg>

        {/* Threat Node Markers */}
        <div className="absolute inset-0 pointer-events-auto">
          {MONITORED_NODES.map((node) => {
            const { x, y } = projectGlobalCoords(node.lat, node.lng);
            const isSelected = selectedNode.id === node.id;
            return (
              <div
                key={node.id}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                onClick={() => setSelectedNode(node)}
              >
                <div
                  className={`relative flex items-center justify-center transition-transform ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                  }`}
                >
                  <span className={`absolute w-7 h-7 rounded-full opacity-30 bg-[#B42318] ${isSelected ? 'animate-ping' : ''}`} />
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shadow-md ${
                      isSelected
                        ? 'bg-[#B42318] border-[#FFFFFF] text-[#FFFFFF]'
                        : 'bg-[#FFFFFF] border-[#B42318] text-[#B42318]'
                    }`}
                  >
                    <Server className="w-3 h-3" />
                  </div>

                  {/* Tooltip badge */}
                  <div
                    className={`absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold shadow-xs border pointer-events-none transition ${
                      isSelected
                        ? 'bg-[#101828] text-[#FFFFFF] border-[#101828]'
                        : 'bg-[#FFFFFF]/95 text-[#344054] border-[#E4E9F0]'
                    }`}
                  >
                    {node.cveId} ({node.cvssScore})
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Threat Dossier */}
      <div className="p-5 bg-[#FFFFFF] border-t border-[#E4E9F0] grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-[#101828]">{selectedNode.targetSector}</h3>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#FEF3F2] border border-[#FECDCA] text-[#B42318] rounded">
              {selectedNode.cveId}
            </span>
            <span className="text-xs font-mono text-[#344054] bg-[#F6F8FB] border border-[#E4E9F0] px-2 py-0.5 rounded">
              {selectedNode.location}, {selectedNode.country}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold">
                CVSS 3.1 Severity
              </span>
              <span className="text-base font-bold font-mono text-[#B42318]">{selectedNode.cvssScore.toFixed(1)} / 10.0</span>
              <span className="text-[10px] text-[#667085] block mt-0.5 font-medium">Intrinsic severity</span>
            </div>

            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold">
                FIRST EPSS Probability
              </span>
              <span className="text-base font-bold font-mono text-[#0E63C4]">{selectedNode.epssScorePct}%</span>
              <span className="text-[10px] text-[#667085] block mt-0.5 font-medium">30d exploit likelihood</span>
            </div>

            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold">
                CISA KEV Catalog
              </span>
              <span className="text-xs font-bold font-mono text-[#0BA360] block mt-1">Confirmed In Wild</span>
              <span className="text-[10px] text-[#667085] block mt-0.5">Added {selectedNode.cisaKevDate}</span>
            </div>
          </div>
        </div>

        {/* Ransomware Claim Isolation */}
        <div className="md:col-span-2 bg-[#F8FAFC] border border-[#E4E9F0] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#101828]">
              <Info className="w-4 h-4 text-[#B42318]" />
              <span>Adversary Ransomware Claim (Unverified Extortion Telemetry)</span>
            </div>
            <div className="bg-[#FFFFFF] p-2.5 rounded border border-[#E4E9F0] space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#101828]">Threat Actor: {selectedNode.ransomwareClaim.actor}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FFFAEB] border border-[#FEDF89] text-[#B54708]">
                  Unverified Extortion Claim
                </span>
              </div>
              <p className="text-xs text-[#475467]">
                Stated Victim: <em>{selectedNode.ransomwareClaim.victimStated}</em>. Proof samples: {selectedNode.ransomwareClaim.proofSamplePublished ? 'Published on leak site' : 'No cryptographic sample verified'}.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E4E9F0] flex items-center justify-between text-xs text-[#667085]">
            <span>Authority: {selectedNode.authority}</span>
            <span className="text-[#B42318] font-medium">{selectedNode.mitigationDeadline}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
