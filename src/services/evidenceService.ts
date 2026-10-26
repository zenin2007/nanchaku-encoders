import type { ResearchEvidenceRecord, EvidenceType } from '../types';

export class EvidenceService {
  /**
   * Builds an evidence record from user-supplied customer quotes
   */
  static createFromUserFeedback(
    quote: string,
    authorSegment: string = 'Target Customer'
  ): ResearchEvidenceRecord {
    return {
      id: `ev-user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      claim: quote.trim(),
      sourceName: `User-Supplied Customer Feedback (${authorSegment})`,
      evidenceType: 'User Customer Feedback',
      retrievalDate: new Date().toISOString().split('T')[0],
      limitations: 'Self-reported direct qualitative quote; potential selection bias. Not statistically representative.',
      verified: true,
    };
  }

  /**
   * Builds an evidence record with transparent metadata
   */
  static createRecord(params: {
    claim: string;
    sourceName: string;
    sourceUrl?: string;
    evidenceType: EvidenceType;
    retrievalDate?: string;
    limitations: string;
    verified?: boolean;
  }): ResearchEvidenceRecord {
    return {
      id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      claim: params.claim,
      sourceName: params.sourceName,
      sourceUrl: params.sourceUrl,
      evidenceType: params.evidenceType,
      retrievalDate: params.retrievalDate || new Date().toISOString().split('T')[0],
      limitations: params.limitations,
      verified: params.verified ?? false,
    };
  }

  /**
   * Returns benchmark evidence records for the Student Tiffin Kanpur demonstration scenario
   */
  static getKanpurTiffinEvidence(): ResearchEvidenceRecord[] {
    return [
      {
        id: 'ev-kanpur-1',
        claim: 'Kanpur coaching hub (Kakadeo & Kalyanpur) hosts tens of thousands of outstation coaching aspirants and university students relying on external meals.',
        sourceName: 'District Education & Urban Demographics Profile (Kanpur Nagar)',
        sourceUrl: 'https://kanpurnagar.nic.in/',
        evidenceType: 'Government / Industry Benchmark',
        retrievalDate: '2026-10-01',
        limitations: 'High-level demographic data; does not track individual hostel meal subscriptions.',
        verified: true,
      },
      {
        id: 'ev-kanpur-2',
        claim: 'Unorganized dhaba monthly tiffin subscriptions in Kakadeo typically range between ₹2,200 and ₹2,700/month for two meals daily with strict zero-pause policies.',
        sourceName: 'Local Physical Inquiries & Hostel Notice Boards (Kakadeo)',
        evidenceType: 'Empirical Observation',
        retrievalDate: '2026-10-15',
        limitations: 'Informal spot pricing; seasonal fluctuations during semester breaks.',
        verified: false,
      },
      {
        id: 'ev-kanpur-3',
        claim: 'Food delivery apps (Swiggy / Zomato) average ₹140 to ₹220 per single delivered meal combo, making daily recurring consumption cost-prohibitive for average hostel students.',
        sourceName: 'Aggregator Menu Audit (Kanpur Kalyanpur PIN 208016)',
        evidenceType: 'Public Product Page',
        retrievalDate: '2026-10-20',
        limitations: 'Subject to surge pricing, delivery distance fees, and promotional discounts.',
        verified: true,
      },
      {
        id: 'ev-kanpur-4',
        claim: 'Students frequently report skipping meals or eating outside on weekends, with 100% of skipped meals forfeited under standard monthly contracts.',
        sourceName: 'Student PG Discovery Interviews (3 Direct Verbatim Quotes)',
        evidenceType: 'User Customer Feedback',
        retrievalDate: '2026-10-24',
        limitations: 'Qualitative interview sample (n=3); requires wider survey verification.',
        verified: true,
      },
    ];
  }
}
