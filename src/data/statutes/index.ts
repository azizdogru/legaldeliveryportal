import { StateStatuteInfo } from "@/types/document";
import { US_STATES, getStateByCode } from "../usStates";

// Specific state override maps for high-volume states
type StateStatuteMap = Record<string, Partial<StateStatuteInfo>>;

// 1. CEASE AND DESIST STATUTES
const CEASE_DESIST_OVERRIDES: StateStatuteMap = {
  CA: {
    statuteCitation: "Cal. Civ. Proc. Code Section 527.6 & Cal. Civ. Code Section 47",
    statuteName: "California Civil Harassment and Defamation Injunction Act",
    noticePeriodDays: 10,
    courtJurisdiction: "Superior Court of California",
    serviceMethods: ["Certified Mail with Return Receipt", "Personal Service", "First-Class Mail with Certificate of Mailing"],
    keyRequirements: [
      "Explicit statement of offending conduct and direct demand to cease immediately",
      "Notice of intent to seek injunctive relief under Section 527.6 of the Code of Civil Procedure",
      "Reservation of rights to seek actual and punitive damages for tortious interference or defamation",
      "Demand for immediate preservation of all relevant electronic communications and records",
    ],
    statuteSummary: "California law authorizes targets of ongoing harassment, stalking, or unlawful defamation to seek immediate civil harassment restraining orders. Formal pre-suit written notice serves as primary evidence of willful conduct and bad faith.",
    penaltiesOrConsequences: "Failure to cease may result in a civil harassment restraining order, liability for plaintiff legal fees, and tort damages.",
  },
  TX: {
    statuteCitation: "Tex. Civ. Prac. and Rem. Code Section 73.055 & Tex. Penal Code Section 42.07",
    statuteName: "Texas Defamation Mitigation Act and Harassment Statute",
    noticePeriodDays: 30,
    courtJurisdiction: "District Court of Texas",
    serviceMethods: ["Certified Mail Return Receipt Requested", "Hand Delivery with Written Receipt", "Process Server"],
    keyRequirements: [
      "Timely written request for correction, clarification, or retraction within 90 days of publication under DMA",
      "Detailed factual specification of false and defamatory statements",
      "Formal demand to preserve all digital logs, social media posts, and server records",
      "Notice of statutory liability for actual and exemplary damages",
    ],
    statuteSummary: "Under the Texas Defamation Mitigation Act (TDMA), serving a formal written demand is a statutory prerequisite to recovering exemplary damages. The notice also establishes intentional harassment under Texas civil law.",
    penaltiesOrConsequences: "Continued publication or harassment exposes defendant to exemplary damages and court injunctions.",
  },
  FL: {
    statuteCitation: "Fla. Stat. Section 784.0485 & Fla. Stat. Section 770.01",
    statuteName: "Florida Injunction for Protection Against Stalking/Harassment and Pre-Suit Notice Act",
    noticePeriodDays: 15,
    courtJurisdiction: "Circuit Court of Florida",
    serviceMethods: ["Certified Mail with Return Receipt", "Hand Delivery by Sheriff or Process Server"],
    keyRequirements: [
      "Condition precedent: at least 5 days pre-suit written notice for publication defamation under Section 770.01",
      "Specific identification of dates, locations, and nature of harassing or defamatory communications",
      "Unconditional instruction to stop all direct and indirect contact",
      "Formal litigation hold on all related electronic evidence",
    ],
    statuteSummary: "Florida mandates formal pre-suit written notice prior to filing civil actions for libel or slander. For non-defamation harassment, formal notice establishes a verified pattern of repeat harassment required for circuit court injunctions.",
    penaltiesOrConsequences: "Injunctive restraining orders, civil contempt penalties, and liability for compensatory damages.",
  },
  NY: {
    statuteCitation: "N.Y. C.P.L.R. Article 63 & N.Y. Penal Law Section 240.26",
    statuteName: "New York Civil Practice Law on Injunctions and Harassment",
    noticePeriodDays: 10,
    courtJurisdiction: "Supreme Court of the State of New York",
    serviceMethods: ["Certified Mail with Return Receipt Requested", "Personal Service", "Overnight Courier with Signature"],
    keyRequirements: [
      "Unequivocal demand to cease actionable behavior immediately",
      "Specification of injury to reputation, business relations, or personal peace",
      "Notice of intent to seek preliminary and permanent injunction under CPLR Article 63",
      "Formal instruction to retain and preserve all digital and physical evidence",
    ],
    statuteSummary: "In New York, establishing that a party had actual written notice of wrongful conduct is critical to proving intentional malice and defeating claims of reasonable commercial or personal conduct.",
    penaltiesOrConsequences: "Immediate application for temporary restraining order, damages for intentional infliction of emotional distress, or commercial tort damages.",
  },
};

// 2. GENERAL DEMAND LETTER STATUTES
const DEMAND_LETTER_OVERRIDES: StateStatuteMap = {
  CA: {
    statuteCitation: "Cal. Civ. Proc. Code Section 1033.5 & Cal. Civ. Code Section 3287",
    statuteName: "California Pre-Suit Demand and Statutory Prejudgment Interest Code",
    noticePeriodDays: 14,
    courtJurisdiction: "Superior Court of California (Small Claims or Limited Civil)",
    serviceMethods: ["Certified Mail with Return Receipt", "First-Class Mail with Postal Certificate of Mailing"],
    keyRequirements: [
      "Itemized breakdown of principal amount owed, contract dates, and unpaid balances",
      "Clear declaration of pre-judgment statutory interest rate (up to 10% per annum under Section 3289)",
      "Strict deadline for payment in full (14 to 30 calendar days)",
      "Notice that failure to satisfy debt will trigger formal civil filing with claim for court costs and statutory interest",
    ],
    statuteSummary: "California courts strongly favor formal written settlement demands prior to trial. In small claims court, plaintiffs must certify under penalty of perjury that they made a prior oral or written demand for payment.",
    penaltiesOrConsequences: "Entry of civil money judgment, wage garnishment, bank account levies, and judgment enforcement liens.",
  },
  TX: {
    statuteCitation: "Tex. Civ. Prac. and Rem. Code Section 38.001 and Section 38.002",
    statuteName: "Texas Civil Practice Chapter 38 Attorney Fees and Notice Statute",
    noticePeriodDays: 30,
    courtJurisdiction: "Justice of the Peace Court or County Court at Law",
    serviceMethods: ["Certified Mail Return Receipt Requested", "First-Class Mail", "Hand Delivery"],
    keyRequirements: [
      "Presentment of claim at least 30 consecutive calendar days before filing suit under Section 38.002",
      "Detailed statement of goods provided, services performed, or breach of written contract",
      "Explicit statement that claimant will seek reasonable attorney fees and court costs if unpaid",
      "Exact principal balance due with payment remittance instructions",
    ],
    statuteSummary: "Texas Chapter 38 mandates that a claimant present the claim to the opposing party at least 30 days before filing suit. Compliance with this statutory window is the mandatory legal trigger to recover attorney fees.",
    penaltiesOrConsequences: "Court judgment including principal balance, 100% of reasonable attorney fees, court costs, and post-judgment interest.",
  },
  FL: {
    statuteCitation: "Fla. Stat. Section 55.03 & Fla. Sm. Cl. R. 7.050",
    statuteName: "Florida Pre-Suit Demand and Statutory Interest Procedure",
    noticePeriodDays: 15,
    courtJurisdiction: "County Court of Florida (Small Claims Division up to $8,000)",
    serviceMethods: ["Certified Mail Return Receipt Requested", "Hand Delivery with Acknowledgment"],
    keyRequirements: [
      "Formal demand stating exact principal amount and origin of debt",
      "Statutory interest calculated in accordance with the Chief Financial Officer rate under Section 55.03",
      "15-day settlement window prior to court filing",
      "Notice of entry of public judgment and subsequent post-judgment collection proceedings",
    ],
    statuteSummary: "Florida Small Claims rules encourage good faith pre-suit resolution. A comprehensive written notice establishes liquidated damages and supports immediate summary disposition.",
    penaltiesOrConsequences: "Civil money judgment, attachment of non-exempt property, and statutory judgment interest.",
  },
  NY: {
    statuteCitation: "N.Y. C.P.L.R. Section 5001 and Section 5004",
    statuteName: "New York Prejudgment Interest and Contract Breach Notice",
    noticePeriodDays: 14,
    courtJurisdiction: "New York City Civil Court or District/Town Court",
    serviceMethods: ["Certified Mail Return Receipt Requested", "First-Class Mail with Certificate of Mailing"],
    keyRequirements: [
      "Itemized listing of breached contract, unpaid invoices, or damaged property",
      "Notice of 9% statutory annual prejudgment interest accruing from the earliest date of breach under CPLR 5004",
      "Definite cure deadline before legal action commences",
      "Formal reservation of all legal remedies in contract and tort",
    ],
    statuteSummary: "Under New York law, pre-judgment interest accrues at a mandatory 9% per year from the date of breach. A formal demand sets the unequivocal milestone date for interest calculation.",
    penaltiesOrConsequences: "Judgment with 9% statutory interest, transcript filing with county clerk, and property execution.",
  },
};

// 3. NOTICE OF RENT INCREASE STATUTES
const RENT_INCREASE_OVERRIDES: StateStatuteMap = {
  CA: {
    statuteCitation: "Cal. Civ. Code Section 827 & Cal. Civ. Code Section 1947.12 (AB 1482)",
    statuteName: "California Tenant Protection Act and Notice of Rent Increase Statute",
    noticePeriodDays: 30, // 30 days if <= 10%, 90 days if > 10%
    courtJurisdiction: "Superior Court of California",
    serviceMethods: ["Personal Delivery", "Substituted Service with Mailing", "Posting on Premises and Certified Mailing"],
    keyRequirements: [
      "30-day written notice if cumulative increase is 10% or less over prior 12 months",
      "90-day written notice if cumulative increase exceeds 10% over prior 12 months (Cal. Civ. Code 827(b)(3))",
      "Compliance with AB 1482 statewide rent cap (5% plus regional CPI, maximum 10% total) if property is covered",
      "Mandatory statement specifying whether property is exempt from AB 1482 rent caps",
    ],
    statuteSummary: "California strictly regulates rent increase notice periods. Increases up to 10% require 30 days written notice, while increases exceeding 10% require 90 days. Covered properties must adhere to statutory caps.",
    penaltiesOrConsequences: "Rent increase is void and unenforceable. Landlords accepting illegal rent face treble damages and penalties.",
  },
  NY: {
    statuteCitation: "N.Y. Real Prop. Law Section 226-c (Housing Stability and Tenant Protection Act)",
    statuteName: "New York Notice of Rent Increase and Lease Non-Renewal Statute",
    noticePeriodDays: 30, // 30, 60, or 90 days based on tenancy length
    courtJurisdiction: "Civil Court of the City of New York or Local City/Town Court",
    serviceMethods: ["Personal Delivery", "Certified Mail", "First-Class Mail with Certificate"],
    keyRequirements: [
      "30 days notice if tenancy is less than 1 year",
      "60 days notice if tenancy is between 1 and 2 years",
      "90 days notice if tenancy is 2 years or longer",
      "Mandatory for any rent increase of 5% or more",
    ],
    statuteSummary: "New York Real Property Law Section 226-c mandates tiered notice periods of 30, 60, or 90 days based strictly on tenant tenure whenever rent is increased by 5 percent or more.",
    penaltiesOrConsequences: "Notice is defective, tenant remains obligated only to pay previous legal rent until lawful statutory notice is properly served.",
  },
  FL: {
    statuteCitation: "Fla. Stat. Section 83.57 & Fla. Stat. Section 83.575",
    statuteName: "Florida Residential Landlord and Tenant Notice Act",
    noticePeriodDays: 60, // 60 days for annual lease or as specified in lease
    courtJurisdiction: "County Court of Florida",
    serviceMethods: ["Personal Delivery", "Leaving Copy at Dwelling", "Certified Mail"],
    keyRequirements: [
      "Written notice provided at least 60 days prior to lease end for year-to-year tenancies",
      "30 days written notice for month-to-month tenancies",
      "Clear specification of new monthly rent amount and effective date",
      "Tenant acceptance or non-renewal deadline",
    ],
    statuteSummary: "Florida law requires written advance notice of rent changes or non-renewal. Landlords must give at least 60 days advance notice prior to the end of an annual residential tenancy.",
    penaltiesOrConsequences: "Tenant may vacate without penalty or hold over under old rental rate until statutory notice expires.",
  },
  TX: {
    statuteCitation: "Tex. Prop. Code Section 92.001 et seq.",
    statuteName: "Texas Property Code Residential Tenancy Notice Provisions",
    noticePeriodDays: 30,
    courtJurisdiction: "Justice of the Peace Court of Texas",
    serviceMethods: ["Hand Delivery to Tenant", "Affixing to Inside of Main Entry Door", "Certified Mail"],
    keyRequirements: [
      "At least 30 days written notice before effective date of rent increase on periodic tenancies",
      "Notice cannot alter fixed-term lease prior to natural expiration unless lease agreement explicitly permits",
      "Explicit declaration of new monthly payment amount, due date, and late fee schedule",
    ],
    statuteSummary: "In Texas, rent cannot be increased during an active fixed-term lease unless explicitly stipulated. Month-to-month tenancies require at least 30 days written notice matching the periodic rent cycle.",
    penaltiesOrConsequences: "Attempted increase during active fixed lease is void. Tenant may recover statutory penalties for illegal lockouts or retaliation.",
  },
  WA: {
    statuteCitation: "Wash. Rev. Code Section 59.18.140",
    statuteName: "Washington Residential Landlord-Tenant Act Rent Increase Notice",
    noticePeriodDays: 60,
    courtJurisdiction: "Superior Court of Washington",
    serviceMethods: ["Personal Service", "Substituted Service with Mail", "Posting and Certified Mail"],
    keyRequirements: [
      "Mandatory 60 days minimum written advance notice for any rent increase",
      "Notice cannot take effect before end of fixed-term lease",
      "Prohibition against retaliatory or discriminatory rent hikes",
    ],
    statuteSummary: "Washington state mandates a minimum of 60 days written notice before any rent increase can take effect for month-to-month tenants.",
    penaltiesOrConsequences: "Defective notice delays effective date of new rent, potential liability under consumer protection statutes.",
  },
};

// 4. NOTICE OF INTENT TO ENTER STATUTES
const INTENT_TO_ENTER_OVERRIDES: StateStatuteMap = {
  CA: {
    statuteCitation: "Cal. Civ. Code Section 1954",
    statuteName: "California Landlord Right of Entry Statute",
    noticePeriodDays: "24 Hours",
    courtJurisdiction: "Superior Court of California",
    serviceMethods: ["Personal Hand Delivery", "Left with Person of Suitable Age", "Affixing to Entry Door", "First-Class Mail (6 days prior)"],
    keyRequirements: [
      "Minimum 24 hours advance written notice for standard maintenance, repairs, or inspections",
      "Minimum 48 hours advance written notice for initial move-out inspection under Section 1950.5",
      "Entry permitted strictly during normal business hours (Monday to Friday, 8:00 AM to 5:00 PM)",
      "Specific statutory purpose stated: repair, inspection, showing to prospective buyers or tenants",
      "Exceptions: immediate emergencies and agreed-upon scheduled repair windows",
    ],
    statuteSummary: "California Civil Code Section 1954 strictly limits landlord entry. Written notice of 24 hours is required, and entry must occur during normal business hours for a legally recognized statutory purpose.",
    penaltiesOrConsequences: "Landlord liable for tenant harassment, breach of quiet enjoyment, and statutory damages up to $2,000 under Section 1940.2.",
  },
  FL: {
    statuteCitation: "Fla. Stat. Section 83.53",
    statuteName: "Florida Landlord Access to Dwelling Unit Statute",
    noticePeriodDays: "24 Hours (Statutory SB 584 requirement)",
    courtJurisdiction: "County Court of Florida",
    serviceMethods: ["Hand Delivery", "Posting on Premises", "Mailed Notice"],
    keyRequirements: [
      "Minimum 24 hours advance notice required for non-emergency inspections and maintenance",
      "Entry must take place between 7:30 AM and 8:00 PM",
      "Permitted reasons: inspection, necessary repairs, alterations, supplying agreed services",
      "Tenant shall not unreasonably withhold consent",
    ],
    statuteSummary: "Florida Statute 83.53 provides that 24 hours is deemed reasonable notice for repairs and inspections, restricted to the hours between 7:30 AM and 8:00 PM.",
    penaltiesOrConsequences: "Tenant may terminate lease agreement or seek injunctive relief for unlawful landlord intrusion.",
  },
  TX: {
    statuteCitation: "Tex. Prop. Code Section 92.0081 & Texas Common Law Right of Quiet Enjoyment",
    statuteName: "Texas Quiet Enjoyment and Landlord Entry Rules",
    noticePeriodDays: "24 Hours (Customary and standard lease rule)",
    courtJurisdiction: "Justice of the Peace Court of Texas",
    serviceMethods: ["Hand Delivery to Tenant", "Posting Notice on Entry Door", "Email/Portal Notice if authorized by lease"],
    keyRequirements: [
      "Standard 24 hours written notice before non-emergency entry",
      "Entry restricted to reasonable daytime hours",
      "Permitted purposes: necessary maintenance, emergency inspections, showing property",
      "Landlord or agent must display identification and leave written entry confirmation",
    ],
    statuteSummary: "While Texas Property Code does not establish an absolute hour count by statute, Texas common law covenants of quiet enjoyment and standard lease agreements require at least 24 hours written notice.",
    penaltiesOrConsequences: "Tenant may recover damages for trespass and constructive eviction if landlord enters without notice or authorization.",
  },
  WA: {
    statuteCitation: "Wash. Rev. Code Section 59.18.150",
    statuteName: "Washington Landlord-Tenant Act Landlord Right of Entry",
    noticePeriodDays: "48 Hours (24 Hours for showings)",
    courtJurisdiction: "Superior Court of Washington",
    serviceMethods: ["Written Notice Handed to Tenant", "Left with Person of Suitable Age", "Mailed at Least 6 Days Prior"],
    keyRequirements: [
      "Minimum 48 hours written notice for inspections, repairs, or contractor access",
      "Minimum 24 hours written notice for showing to prospective buyers or tenants",
      "Notice must state exact date and time window of entry",
      "Notice must provide telephone number for tenant to reschedule if inconvenient",
    ],
    statuteSummary: "Washington law imposes strict entry requirements: 48 hours for general maintenance and 24 hours for prospective buyer/tenant showings, with specific time windows.",
    penaltiesOrConsequences: "Landlord liable for statutory penalty of $100 per violation after receiving tenant objection, plus attorney fees.",
  },
};

// 5. LEASE VIOLATION NOTICE STATUTES
const LEASE_VIOLATION_OVERRIDES: StateStatuteMap = {
  CA: {
    statuteCitation: "Cal. Civ. Proc. Code Section 1161(3)",
    statuteName: "California 3-Day Notice to Perform Covenant or Quit",
    noticePeriodDays: 3,
    courtJurisdiction: "Superior Court of California",
    serviceMethods: ["Personal Service on Tenant", "Substituted Service with Mailing", "Posting on Property and Mailing (Nail and Mail)"],
    keyRequirements: [
      "Exact 3-day notice period excluding judicial holidays and weekends",
      "Specific description of violated lease clause (unauthorized pet, unauthorized occupant, nuisance, unauthorized alteration)",
      "Precise instructions on how to cure the default within 3 days",
      "Alternative election: cure the breach or vacate premises within 3 days",
    ],
    statuteSummary: "Under California Code of Civil Procedure Section 1161(3), a tenant guilty of a curable lease violation must be given a 3-day written notice specifying the covenant breached and giving the option to cure or surrender possession.",
    penaltiesOrConsequences: "Failure to cure results in immediate unlawful detainer court lawsuit, eviction judgment, and damages.",
  },
  TX: {
    statuteCitation: "Tex. Prop. Code Section 24.005",
    statuteName: "Texas Notice to Vacate / Notice of Default Statute",
    noticePeriodDays: 3,
    courtJurisdiction: "Justice of the Peace Court of Texas",
    serviceMethods: ["Personal Delivery to Tenant", "Delivery to Any Person over 16 at Residence", "Posting on Inside of Entry Door", "Certified Mail"],
    keyRequirements: [
      "Minimum 3 days written notice unless lease agreement specifies a shorter or longer period",
      "Statement of specific lease breach and whether cure is permitted",
      "Demand for possession or cure within statutory timeframe",
    ],
    statuteSummary: "Texas Property Code Section 24.005 requires at least 3 days written notice before filing an eviction suit, unless the parties agreed in the written lease to a different notice period.",
    penaltiesOrConsequences: "Eviction filing in Justice Court, writ of possession executed by sheriff, and tenant credit impairment.",
  },
  FL: {
    statuteCitation: "Fla. Stat. Section 83.56(2)(b)",
    statuteName: "Florida 7-Day Notice of Noncompliance with Opportunity to Cure",
    noticePeriodDays: 7,
    courtJurisdiction: "County Court of Florida",
    serviceMethods: ["Personal Delivery to Tenant", "Leaving Copy at Dwelling", "Certified Mail"],
    keyRequirements: [
      "Mandatory 7-day cure window for curable violations (unauthorized pet, parking, noise, cleanliness)",
      "Clear description of noncompliance citing specific lease paragraph",
      "Notice that repeating the same violation within 12 months constitutes grounds for immediate termination without cure",
    ],
    statuteSummary: "Florida Statute 83.56(2)(b) requires landlords to give tenants 7 full days to correct a curable lease violation before tenancy termination proceedings may begin.",
    penaltiesOrConsequences: "Failure to cure authorizes landlord to terminate lease and initiate county court eviction proceedings.",
  },
  NY: {
    statuteCitation: "N.Y. Real Prop. Acts. Law Section 753(4) & NYC Housing Maintenance Code",
    statuteName: "New York Notice to Cure and Notice of Termination",
    noticePeriodDays: 10,
    courtJurisdiction: "Civil Court of the City of New York / City Court",
    serviceMethods: ["Personal Service by Process Server", "Conspicuous Place Service (Nail and Mail)"],
    keyRequirements: [
      "Minimum 10-day notice to cure as required by standard lease and statutory rules",
      "Exhaustive factual description of the covenant breached",
      "Subsequent Notice of Termination (30 days) required if default is not remedied",
    ],
    statuteSummary: "New York law mandates a two-step process: a minimum 10-day Notice to Cure specifying the breach, followed by a formal Notice of Termination if tenant fails to rectify.",
    penaltiesOrConsequences: "Summary eviction proceedings in Civil Court, legal fee assessment, and eviction warrant.",
  },
};

// 6. RELEASE OF LIABILITY & MUTUAL SETTLEMENT STATUTES
const RELEASE_LIABILITY_OVERRIDES: StateStatuteMap = {
  CA: {
    statuteCitation: "Cal. Civ. Code Section 1541 and Section 1542",
    statuteName: "California General Release and Unknown Claims Waiver Statute",
    noticePeriodDays: "Immediate upon execution",
    courtJurisdiction: "Superior Court of California",
    serviceMethods: ["Written Execution with Notary Acknowledgment or Dual Counterparts"],
    keyRequirements: [
      "Mandatory statutory waiver: 'A general release does not extend to claims that the creditor or releasing party does not know or suspect to exist in his or her favor at the time of executing the release...'",
      "Explicit express waiver of rights under Section 1542 of the California Civil Code",
      "Mutual covenant not to sue for past, present, and future claims arising from the dispute",
      "Clear recital of adequate monetary or non-monetary legal consideration",
    ],
    statuteSummary: "California Civil Code Section 1542 requires specific, unambiguous statutory waiver language to discharge unknown or unsuspected claims. Without this exact language, unknown injuries remain actionable.",
    penaltiesOrConsequences: "Enforceable bar against any subsequent lawsuits, counterclaims, or administrative filings.",
  },
  TX: {
    statuteCitation: "Tex. Civ. Prac. and Rem. Code Section 154.071 & Texas Rule of Civil Procedure 11",
    statuteName: "Texas Settlement Agreement and Release Statute",
    noticePeriodDays: "Immediate upon execution",
    courtJurisdiction: "District Court of Texas",
    serviceMethods: ["Executed Written Agreement Signed by All Parties and Counsel"],
    keyRequirements: [
      "Compliance with Texas Rule 11 (written, signed, and filed or integrated)",
      "Comprehensive definition of released incident, vehicular accident, or contractual dispute",
      "Full waiver of punitive, exemplary, and consequential damages",
      "Indemnity clause protecting releasee from third-party subrogation or lien claims",
    ],
    statuteSummary: "Under Texas law and Rule 11, settlement agreements and releases must be in writing, signed by the parties, and supported by valid consideration to be enforceable as a binding contract and defense in bar.",
    penaltiesOrConsequences: "Dismissal with prejudice of any litigation, and immediate award of fees for breach of release agreement.",
  },
  FL: {
    statuteCitation: "Fla. Stat. Section 768.041 & Fla. Stat. Section 44.102",
    statuteName: "Florida Release of Tortfeasor and Covenant Not to Sue Statute",
    noticePeriodDays: "Immediate upon execution",
    courtJurisdiction: "Circuit Court of Florida",
    serviceMethods: ["Written Signed Release with Witness Signatures"],
    keyRequirements: [
      "Discharge of all liability regarding the specified vehicular collision, property loss, or tort",
      "Statutory release under Section 768.041 operates as a complete release of the parties named",
      "Acknowledgment of receipt of good and valuable legal settlement consideration",
      "Mutual agreement for final dismissal of all claims with prejudice",
    ],
    statuteSummary: "Florida Statute 768.041 governs releases and covenants not to sue. A properly executed release bars any further action against the released party and shields them from joint tortfeasor claims.",
    penaltiesOrConsequences: "Total affirmative defense to any lawsuit, sanctions for frivolous litigation under Fla. Stat. 57.105.",
  },
  NY: {
    statuteCitation: "N.Y. Gen. Oblig. Law Section 15-108",
    statuteName: "New York General Obligations Law on Releases and Joint Tortfeasors",
    noticePeriodDays: "Immediate upon execution",
    courtJurisdiction: "Supreme Court of New York",
    serviceMethods: ["Written Signed Release with Notary Jurat"],
    keyRequirements: [
      "Reduction of claims against other tortfeasors by amount stipulated or consideration paid under Section 15-108",
      "Comprehensive release of all known and unknown damages, personal injury, and property damage",
      "Express statement that release is voluntary and signed after opportunity to consult independent counsel",
    ],
    statuteSummary: "New York General Obligations Law Section 15-108 regulates the impact of a release. A valid written release completely discharges the settling tortfeasor from contribution claims.",
    penaltiesOrConsequences: "Permanent bar to litigation; actions filed in violation of release subject to summary dismissal and costs.",
  },
};

// 7. MECHANIC'S LIEN / NOTICE OF INTENT TO FILE LIEN STATUTES
const MECHANICS_LIEN_OVERRIDES: StateStatuteMap = {
  CA: {
    statuteCitation: "Cal. Civ. Code Section 8200 (Preliminary Notice) & Section 8416 (Claim of Lien)",
    statuteName: "California Mechanics Lien and Works of Improvement Law",
    noticePeriodDays: 20, // 20 days prelim notice, 10 days notice of intent
    courtJurisdiction: "Superior Court of California (County Recorder Recording)",
    serviceMethods: ["Certified Mail with Return Receipt Requested", "Registered Mail", "Personal Delivery"],
    keyRequirements: [
      "20-Day Preliminary Notice served within 20 days of first furnishing labor or materials (Cal. Civ. Code 8200)",
      "Notice of Intent to Record Lien served at least 10 days prior to recording",
      "Claim of Lien must be recorded within 90 days after completion of work or 30/60 days after Notice of Completion",
      "Statutory Notice of Mechanics Lien text must be included verbatim under Cal. Civ. Code 8416",
      "Proof of Service Affidavit must accompany county recorder filing",
    ],
    statuteSummary: "California mechanics lien law requires strict adherence to notice deadlines. A 20-day preliminary notice is required for subcontractors and material suppliers, followed by formal pre-lien demand.",
    penaltiesOrConsequences: "Enforceable encumbrance on real property title, foreclosure sale through Superior Court lawsuit within 90 days of recording.",
  },
  TX: {
    statuteCitation: "Tex. Prop. Code Chapter 53 (Subchapters C and K)",
    statuteName: "Texas Property Code Chapter 53 Construction Lien Statute",
    noticePeriodDays: 15,
    courtJurisdiction: "District Court of Texas (County Clerk Real Property Records)",
    serviceMethods: ["Certified Mail Return Receipt Requested to Property Owner and Original Contractor"],
    keyRequirements: [
      "Trapping Notice: sent by 15th day of second and third month following each month of unpaid work under Section 53.056",
      "Formal Notice of Intent to File Lien warning owner of real property cloud",
      "Affidavit Claiming Lien filed with County Clerk by 15th day of fourth month after indebtedness accrued",
      "Statutory warning to owner regarding fund trapping and retainage under Texas Property Code",
    ],
    statuteSummary: "Texas Chapter 53 is among the nation's most demanding mechanics lien statutes. Strict monthly notice windows (fund trapping notices) must precede the recording of an affidavit of lien.",
    penaltiesOrConsequences: "Lien clouds title, prevents sale or refinancing, and creates grounds for foreclosure within 1 to 2 years.",
  },
  FL: {
    statuteCitation: "Fla. Stat. Section 713.06 & Fla. Stat. Section 713.08",
    statuteName: "Florida Construction Lien Law",
    noticePeriodDays: 45, // Notice to Owner within 45 days, Lien recorded within 90 days
    courtJurisdiction: "Circuit Court of Florida (Clerk of Court Recording)",
    serviceMethods: ["Certified Mail Return Receipt Requested", "Hand Delivery", "Common Carrier with Tracking"],
    keyRequirements: [
      "Notice to Owner (NTO) served within 45 days of first commencing work (Fla. Stat. 713.06)",
      "Pre-Lien Demand / Notice of Nonpayment served prior to recording",
      "Claim of Lien must be recorded within 90 days of final furnishing of labor, services, or materials (Fla. Stat. 713.08)",
      "Copy of recorded Claim of Lien served on owner within 15 days of recording",
    ],
    statuteSummary: "Florida Construction Lien Law strictly enforces the 45-day Notice to Owner requirement. A formal Notice of Intent warns the owner that a lien will encumber real property if balance is not settled immediately.",
    penaltiesOrConsequences: "Cloud on title, foreclosure suit within 1 year under Section 713.22, award of attorney fees to prevailing lienor.",
  },
  NY: {
    statuteCitation: "N.Y. Lien Law Section 9, Section 10, and Section 11",
    statuteName: "New York Mechanics Lien Law",
    noticePeriodDays: 10,
    courtJurisdiction: "Supreme Court of New York (County Clerk Recording)",
    serviceMethods: ["Certified Mail Return Receipt Requested to Owner and General Contractor"],
    keyRequirements: [
      "Notice of Intent to File Lien served 10 to 30 days prior to filing",
      "Notice of Lien filed within 4 months for single-family residences or 8 months for commercial projects",
      "Service of copy of Notice of Lien on owner within 30 days of recording (N.Y. Lien Law Section 11)",
      "Detailed affidavit of service filed with county clerk within 35 days",
    ],
    statuteSummary: "Under New York Lien Law, private mechanics liens must be filed with the county clerk where the real property is located. A formal pre-lien demand frequently compels payment before title is clouded.",
    penaltiesOrConsequences: "Valid real estate lien valid for one year, subject to foreclosure action or bonding requirements.",
  },
};

// 8. HIPAA MEDICAL RECORDS RELEASE STATUTES
const HIPAA_OVERRIDES: StateStatuteMap = {
  ALL_STATES: {
    statuteCitation: "45 C.F.R. Section 164.508 & Privacy Act of 1974",
    statuteName: "Federal Health Insurance Portability and Accountability Act (HIPAA) Privacy Rule",
    noticePeriodDays: 30,
    courtJurisdiction: "Federal and State Courts of General Jurisdiction",
    serviceMethods: ["Secure Electronic Transmission", "Certified Mail", "Hand Delivery to Medical Records Department"],
    keyRequirements: [
      "Specific and meaningful description of medical, clinical, and billing records to be disclosed",
      "Identification of specific person or entity authorized to release and authorized to receive records",
      "Explicit statement of the purpose of disclosure (litigation, insurance claim, personal use)",
      "Expiration date or specific expiration event (e.g., conclusion of lawsuit)",
      "Statement of individual's right to revoke authorization in writing at any time",
      "Notice that protected health information disclosed may be subject to redisclosure and no longer protected by HIPAA",
    ],
    statuteSummary: "Federal law 45 C.F.R. Section 164.508 mandates exact core elements and required statements for any valid authorization. Covered entities must produce records within 30 days of receipt.",
    penaltiesOrConsequences: "Covered entities failing to comply within statutory timelines face Department of Health and Human Services (HHS) OCR complaints and state licensing investigations.",
  },
};

// 9. PET ADDENDUM STATUTES
const PET_ADDENDUM_OVERRIDES: StateStatuteMap = {
  CA: {
    statuteCitation: "Cal. Civ. Code Section 1950.5 & Fair Employment and Housing Act (FEHA)",
    statuteName: "California Security Deposit and Assistance Animal Protection Law",
    noticePeriodDays: "Term of Lease",
    courtJurisdiction: "Superior Court of California",
    serviceMethods: ["Executed Addendum Attached to Written Residential Lease"],
    keyRequirements: [
      "Total security deposit including pet deposit cannot exceed statutory maximums under Cal. Civ. Code 1950.5 (AB 12 cap of 1 month rent)",
      "Strict exemption: Assistance animals and service dogs cannot be charged pet rent, pet fees, or pet deposits under California law",
      "Tenant strict liability for all physical property damage, carpet damage, and personal injury caused by pet",
      "Immediate right of landlord to demand pet removal if pet displays aggressive behavior or creates a nuisance",
    ],
    statuteSummary: "Under California law, total security deposits (including any pet deposit) are restricted by statute. Service and emotional support animals are exempt from all pet fees under FEHA and federal Fair Housing laws.",
    penaltiesOrConsequences: "Breach of pet covenants constitutes non-monetary lease violation subject to 3-day notice to cure or quit.",
  },
  TX: {
    statuteCitation: "Tex. Prop. Code Section 92.102 et seq.",
    statuteName: "Texas Property Code Security Deposit and Pet Regulation Rules",
    noticePeriodDays: "Term of Lease",
    courtJurisdiction: "Justice of the Peace Court of Texas",
    serviceMethods: ["Signed Written Addendum Incorporated into Lease"],
    keyRequirements: [
      "Clear distinction between refundable pet deposit and non-refundable pet administration fee",
      "Detailed pet profile: breed, age, weight, rabies tag number, and photographic identification",
      "Leash requirement in all common areas and mandatory pet waste cleanup clauses",
      "Full indemnification of landlord for third-party dog bite or injury claims",
    ],
    statuteSummary: "Texas allows landlords to establish pet policies, refundable deposits, and non-refundable fees, provided they comply with Texas Property Code accounting standards and federal Fair Housing requirements.",
    penaltiesOrConsequences: "Unauthorized pets incur daily unauthorized pet fines and lease termination proceedings.",
  },
  FL: {
    statuteCitation: "Fla. Stat. Section 83.49 & Florida Service Animal Statute Section 413.08",
    statuteName: "Florida Residential Landlord-Tenant Act and Pet Deposit Rules",
    noticePeriodDays: "Term of Lease",
    courtJurisdiction: "County Court of Florida",
    serviceMethods: ["Written Addendum Executed by Landlord and All Adult Tenants"],
    keyRequirements: [
      "Pet deposits held in Florida banking institution in compliance with Fla. Stat. 83.49",
      "Service and support animal exemptions under Florida law and Fair Housing Act",
      "Rules regarding noise disturbance, common area control, and exterior flea treatments",
      "Liquidated damages for unauthorized pet presence",
    ],
    statuteSummary: "Florida law permits pet deposits and monthly pet fees, provided funds are deposited in designated escrow accounts and accounting notices are mailed within 30 days of lease termination.",
    penaltiesOrConsequences: "7-day notice to cure for pet policy violations, followed by eviction proceedings for non-compliance.",
  },
  NY: {
    statuteCitation: "NYC Admin. Code Section 27-2009.1 (NYC Pet Law) & N.Y. Gen. Oblig. Law Section 7-108",
    statuteName: "New York Pet Regulation and Security Deposit Act",
    noticePeriodDays: "Term of Lease",
    courtJurisdiction: "Civil Court of the City of New York / Local Court",
    serviceMethods: ["Written Addendum Attached to Primary Rental Agreement"],
    keyRequirements: [
      "NYC 3-Month Pet Rule: Landlord waives no-pet clause if tenant harbors pet openly for 3 months without legal action",
      "Under Statewide HSTPA, total security deposit is strictly capped at one month rent; additional pet deposits exceeding one month are prohibited",
      "Comprehensive pet identification and veterinary immunization warranty",
    ],
    statuteSummary: "In New York State, total security deposits are strictly capped at 1 month rent by the 2019 HSTPA. Additional pet deposits cannot exceed this ceiling. New York City also enforces the 90-day pet waiver law.",
    penaltiesOrConsequences: "Violation of pet rules subject to 10-day notice to cure.",
  },
};

// 10. EQUIPMENT RENTAL AGREEMENT STATUTES
const EQUIPMENT_RENTAL_OVERRIDES: StateStatuteMap = {
  ALL_STATES: {
    statuteCitation: "Uniform Commercial Code (UCC) Article 2A - Leases",
    statuteName: "Uniform Commercial Code Article 2A Leases of Personal Property",
    noticePeriodDays: "Immediate on Default",
    courtJurisdiction: "State Courts of Competent Jurisdiction",
    serviceMethods: ["Executed Master Equipment Rental Agreement and Delivery Receipt"],
    keyRequirements: [
      "Enforceability of true equipment lease covenants under UCC Article 2A",
      "Immediate transfer of risk of loss to renter upon taking physical possession",
      "Disclaimer of implied warranties of merchantability and fitness for a particular purpose (UCC 2A-214)",
      "Strict indemnification holding owner harmless from operational injuries, damages, or third-party liabilities",
      "Immediate right of repossession without breach of peace upon payment default or unauthorized transfer",
      "Security deposit provisions covering damage, cleaning fees, and replacement costs",
    ],
    statuteSummary: "UCC Article 2A is enacted in 49 US States and District of Columbia, providing statutory framework for personal property leases, remedies on default, warranty disclaimers, and risk of loss allocations.",
    penaltiesOrConsequences: "Summary repossession of equipment, conversion charges, and civil money judgment for full replacement value.",
  },
};

// Universal helper to get statute info for any document and state
export function getStatuteForDocumentAndState(docSlug: string, stateCode: string): StateStatuteInfo {
  const state = getStateByCode(stateCode) || US_STATES[0];
  const sc = state.code;

  let base: Partial<StateStatuteInfo> | undefined;

  switch (docSlug) {
    case "cease-and-desist":
      base = CEASE_DESIST_OVERRIDES[sc];
      if (!base) {
        base = {
          statuteCitation: `${state.name} Civil Remedies & Harassment Protection Rules`,
          statuteName: `${state.name} Civil Injunction and Tort Notice Rules`,
          noticePeriodDays: 14,
          courtJurisdiction: state.courtSystemName,
          serviceMethods: ["Certified Mail Return Receipt Requested", "Personal Service", "First-Class Mail"],
          keyRequirements: [
            "Formal written notification of unlawful harassment, defamation, or interference",
            "Direct demand to cease and desist all offending conduct within 14 calendar days",
            "Notice that continuing conduct demonstrates malice and bad faith in court proceedings",
            "Litigation hold on all relevant paper records, digital communications, and server data",
          ],
          statuteSummary: `In ${state.name}, serving a pre-suit cease and desist notice establishes a factual record that the offending party was provided written notification and elected to continue in bad faith.`,
          penaltiesOrConsequences: "Injunctive relief in civil court, liability for actual damages, and statutory attorney fees.",
        };
      }
      break;

    case "demand-letter":
      base = DEMAND_LETTER_OVERRIDES[sc];
      if (!base) {
        base = {
          statuteCitation: `${state.name} Rules of Civil Procedure & Pre-Suit Demand Standards`,
          statuteName: `${state.name} Small Claims and Pre-Suit Notice Rules`,
          noticePeriodDays: 15,
          courtJurisdiction: state.courtSystemName,
          serviceMethods: ["Certified Mail Return Receipt Requested", "First-Class Mail with Proof of Mailing"],
          keyRequirements: [
            "Itemized statement of principal debt, contract details, and unpaid invoices",
            "Notice of statutory pre-judgment and post-judgment interest accrual",
            "Definite deadline for full payment (15 to 30 days)",
            `Notice of intent to file civil action in ${state.courtSystemName} (Limit: ${state.smallClaimsLimit})`,
          ],
          statuteSummary: `Under ${state.name} law, courts expect claimants to have extended a reasonable written opportunity to settle before commencing formal litigation. Compliance preserves claims for court costs.`,
          penaltiesOrConsequences: `Civil judgment up to ${state.smallClaimsLimit} in small claims or unlimited in general civil, plus court costs.`,
        };
      }
      break;

    case "rent-increase-notice":
      base = RENT_INCREASE_OVERRIDES[sc];
      if (!base) {
        base = {
          statuteCitation: `${state.name} Residential Landlord and Tenant Act`,
          statuteName: `${state.name} Notice of Rental Change and Tenancy Rules`,
          noticePeriodDays: 30,
          courtJurisdiction: state.courtSystemName,
          serviceMethods: ["Personal Delivery to Tenant", "Posting on Main Entry Door", "Certified Mail"],
          keyRequirements: [
            "Minimum 30 days advance written notice prior to next monthly rental period",
            "Notice cannot increase rent during fixed-term lease unless expressly allowed by lease agreement",
            "Clear breakdown of existing rent, new rent amount, and payment effective date",
          ],
          statuteSummary: `Under ${state.name} landlord-tenant statutes, rent increases on periodic tenancies require at least 30 days advance written notice prior to the beginning of the rental period.`,
          penaltiesOrConsequences: "Defective notice renders the rent increase void; tenant is only required to pay current rent.",
        };
      }
      break;

    case "notice-of-intent-to-enter":
      base = INTENT_TO_ENTER_OVERRIDES[sc];
      if (!base) {
        base = {
          statuteCitation: `${state.name} Landlord Right of Entry and Tenant Quiet Enjoyment Rules`,
          statuteName: `${state.name} Residential Access and Privacy Standards`,
          noticePeriodDays: "24 Hours",
          courtJurisdiction: state.courtSystemName,
          serviceMethods: ["Written Notice Delivered to Tenant", "Posted on Entry Door", "Certified Mail"],
          keyRequirements: [
            "Minimum 24 hours advance written notice for routine inspection, maintenance, or contractor access",
            "Entry restricted to reasonable daytime hours",
            "Clear statement of purpose: necessary repair, inspection, or prospective buyer showing",
          ],
          statuteSummary: `In ${state.name}, landlords must provide at least 24 hours advance written notice before entering rented premises for non-emergency inspections or agreed repairs.`,
          penaltiesOrConsequences: "Unlawful entry violates tenant quiet enjoyment and exposes landlord to trespass and civil damages.",
        };
      }
      break;

    case "lease-violation-notice":
      base = LEASE_VIOLATION_OVERRIDES[sc];
      if (!base) {
        base = {
          statuteCitation: `${state.name} Residential Tenancy Notice of Breach and Eviction Code`,
          statuteName: `${state.name} Notice to Cure or Quit Statute`,
          noticePeriodDays: 7,
          courtJurisdiction: state.courtSystemName,
          serviceMethods: ["Hand Delivery to Tenant", "Leaving with Adult at Residence", "Posting on Door and Mailing"],
          keyRequirements: [
            "Statutory notice period (typically 3 to 14 days based on state rules) to cure default or surrender property",
            "Detailed factual description of lease violation citing specific lease agreement section",
            "Clear explanation of corrective action required to cure violation",
          ],
          statuteSummary: `In ${state.name}, a tenant who violates a lease condition must be given formal written notice specifying the violation and providing statutory days to cure before eviction filing.`,
          penaltiesOrConsequences: `Filing of summary eviction lawsuit in ${state.courtSystemName}, judgment for possession, and court costs.`,
        };
      }
      break;

    case "release-of-liability":
      base = RELEASE_LIABILITY_OVERRIDES[sc];
      if (!base) {
        base = {
          statuteCitation: `${state.name} General Obligations and Contract Release Rules`,
          statuteName: `${state.name} Settlement Agreement and Liability Waiver Standards`,
          noticePeriodDays: "Immediate upon execution",
          courtJurisdiction: state.courtSystemName,
          serviceMethods: ["Signed Written Agreement with Dual Execution Counterparts"],
          keyRequirements: [
            "Comprehensive release and discharge of all claims, known and unknown, arising from specified incident",
            "Express mutual covenant not to sue in any state or federal court",
            "Clear recitation of valid legal consideration paid and received",
            "Severability and complete integration clauses",
          ],
          statuteSummary: `Under ${state.name} contract law, a signed written release supported by consideration completely bars all subsequent legal actions relating to the settled incident.`,
          penaltiesOrConsequences: "Immediate motion for dismissal with prejudice and recovery of costs for breach of covenant not to sue.",
        };
      }
      break;

    case "mechanics-lien-notice":
      base = MECHANICS_LIEN_OVERRIDES[sc];
      if (!base) {
        base = {
          statuteCitation: `${state.name} Mechanics Lien and Materialman Payment Protection Law`,
          statuteName: `${state.name} Construction Lien and Pre-Lien Notice Rules`,
          noticePeriodDays: 10,
          courtJurisdiction: state.courtSystemName,
          serviceMethods: ["Certified Mail Return Receipt Requested to Property Owner"],
          keyRequirements: [
            "Pre-lien notice of intent warning owner of upcoming real estate lien filing",
            "Itemized breakdown of labor, materials, equipment, and unpaid contract balance",
            "Legal description and physical address of the improved real property",
            "Verification of contractor license and performance of work",
          ],
          statuteSummary: `In ${state.name}, serving a formal Notice of Intent to File Lien provides property owners a final opportunity to satisfy contractor balances before an encumbrance is recorded on title.`,
          penaltiesOrConsequences: "Recording of verified mechanics lien on county land records, title cloud, and foreclosure action.",
        };
      }
      break;

    case "hipaa-medical-release":
      base = {
        ...HIPAA_OVERRIDES.ALL_STATES,
        courtJurisdiction: state.courtSystemName,
      };
      break;

    case "pet-addendum":
      base = PET_ADDENDUM_OVERRIDES[sc];
      if (!base) {
        base = {
          statuteCitation: `${state.name} Residential Lease Regulations & Federal Fair Housing Act`,
          statuteName: `${state.name} Residential Pet Lease Rules`,
          noticePeriodDays: "Term of Lease",
          courtJurisdiction: state.courtSystemName,
          serviceMethods: ["Signed Addendum Executed by Landlord and Tenant"],
          keyRequirements: [
            "Specific pet identification, breed, weight, and veterinary verification",
            "Definition of refundable pet deposit or pet fee compliant with state deposit limits",
            "Mandatory exemption for qualified service and assistance animals under federal and state law",
            "Tenant assumption of full liability and indemnity for any pet damage or nuisance",
          ],
          statuteSummary: `In ${state.name}, residential landlords may regulate pets through written lease addenda, establishing deposit terms and conduct rules while observing assistance animal exemptions.`,
          penaltiesOrConsequences: "Pet policy breach constitutes lease violation subject to notice to cure or pet removal demand.",
        };
      }
      break;

    case "equipment-rental-agreement":
      base = {
        ...EQUIPMENT_RENTAL_OVERRIDES.ALL_STATES,
        courtJurisdiction: state.courtSystemName,
      };
      break;

    default:
      base = {
        statuteCitation: `${state.name} General Statutes and Administrative Code`,
        statuteName: `${state.name} Legal Notice and Contract Standards`,
        noticePeriodDays: 14,
        courtJurisdiction: state.courtSystemName,
        serviceMethods: ["Certified Mail Return Receipt Requested", "Personal Service"],
        keyRequirements: ["Proper written notice", "Clear specification of rights and obligations"],
        statuteSummary: `Governed by applicable ${state.name} state statutes and rules of civil procedure.`,
      };
  }

  return {
    stateCode: state.code,
    stateName: state.name,
    statuteCitation: base.statuteCitation || `${state.name} Legal Code`,
    statuteName: base.statuteName || `${state.name} Civil Rules`,
    noticePeriodDays: base.noticePeriodDays || 14,
    serviceMethods: base.serviceMethods || ["Certified Mail Return Receipt Requested", "Personal Hand Delivery"],
    courtJurisdiction: base.courtJurisdiction || state.courtSystemName,
    keyRequirements: base.keyRequirements || [
      "Formal written documentation",
      "Compliance with state statutory notice windows",
      "Proof of verified service",
    ],
    statuteSummary: base.statuteSummary || `Governed by statutory and common law standards of ${state.name}.`,
    penaltiesOrConsequences: base.penaltiesOrConsequences || "Civil litigation, entry of court judgment, and liability for court costs.",
  };
}
