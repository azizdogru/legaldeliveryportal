import { StateStatuteInfo } from "@/types/document";
import { US_STATES, getStateByCode } from "../usStates";

// Specific state citation database mapping
interface StateLegalProfile {
  legalCodePrefix: string;
  defaultNoticeDays: number;
  statutoryInterest: string;
  entryNoticeHours: string;
  cureDays: number;
  rentIncreaseNoticeDays: number;
  lienNoticeDays: number;
  uniqueStateGuidance: string;
}

const STATE_LEGAL_PROFILES: Record<string, StateLegalProfile> = {
  AL: { legalCodePrefix: "Ala. Code", defaultNoticeDays: 14, statutoryInterest: "7.5% per annum", entryNoticeHours: "48 Hours", cureDays: 7, rentIncreaseNoticeDays: 30, lienNoticeDays: 30, uniqueStateGuidance: "Alabama Uniform Residential Landlord and Tenant Act governs cure notices and lease remedies with strict formal delivery." },
  AK: { legalCodePrefix: "Alaska Stat.", defaultNoticeDays: 10, statutoryInterest: "10.5% per annum", entryNoticeHours: "24 Hours", cureDays: 10, rentIncreaseNoticeDays: 30, lienNoticeDays: 15, uniqueStateGuidance: "Alaska statutes require written notice specifying breach of tenant obligations with a strict 10-day right of cure." },
  AZ: { legalCodePrefix: "Ariz. Rev. Stat. (A.R.S.)", defaultNoticeDays: 10, statutoryInterest: "10% per annum", entryNoticeHours: "48 Hours", cureDays: 10, rentIncreaseNoticeDays: 30, lienNoticeDays: 20, uniqueStateGuidance: "Arizona Residential Landlord and Tenant Act mandates 48 hours written notice for entry and 20-day preliminary notice for contractor lien rights." },
  AR: { legalCodePrefix: "Ark. Code Ann.", defaultNoticeDays: 14, statutoryInterest: "6% per annum", entryNoticeHours: "24 Hours", cureDays: 14, rentIncreaseNoticeDays: 30, lienNoticeDays: 10, uniqueStateGuidance: "Arkansas real property procedures enforce strict written pre-suit presentment before small claims or circuit court filings." },
  CA: { legalCodePrefix: "Cal. Civ. Code & Cal. Civ. Proc. Code", defaultNoticeDays: 3, statutoryInterest: "10% per annum", entryNoticeHours: "24 Hours", cureDays: 3, rentIncreaseNoticeDays: 30, lienNoticeDays: 20, uniqueStateGuidance: "California enforces AB 1482 rent caps (5% plus regional CPI), 3-day notice to perform or quit under Section 1161(3), and Civil Code Section 1542 unknown claims waivers." },
  CO: { legalCodePrefix: "Colo. Rev. Stat. (C.R.S.)", defaultNoticeDays: 10, statutoryInterest: "8% per annum", entryNoticeHours: "48 Hours", cureDays: 10, rentIncreaseNoticeDays: 60, lienNoticeDays: 10, uniqueStateGuidance: "Colorado requires a mandatory 10-day notice to cure or quit for residential lease violations under CRS Section 13-40-104 and 60 days for rent increases on periodic tenancies." },
  CT: { legalCodePrefix: "Conn. Gen. Stat.", defaultNoticeDays: 15, statutoryInterest: "8% per annum", entryNoticeHours: "24 Hours", cureDays: 15, rentIncreaseNoticeDays: 30, lienNoticeDays: 90, uniqueStateGuidance: "Connecticut law requires a 15-day notice to remedy before summary process eviction actions may commence." },
  DE: { legalCodePrefix: "Del. Code Ann. tit. 25", defaultNoticeDays: 7, statutoryInterest: "5% over federal discount rate", entryNoticeHours: "48 Hours", cureDays: 7, rentIncreaseNoticeDays: 60, lienNoticeDays: 30, uniqueStateGuidance: "Delaware Landlord-Tenant Code requires 48 hours notice to enter premises and 60 days advance notice for rental modifications." },
  DC: { legalCodePrefix: "D.C. Code", defaultNoticeDays: 30, statutoryInterest: "6% per annum", entryNoticeHours: "48 Hours", cureDays: 30, rentIncreaseNoticeDays: 30, lienNoticeDays: 90, uniqueStateGuidance: "District of Columbia provides extensive tenant protections under Title 42, including a mandatory 30-day notice to correct violations." },
  FL: { legalCodePrefix: "Fla. Stat.", defaultNoticeDays: 7, statutoryInterest: "CFO Statutory Rate (approx 9%)", entryNoticeHours: "24 Hours", cureDays: 7, rentIncreaseNoticeDays: 60, lienNoticeDays: 45, uniqueStateGuidance: "Florida Statute 83.56(2) provides 7 days to cure lease noncompliance. Construction liens require a 45-day Notice to Owner under Fla. Stat. 713.06." },
  GA: { legalCodePrefix: "Ga. Code Ann. (O.C.G.A.)", defaultNoticeDays: 7, statutoryInterest: "7% legal rate", entryNoticeHours: "24 Hours", cureDays: 7, rentIncreaseNoticeDays: 60, lienNoticeDays: 30, uniqueStateGuidance: "Georgia requires formal written demand for possession prior to dispossessory proceedings and 60 days notice to change month-to-month rent." },
  HI: { legalCodePrefix: "Haw. Rev. Stat. (HRS)", defaultNoticeDays: 10, statutoryInterest: "10% per annum", entryNoticeHours: "48 Hours", cureDays: 10, rentIncreaseNoticeDays: 45, lienNoticeDays: 45, uniqueStateGuidance: "Hawaii Residential Landlord-Tenant Code mandates 48 hours notice of entry and 45 days written notice for rent increases." },
  ID: { legalCodePrefix: "Idaho Code", defaultNoticeDays: 3, statutoryInterest: "12% per annum", entryNoticeHours: "24 Hours", cureDays: 3, rentIncreaseNoticeDays: 30, lienNoticeDays: 90, uniqueStateGuidance: "Idaho Code Section 6-303 governs 3-day notice requirements for lease covenant breaches." },
  IL: { legalCodePrefix: "735 ILCS & 765 ILCS", defaultNoticeDays: 10, statutoryInterest: "5% written / 9% judgment", entryNoticeHours: "24 Hours", cureDays: 10, rentIncreaseNoticeDays: 30, lienNoticeDays: 90, uniqueStateGuidance: "Illinois mandates a 10-day notice to quit for lease condition violations under 735 ILCS 5/9-210, with strict delivery proof." },
  IN: { legalCodePrefix: "Ind. Code", defaultNoticeDays: 10, statutoryInterest: "8% per annum", entryNoticeHours: "Reasonable notice", cureDays: 10, rentIncreaseNoticeDays: 30, lienNoticeDays: 60, uniqueStateGuidance: "Indiana requires written notice specifying tenant noncompliance with opportunity to remedy before lease forfeiture." },
  IA: { legalCodePrefix: "Iowa Code", defaultNoticeDays: 7, statutoryInterest: "Statutory legal rate", entryNoticeHours: "24 Hours", cureDays: 7, rentIncreaseNoticeDays: 30, lienNoticeDays: 30, uniqueStateGuidance: "Iowa Uniform Residential Landlord and Tenant Act establishes a mandatory 7-day cure period for lease breaches." },
  KS: { legalCodePrefix: "Kan. Stat. Ann. (K.S.A.)", defaultNoticeDays: 14, statutoryInterest: "10% per annum", entryNoticeHours: "Reasonable notice", cureDays: 14, rentIncreaseNoticeDays: 30, lienNoticeDays: 90, uniqueStateGuidance: "Kansas statutory notice requires 14 days to remedy a lease breach, or the tenancy terminates 30 days after notice delivery." },
  KY: { legalCodePrefix: "Ky. Rev. Stat. (KRS)", defaultNoticeDays: 14, statutoryInterest: "8% per annum", entryNoticeHours: "48 Hours", cureDays: 14, rentIncreaseNoticeDays: 30, lienNoticeDays: 75, uniqueStateGuidance: "Kentucky Uniform Residential Landlord and Tenant Act specifies a 14-day cure window for noncompliance." },
  LA: { legalCodePrefix: "La. Civ. Code & La. Code Civ. Proc.", defaultNoticeDays: 5, statutoryInterest: "Judicial interest rate", entryNoticeHours: "24 Hours", cureDays: 5, rentIncreaseNoticeDays: 30, lienNoticeDays: 60, uniqueStateGuidance: "Louisiana summary eviction procedures under CCP Article 4701 provide a 5-day notice to vacate upon default." },
  ME: { legalCodePrefix: "Me. Rev. Stat. tit. 14 (M.R.S.)", defaultNoticeDays: 7, statutoryInterest: "Statutory rate", entryNoticeHours: "24 Hours", cureDays: 7, rentIncreaseNoticeDays: 45, lienNoticeDays: 90, uniqueStateGuidance: "Maine requires 45 days written advance notice for rent increases and a 7-day notice of default for lease violations." },
  MD: { legalCodePrefix: "Md. Code Ann. Real Prop.", defaultNoticeDays: 30, statutoryInterest: "6% per annum", entryNoticeHours: "24 Hours", cureDays: 30, rentIncreaseNoticeDays: 60, lienNoticeDays: 120, uniqueStateGuidance: "Maryland Real Property Article 8-402.1 requires 30 days written notice of lease breach before filing for restitution." },
  MA: { legalCodePrefix: "Mass. Gen. Laws ch. 186 (M.G.L.)", defaultNoticeDays: 14, statutoryInterest: "12% contract rate", entryNoticeHours: "24 Hours", cureDays: 14, rentIncreaseNoticeDays: 30, lienNoticeDays: 30, uniqueStateGuidance: "Massachusetts law requires strictly phrased notice to quit and provides 12% statutory prejudgment interest on contract claims." },
  MI: { legalCodePrefix: "Mich. Comp. Laws (MCL)", defaultNoticeDays: 7, statutoryInterest: "Variable statutory rate", entryNoticeHours: "24 Hours", cureDays: 7, rentIncreaseNoticeDays: 30, lienNoticeDays: 90, uniqueStateGuidance: "Michigan summary proceedings act provides 7 days notice to cure or quit for health hazards or lease defaults." },
  MN: { legalCodePrefix: "Minn. Stat.", defaultNoticeDays: 14, statutoryInterest: "4% to 10% statutory", entryNoticeHours: "24 Hours", cureDays: 14, rentIncreaseNoticeDays: 30, lienNoticeDays: 120, uniqueStateGuidance: "Minnesota requires written notice before entry under Section 504B.211 and statutory pre-lien notices for contractors." },
  MS: { legalCodePrefix: "Miss. Code Ann.", defaultNoticeDays: 14, statutoryInterest: "8% per annum", entryNoticeHours: "Reasonable notice", cureDays: 14, rentIncreaseNoticeDays: 30, lienNoticeDays: 30, uniqueStateGuidance: "Mississippi Residential Landlord and Tenant Act establishes a 14-day notice to remedy a lease breach." },
  MO: { legalCodePrefix: "Mo. Rev. Stat.", defaultNoticeDays: 10, statutoryInterest: "9% per annum", entryNoticeHours: "Reasonable notice", cureDays: 10, rentIncreaseNoticeDays: 30, lienNoticeDays: 10, uniqueStateGuidance: "Missouri mandates a 10-day notice of intent to file mechanic's lien before recording with the circuit clerk." },
  MT: { legalCodePrefix: "Mont. Code Ann. (MCA)", defaultNoticeDays: 14, statutoryInterest: "10% per annum", entryNoticeHours: "24 Hours", cureDays: 3, rentIncreaseNoticeDays: 30, lienNoticeDays: 20, uniqueStateGuidance: "Montana Residential Landlord and Tenant Act specifies 3 days notice for unauthorized pets or people, 14 days for other breaches." },
  NE: { legalCodePrefix: "Neb. Rev. Stat.", defaultNoticeDays: 14, statutoryInterest: "Statutory rate", entryNoticeHours: "24 Hours", cureDays: 14, rentIncreaseNoticeDays: 30, lienNoticeDays: 120, uniqueStateGuidance: "Nebraska Uniform Residential Landlord and Tenant Act requires a 14/30-day notice to remedy lease noncompliance." },
  NV: { legalCodePrefix: "Nev. Rev. Stat. (NRS)", defaultNoticeDays: 5, statutoryInterest: "Prime + 2% per annum", entryNoticeHours: "24 Hours", cureDays: 5, rentIncreaseNoticeDays: 60, lienNoticeDays: 15, uniqueStateGuidance: "Nevada mandates 60 days notice for rent increases and a 5-day notice to cure lease violations under NRS 40.2516." },
  NH: { legalCodePrefix: "N.H. Rev. Stat. Ann. (RSA)", defaultNoticeDays: 30, statutoryInterest: "Statutory legal rate", entryNoticeHours: "Adequate notice", cureDays: 30, rentIncreaseNoticeDays: 30, lienNoticeDays: 90, uniqueStateGuidance: "New Hampshire RSA 540 requires 30 days notice to quit for residential lease violations with formal service." },
  NJ: { legalCodePrefix: "N.J. Stat. Ann. (N.J.S.A.)", defaultNoticeDays: 30, statutoryInterest: "New Jersey court rules rate", entryNoticeHours: "24 Hours", cureDays: 30, rentIncreaseNoticeDays: 30, lienNoticeDays: 90, uniqueStateGuidance: "New Jersey Anti-Eviction Act requires a two-step process: a Notice to Cease followed by a formal 30-day Notice to Quit." },
  NM: { legalCodePrefix: "N.M. Stat. Ann.", defaultNoticeDays: 7, statutoryInterest: "8.75% per annum", entryNoticeHours: "24 Hours", cureDays: 7, rentIncreaseNoticeDays: 30, lienNoticeDays: 90, uniqueStateGuidance: "New Mexico Uniform Owner-Resident Relations Act provides 7 days written notice to cure lease defaults." },
  NY: { legalCodePrefix: "N.Y. Real Prop. Acts. Law & CPLR", defaultNoticeDays: 10, statutoryInterest: "9% per annum (CPLR 5004)", entryNoticeHours: "24 Hours", cureDays: 10, rentIncreaseNoticeDays: 30, lienNoticeDays: 10, uniqueStateGuidance: "New York HSTPA mandates 30/60/90 days rent increase notice based on tenure. Breach notices require 10 days to cure followed by 30 days termination notice." },
  NC: { legalCodePrefix: "N.C. Gen. Stat.", defaultNoticeDays: 10, statutoryInterest: "8% per annum", entryNoticeHours: "Reasonable notice", cureDays: 10, rentIncreaseNoticeDays: 30, lienNoticeDays: 15, uniqueStateGuidance: "North Carolina requires 10 days written demand under NCGS 42-3 and strict notice to lien agents for construction claims." },
  ND: { legalCodePrefix: "N.D. Cent. Code (NDCC)", defaultNoticeDays: 3, statutoryInterest: "6% per annum", entryNoticeHours: "Reasonable notice", cureDays: 3, rentIncreaseNoticeDays: 30, lienNoticeDays: 90, uniqueStateGuidance: "North Dakota Century Code provides 3 days notice to vacate for lease defaults prior to judicial eviction." },
  OH: { legalCodePrefix: "Ohio Rev. Code (R.C.)", defaultNoticeDays: 3, statutoryInterest: "Statutory rate (approx 8%)", entryNoticeHours: "24 Hours", cureDays: 3, rentIncreaseNoticeDays: 30, lienNoticeDays: 21, uniqueStateGuidance: "Ohio R.C. 1923.04 mandates a strict 3-day notice with specific statutory warning text before eviction filings." },
  OK: { legalCodePrefix: "Okla. Stat. tit. 41", defaultNoticeDays: 10, statutoryInterest: "Statutory rate", entryNoticeHours: "24 Hours", cureDays: 10, rentIncreaseNoticeDays: 30, lienNoticeDays: 90, uniqueStateGuidance: "Oklahoma Residential Landlord and Tenant Act establishes a 10-day notice to cure or 15-day termination." },
  OR: { legalCodePrefix: "Or. Rev. Stat. (ORS)", defaultNoticeDays: 14, statutoryInterest: "9% per annum", entryNoticeHours: "24 Hours", cureDays: 14, rentIncreaseNoticeDays: 90, lienNoticeDays: 15, uniqueStateGuidance: "Oregon mandates a strict 90-day notice for rent increases under ORS 90.600 with statewide rent cap (7% + CPI)." },
  PA: { legalCodePrefix: "68 Pa. Stat. & Pa. R. Civ. P.", defaultNoticeDays: 10, statutoryInterest: "6% legal rate", entryNoticeHours: "Reasonable notice", cureDays: 10, rentIncreaseNoticeDays: 30, lienNoticeDays: 30, uniqueStateGuidance: "Pennsylvania Landlord and Tenant Act of 1951 requires 10 days notice for breach. Mechanics liens require 30 days formal notice under 49 P.S. 1501." },
  RI: { legalCodePrefix: "R.I. Gen. Laws", defaultNoticeDays: 20, statutoryInterest: "12% per annum", entryNoticeHours: "48 Hours", cureDays: 20, rentIncreaseNoticeDays: 30, lienNoticeDays: 120, uniqueStateGuidance: "Rhode Island Residential Landlord and Tenant Act mandates 20 days notice specifying the breach to remedy." },
  SC: { legalCodePrefix: "S.C. Code Ann.", defaultNoticeDays: 14, statutoryInterest: "8.75% per annum", entryNoticeHours: "24 Hours", cureDays: 14, rentIncreaseNoticeDays: 30, lienNoticeDays: 90, uniqueStateGuidance: "South Carolina Residential Landlord and Tenant Act provides a 14-day notice to cure lease defaults." },
  SD: { legalCodePrefix: "S.D. Codified Laws (SDCL)", defaultNoticeDays: 3, statutoryInterest: "10% per annum", entryNoticeHours: "24 Hours", cureDays: 3, rentIncreaseNoticeDays: 30, lienNoticeDays: 120, uniqueStateGuidance: "South Dakota SDCL 21-16-2 requires 3 days notice to quit before initiating unlawful detainer actions." },
  TN: { legalCodePrefix: "Tenn. Code Ann. (T.C.A.)", defaultNoticeDays: 14, statutoryInterest: "10% per annum", entryNoticeHours: "24 Hours", cureDays: 14, rentIncreaseNoticeDays: 30, lienNoticeDays: 90, uniqueStateGuidance: "Tennessee Uniform Residential Landlord and Tenant Act mandates 14 days written notice of material noncompliance." },
  TX: { legalCodePrefix: "Tex. Prop. Code & Tex. Civ. Prac. & Rem. Code", defaultNoticeDays: 3, statutoryInterest: "6% to 18% statutory", entryNoticeHours: "24 Hours", cureDays: 3, rentIncreaseNoticeDays: 30, lienNoticeDays: 15, uniqueStateGuidance: "Texas Property Code Section 24.005 requires 3 days notice to vacate. Chapter 38 requires 30 days presentment for attorney fees. Chapter 53 governs monthly trapping notices." },
  UT: { legalCodePrefix: "Utah Code", defaultNoticeDays: 3, statutoryInterest: "10% per annum", entryNoticeHours: "24 Hours", cureDays: 3, rentIncreaseNoticeDays: 30, lienNoticeDays: 30, uniqueStateGuidance: "Utah Code Section 78B-6-802 provides a 3-day notice to perform or quit for lease violations." },
  VT: { legalCodePrefix: "Vt. Stat. Ann. tit. 9 (V.S.A.)", defaultNoticeDays: 30, statutoryInterest: "12% per annum", entryNoticeHours: "48 Hours", cureDays: 30, rentIncreaseNoticeDays: 60, lienNoticeDays: 90, uniqueStateGuidance: "Vermont requires 60 days notice for rent increases and 48 hours notice for landlord access under 9 VSA 4460." },
  VA: { legalCodePrefix: "Va. Code Ann.", defaultNoticeDays: 21, statutoryInterest: "6% legal rate", entryNoticeHours: "72 Hours", cureDays: 21, rentIncreaseNoticeDays: 30, lienNoticeDays: 90, uniqueStateGuidance: "Virginia Residential Landlord and Tenant Act requires a 21/30 day notice: tenant has 21 days to remedy breach, or lease ends at 30 days." },
  WA: { legalCodePrefix: "Wash. Rev. Code (RCW)", defaultNoticeDays: 10, statutoryInterest: "12% per annum", entryNoticeHours: "48 Hours", cureDays: 10, rentIncreaseNoticeDays: 60, lienNoticeDays: 60, uniqueStateGuidance: "Washington RCW 59.18.140 mandates 60 days notice for rent increases. RCW 59.18.150 requires 48 hours notice for inspections and 24 hours for showings." },
  WV: { legalCodePrefix: "W. Va. Code", defaultNoticeDays: 14, statutoryInterest: "Statutory rate", entryNoticeHours: "Reasonable notice", cureDays: 14, rentIncreaseNoticeDays: 30, lienNoticeDays: 60, uniqueStateGuidance: "West Virginia code requires written notice specifying defaults with reasonable opportunity to correct." },
  WI: { legalCodePrefix: "Wis. Stat.", defaultNoticeDays: 5, statutoryInterest: "5% per annum", entryNoticeHours: "12 Hours", cureDays: 5, rentIncreaseNoticeDays: 28, lienNoticeDays: 30, uniqueStateGuidance: "Wisconsin Statute 704.17 provides a 5-day notice to pay or remedy default, or 14-day notice for periodic tenants." },
  WY: { legalCodePrefix: "Wyo. Stat. Ann.", defaultNoticeDays: 3, statutoryInterest: "10% per annum", entryNoticeHours: "Reasonable notice", cureDays: 3, rentIncreaseNoticeDays: 30, lienNoticeDays: 60, uniqueStateGuidance: "Wyoming real property statutes require 3 days notice to quit before eviction proceedings in circuit court." },
};

export function getStatuteForDocumentAndState(docSlug: string, stateCode: string): StateStatuteInfo {
  const state = getStateByCode(stateCode) || US_STATES[0];
  const sc = state.code;
  const profile = STATE_LEGAL_PROFILES[sc] || STATE_LEGAL_PROFILES.CA;

  let noticeDays: string | number = profile.defaultNoticeDays;
  let statuteCitation = `${profile.legalCodePrefix} Applicable Sections`;
  let statuteName = `${state.name} Legal Code and Judicial Rules`;
  let summary = `Governed by the statutory provisions and civil procedure rules of ${state.name}.`;
  let penalties = `Failure to comply may result in civil court litigation in ${state.courtSystemName}, judgment for damages, and liability for court costs and attorney fees.`;
  let keyRequirements = [
    `Formal written notice complying with ${profile.legalCodePrefix}`,
    `Compliance with ${state.name} statutory notice waiting periods`,
    `Verified proof of delivery admissible in ${state.courtSystemName}`,
  ];
  let stateRules: string[] = [
    profile.uniqueStateGuidance,
    `Litigation under this notice is subject to the jurisdictional ceiling of ${state.smallClaimsLimit} in ${state.courtSystemName}.`,
    `Statutory interest applies at ${profile.statutoryInterest} under ${state.name} civil code standards.`,
  ];

  switch (docSlug) {
    case "cease-and-desist":
      noticeDays = 10;
      statuteCitation = `${profile.legalCodePrefix} Civil Injunction, Harassment & Defamation Remedies`;
      statuteName = `${state.name} Civil Remedies and Tort Abatement Standards`;
      summary = `In ${state.name}, serving a pre-suit formal Cease and Desist demand provides written evidentiary notice of wrongful conduct. It establishes intentional malice and bad faith if the conduct persists, qualifying for court injunctions and tort damages in ${state.courtSystemName}.`;
      penalties = `Continued conduct exposes recipient to emergency temporary restraining orders (TRO), civil contempt penalties, and liability for actual and punitive damages.`;
      keyRequirements = [
        `Explicit factual summary of offending conduct and immediate demand to cease`,
        `Formal litigation hold mandating preservation of all electronic communications and records`,
        `Direct notice of intent to seek injunctive orders and damages in ${state.courtSystemName}`,
        `Service via certified mail with signed return receipt to verify recipient delivery`,
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Under ${state.name} civil practice rules, prior written notice is vital to proving defendant acted with knowledge, defeating claims of inadvertence.`,
        `Defamation and civil harassment claims in ${state.name} carry strict statutes of limitations. Serving formal demand creates a clear evidentiary timeline.`,
      ];
      break;

    case "demand-letter":
      noticeDays = profile.defaultNoticeDays;
      statuteCitation = `${profile.legalCodePrefix} Pre-Suit Presentment & Interest Rules`;
      statuteName = `${state.name} Civil Claims Presentment and Statutory Interest Code`;
      summary = `Under ${state.name} civil practice standards, presenting a formal written payment demand prior to filing suit is a vital prerequisite to recovering statutory court costs and attorney fees. Prejudgment interest accrues at ${profile.statutoryInterest}.`;
      penalties = `Failure to satisfy the claim within ${noticeDays} days triggers filing of a civil complaint in ${state.courtSystemName}, seeking principal debt, ${profile.statutoryInterest} interest, and statutory attorney fees.`;
      keyRequirements = [
        `Detailed itemization of principal balance, invoice numbers, and unpaid contract sums`,
        `Clear statement of accrued pre-judgment interest calculated at ${profile.statutoryInterest}`,
        `Strict ${noticeDays}-day cure deadline before formal civil filing`,
        `Notice that unresolved debt will be submitted to ${state.courtSystemName} (Limit: ${state.smallClaimsLimit})`,
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `In ${state.name}, small claims court handles debt disputes up to ${state.smallClaimsLimit}. Formal pre-suit demand must be certified by plaintiff at filing.`,
        `Prejudgment statutory interest accrues at ${profile.statutoryInterest} from the date of default, maximizing recoverable funds upon judgment.`,
      ];
      break;

    case "rent-increase-notice":
      noticeDays = profile.rentIncreaseNoticeDays;
      statuteCitation = `${profile.legalCodePrefix} Residential Rent Adjustment & Notice Statute`;
      statuteName = `${state.name} Residential Tenancy Notice of Rent Adjustment`;
      summary = `Under ${state.name} residential tenancy statutes, landlords must deliver written advance notice of at least ${noticeDays} calendar days before any rental increase may take effect. The notice cannot alter an active fixed-term lease unless explicitly permitted in writing.`;
      penalties = `A rent increase notice that fails to provide the full ${noticeDays}-day statutory window is legally void. The tenant is obligated only to pay the prior legal rent until proper statutory notice is served.`;
      keyRequirements = [
        `Delivery of written notice at least ${noticeDays} full calendar days prior to effective date`,
        `Itemized breakdown showing current rent, dollar increase, and new monthly rental amount`,
        `Compliance with applicable state and local rent stabilization caps`,
        `Notice of tenant option to accept new rent or deliver notice of intent to vacate`,
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `In ${state.name}, periodic month-to-month tenancies require at least ${noticeDays} days notice matching the natural monthly rent cycle.`,
        `If the rental property is subject to municipal or state rent control, the percentage increase must strictly adhere to the published cost-of-living index.`,
      ];
      break;

    case "notice-of-intent-to-enter":
      noticeDays = profile.entryNoticeHours;
      statuteCitation = `${profile.legalCodePrefix} Landlord Right of Entry and Quiet Enjoyment Rules`;
      statuteName = `${state.name} Landlord Right of Entry Standards`;
      summary = `In ${state.name}, residential landlords must provide at least ${profile.entryNoticeHours} advance written notice before entering a tenant dwelling unit for non-emergency repairs, routine inspections, or prospective buyer showings. Entry must occur during reasonable daytime business hours.`;
      penalties = `Entering without providing the mandatory ${profile.entryNoticeHours} statutory notice constitutes trespass, breach of the covenant of quiet enjoyment, and subjects landlord to tenant damages and lease termination.`;
      keyRequirements = [
        `Minimum ${profile.entryNoticeHours} advance written notice delivered to tenant`,
        `Entry scheduled during reasonable business hours or daytime windows`,
        `Statement of lawful statutory purpose: repair, inspection, or prospective buyer showing`,
        `Contact information for tenant to request an alternate daytime time if needed`,
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Under ${state.name} tenancy common law, emergency entries for active water leaks or fire hazards are exempt from the advance notice requirement.`,
        `Tenants in ${state.name} may not unreasonably refuse entry once proper ${profile.entryNoticeHours} written notice has been served.`,
      ];
      break;

    case "lease-violation-notice":
      noticeDays = profile.cureDays;
      statuteCitation = `${profile.legalCodePrefix} Lease Breach & Notice to Cure or Quit Code`;
      statuteName = `${state.name} Notice to Perform Covenant or Quit Statute`;
      summary = `Under ${state.name} law, a tenant who commits a curable non-monetary lease violation (such as unauthorized pets, unauthorized occupants, or noise disturbance) must be served a formal written notice giving at least ${profile.cureDays} days to cure the breach before eviction proceedings may begin.`;
      penalties = `Failure to remedy the violation within ${profile.cureDays} days empowers the landlord to terminate the tenancy and file an unlawful detainer eviction action in ${state.courtSystemName}.`;
      keyRequirements = [
        `Mandatory statutory cure window of at least ${profile.cureDays} days`,
        `Specific factual description of the lease breach citing lease paragraph`,
        `Clear instructions on the exact remedial action required to cure`,
        `Formal server Affidavit of Service to prove timely delivery in eviction court`,
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `In ${state.name}, an eviction suit filed without strictly serving this ${profile.cureDays}-day notice will be dismissed by the court, requiring landlord to restart the process.`,
        `Personal service or conspicuous posting with certified mailing is strictly enforced in ${state.courtSystemName}.`,
      ];
      break;

    case "release-of-liability":
      noticeDays = "Immediate upon execution";
      statuteCitation = `${profile.legalCodePrefix} Contract Releases & Liability Discharge Rules`;
      statuteName = `${state.name} Settlement Agreement and General Release Standards`;
      summary = `In ${state.name}, a properly drafted written release supported by valid consideration operates as a complete defense in bar against subsequent civil lawsuits. Unknown claims are expressly waived to ensure full legal finality.`;
      penalties = `A party attempting to sue after signing this release is subject to immediate dismissal with prejudice, court sanctions, and liability for all attorney fees incurred in enforcing the release.`;
      keyRequirements = [
        `Express discharge of all past, present, and future claims arising from the incident`,
        `Statutory waiver of unknown and unsuspected claims (including Section 1542 principles)`,
        `Mutual covenant not to sue in any state or federal court`,
        `Clear recitation of monetary consideration paid and acknowledged`,
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Under ${state.name} contract jurisprudence, releases signed under mutual mistake or without consideration are vulnerable. This agreement incorporates strict consideration recitals.`,
        `Dual execution lines and optional Notary Jurat ensure maximum admissibility in ${state.courtSystemName}.`,
      ];
      break;

    case "mechanics-lien-notice":
      noticeDays = profile.lienNoticeDays;
      statuteCitation = `${profile.legalCodePrefix} Mechanics and Materialman Lien Statute`;
      statuteName = `${state.name} Construction Lien and Pre-Lien Notice Law`;
      summary = `Under ${state.name} construction lien statutes, serving a formal Notice of Intent to File Lien provides real property owners a final opportunity to settle contractor and subcontractor balances before an official lien encumbers property title.`;
      penalties = `If unpaid within ${noticeDays} days, a verified Claim of Lien will be recorded with the County Recorder, clouding title, halting property financing, and initiating court foreclosure in ${state.courtSystemName}.`;
      keyRequirements = [
        `Pre-lien notice served prior to county land records recording`,
        `Itemized accounting of labor, materials, equipment, and unpaid balances`,
        `Legal description, physical address, and Parcel APN of the real property`,
        `Service upon property owner via USPS Certified Mail Return Receipt Requested`,
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `In ${state.name}, contractors must strictly comply with preliminary notice deadlines to preserve real estate lien foreclosure remedies.`,
        `Recorded mechanics liens in ${state.name} have priority over subsequent encumbrances and can trigger judicial sheriff sales.`,
      ];
      break;

    case "hipaa-medical-release":
      noticeDays = 30;
      statuteCitation = "45 C.F.R. Section 164.508 & HIPAA Privacy Rule";
      statuteName = "Federal Health Insurance Portability and Accountability Act Privacy Rule";
      summary = `Governed by federal regulations 45 C.F.R. Section 164.508. Disclosing healthcare facilities in ${state.name} are legally required to fulfill valid written authorizations within 30 calendar days.`;
      penalties = `Healthcare entities refusing to produce records upon receipt of a compliant authorization face federal HHS Office for Civil Rights complaints and state licensing discipline.`;
      keyRequirements = [
        "Specific identification of disclosing healthcare provider and authorized recipient",
        "Granular description of medical records, charts, and billing statements to be released",
        "Core federal statements on patient right of revocation and redisclosure warning",
        "Valid patient or legal representative signature and execution date",
      ];
      stateRules = [
        `Healthcare providers in ${state.name} must comply with federal 30-day disclosure deadlines.`,
        `State medical copy fee statutes in ${state.name} cap per-page duplication costs for patients and authorized representatives.`,
      ];
      break;

    case "pet-addendum":
      noticeDays = "Term of Lease";
      statuteCitation = `${profile.legalCodePrefix} Residential Tenancy & Security Deposit Rules`;
      statuteName = `${state.name} Residential Lease Pet Rider Rules`;
      summary = `In ${state.name}, residential landlords may regulate pets through written addenda. Deposits and fees must comply with state statutory security deposit ceilings. Federal Fair Housing Act rules exempt qualified assistance animals from all pet fees.`;
      penalties = `Harboring an unauthorized animal or violating pet covenants constitutes a lease breach subject to ${profile.cureDays}-day notice to cure or quit in ${state.courtSystemName}.`;
      keyRequirements = [
        "Identification of authorized pet breed, weight, rabies tag, and registration",
        "Deposit and fee terms compliant with state residential security deposit caps",
        "Strict rules on leash restraint, sanitation, waste cleanup, and flea control",
        "Tenant indemnification shielding landlord from animal injury and property damage",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Under ${state.name} security deposit statutes, pet deposits must be accounted for and returned at tenancy conclusion subject to allowable damage deductions.`,
        `Assistance and service animals are exempt from pet rent and deposits under state civil rights laws and the federal Fair Housing Act.`,
      ];
      break;

    case "equipment-rental-agreement":
      noticeDays = "Immediate on Default";
      statuteCitation = "Uniform Commercial Code (UCC) Article 2A - Leases";
      statuteName = `${state.name} UCC Article 2A Personal Property Lease Act`;
      summary = `Enacted in ${state.name}, UCC Article 2A provides the statutory legal framework for leases of personal property, equipment repossession remedies, warranty disclaimers, and risk of loss allocations.`;
      penalties = `Failure to return equipment or pay rental rates authorizes immediate repossession without breach of peace, and civil lawsuit for replacement value in ${state.courtSystemName}.`;
      keyRequirements = [
        "Identification of equipment make, model, serial numbers, and condition warranty",
        "Transfer of risk of loss to renter upon physical delivery",
        "Express disclaimer of implied warranties of merchantability and fitness (UCC 2A-214)",
        "Lessee indemnification holding owner harmless from operational injuries and damages",
      ];
      stateRules = [
        `UCC Article 2A in ${state.name} governs lease remedies, default repossession, and damages.`,
        `Claims under equipment leases in ${state.name} may be filed in ${state.courtSystemName} up to ${state.smallClaimsLimit} in small claims division.`,
      ];
      break;

    case "independent-contractor-agreement":
      noticeDays = 14;
      statuteCitation = `${profile.legalCodePrefix} Independent Contractor Classification & Labor Code`;
      statuteName = `${state.name} Independent Contractor and Wage Standards Code`;
      summary = `In ${state.name}, hiring entities must establish worker classification under IRS 20-factor guidelines and state ABC tests. A properly executed agreement substantiates that the contractor is free from control, operates an independent trade, and performs work outside core client operations.`;
      penalties = `Worker misclassification exposes hiring entities to state labor department audits, mandatory retroactive unemployment and workers compensation contributions, and statutory wage penalties in ${state.courtSystemName}.`;
      keyRequirements = [
        "Express declaration of independent contractor status without employee benefits",
        "Complete contractor discretion over performance methods, schedule, and tools",
        "Contractor responsibility for reporting and paying all 1099 self-employment taxes",
        "Comprehensive work-for-hire intellectual property assignment and confidentiality covenants",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Under ${state.name} labor standards, written contracts detailing independent operations provide essential defense evidence during worker classification audits.`,
        `Independent contractors in ${state.name} are exempt from minimum wage and overtime rules provided the statutory classification test is satisfied.`,
      ];
      break;

    case "lien-waiver-release":
      noticeDays = "Immediate upon Payment";
      statuteCitation = `${profile.legalCodePrefix} Statutory Mechanic's Lien Waiver Law`;
      statuteName = `${state.name} Construction Lien Waiver and Release Statutes`;
      summary = `Construction lien waivers in ${state.name} are strictly regulated to protect contractors, subcontractors, and property owners. Statutory conditional waivers ensure rights are surrendered only after payment clears, while unconditional releases provide title certainty.`;
      penalties = `Signing an unconditional waiver prior to receiving cleared funds forfeits lien rights irrevocably under ${state.name} law, leaving the claimant with breach of contract remedies only.`;
      keyRequirements = [
        "Exact statutory wording for conditional vs unconditional progress or final release",
        "Explicit through-date defining the period of furnished labor and materials covered",
        "Specific enumeration of exceptions for retainage, unapproved change orders, or disputed extras",
        "Sworn contractor execution under penalty of perjury",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `In ${state.name}, statutory lien waiver forms cannot be altered by contract to waive rights prior to progress or final payment.`,
        `Unconditional waivers become legally binding upon signature regardless of whether the issuing check subsequently clears.`,
      ];
      break;

    case "living-will-directive":
      noticeDays = "Immediate Upon Incapacity";
      statuteCitation = `${profile.legalCodePrefix} Health Care Decisions & Advance Directive Act`;
      statuteName = `${state.name} Uniform Health-Care Decisions and Probate Code`;
      summary = `Under ${state.name} probate and healthcare codes, competent adults have the fundamental legal right to execute an advance directive and designate a healthcare proxy to make medical decisions upon incapacity, including withholding of artificial life support.`;
      penalties = `Without a valid directive in ${state.name}, medical decisions default to statutory next-of-kin hierarchies or require costly, contentious guardianship proceedings in ${state.courtSystemName}.`;
      keyRequirements = [
        "Designation of primary and alternate healthcare agents (Medical Power of Attorney)",
        "Specific instructions regarding artificial nutrition, hydration, and cardiopulmonary resuscitation",
        "Full HIPAA authorization permitting medical proxy access to protected health records",
        "Execution in the presence of two qualified disinterested adult witnesses or a licensed Notary Public",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Under ${state.name} advance directive law, healthcare providers must follow a patient's documented instructions or transfer care promptly.`,
        `Directives executed pursuant to ${state.name} statutory formalities are recognized across healthcare networks statewide.`,
      ];
      break;

    case "firearm-bill-of-sale":
      noticeDays = "Immediate upon Transfer";
      statuteCitation = `18 U.S.C. Section 922 & ${profile.legalCodePrefix} Firearm Transfer Law`;
      statuteName = `Federal Gun Control Act and ${state.name} Firearm Code`;
      summary = `Private firearm transfers in ${state.name} must comply with federal regulations under 18 U.S.C. Section 922(g) and state transfer statutes. Documenting the transaction establishes a formal paper trail and proves the seller did not knowingly transfer a weapon to a prohibited person.`;
      penalties = `Unlawful transfer of a firearm to a prohibited person carries severe federal felony penalties of up to 15 years imprisonment, heavy fines, and civil negligence liability.`;
      keyRequirements = [
        "Detailed firearm ballistic record: serial number, make, model, caliber, and barrel length",
        "Buyer sworn certification of non-prohibited status under federal 18 U.S.C. Section 922(g)",
        "Government-issued photo identification and Concealed Handgun License verification",
        "Seller warranty of unencumbered lawful title and dual signed acknowledgment",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Private sales in ${state.name} must comply with state background check requirements where applicable.`,
        `Maintaining a signed bill of sale protects the lawful transferor if the firearm is subsequently recovered in a crime.`,
      ];
      break;

    case "debt-settlement-agreement":
      noticeDays = profile.defaultNoticeDays;
      statuteCitation = `UCC Section 3-311 & ${profile.legalCodePrefix} Accord and Satisfaction Rules`;
      statuteName = `${state.name} Commercial Code and Debt Compromise Standards`;
      summary = `In ${state.name}, an accord and satisfaction agreement compromises a disputed or delinquent debt for an agreed discounted amount. Once paid pursuant to agreement, the underlying obligation is extinguished as a matter of law.`;
      penalties = `Breach of the settlement agreement or failure to pay authorizes the creditor to sue for the full original balance plus accrued statutory interest at ${profile.statutoryInterest} in ${state.courtSystemName}.`;
      keyRequirements = [
        "Clear accounting of original balance versus negotiated compromise payoff amount",
        "Definitive payment deadline and certified funds remittance method",
        "Stipulation for credit bureau reporting tradeline deletion (pay-for-delete) or status update",
        "IRS Form 1099-C cancellation of debt tax disclosure notice",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Under ${state.name} contract principles, accord and satisfaction requires mutual assent and valid consideration in compromised disputed claims.`,
        `Creditors operating in ${state.name} must comply with fair debt collection practices when executing debt compromises.`,
      ];
      break;

    case "revocation-of-power-of-attorney":
      noticeDays = "Immediate upon Service";
      statuteCitation = `${profile.legalCodePrefix} Uniform Power of Attorney Act`;
      statuteName = `${state.name} Power of Attorney Revocation and Agency Code`;
      summary = `A principal in ${state.name} may revoke an agent's authority at any time while possessing mental capacity. Delivering written notice of revocation to the agent and third-party institutions immediately cuts off apparent authority.`;
      penalties = `Failure to formally serve written revocation upon banks and title agencies leaves the principal exposed to unauthorized transactions under the apparent authority doctrine.`;
      keyRequirements = [
        "Explicit identification of the prior power of attorney instrument and date of execution",
        "Immediate and unconditional cancellation of all financial or healthcare agent powers",
        "Written notification served upon all banks, brokerages, and healthcare systems",
        "County land records recording block for previously recorded real estate powers",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `In ${state.name}, third parties receiving written notice of POA revocation are legally prohibited from honoring agent transactions.`,
        `Recording revocation in the county deed records protects real property from unauthorized encumbrances or transfers.`,
      ];
      break;

    case "parking-space-lease":
      noticeDays = 30;
      statuteCitation = `${profile.legalCodePrefix} Nonconsensual Towing & Parking Statutes`;
      statuteName = `${state.name} Real Property and Commercial Parking Regulations`;
      summary = `Regulates parking stall and vehicle storage rentals in ${state.name}. Incorporates mandatory nonconsensual towing warning language required by state vehicle codes to legally authorize removal of unauthorized or delinquent vehicles.`;
      penalties = `Unauthorized parking or lease breach authorizes landlord impoundment and towing at vehicle owner's expense, plus storage lien enforcement.`;
      keyRequirements = [
        "Designation of specific parking stall, carport, garage bay, or RV storage space",
        "Permitted vehicle identification including license plate, make, model, and registration state",
        "Statutory nonconsensual towing warning posted pursuant to state vehicle code standards",
        "Comprehensive property damage, theft, and vandalism liability waiver",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Towing unauthorized vehicles in ${state.name} requires adherence to statutory signage and notice waiting periods.`,
        `Parking space leases operating on periodic terms require 30 days written notice to terminate under ${state.name} code.`,
      ];
      break;

    case "temporary-guardianship-agreement":
      noticeDays = "Immediate upon Execution";
      statuteCitation = `${profile.legalCodePrefix} Minor Power of Attorney & Caregiver Act`;
      statuteName = `${state.name} Minor Custodial Consent and Caregiver Authorization Law`;
      summary = `Under ${state.name} family codes, custodial parents may temporarily delegate caregiving authority to an adult relative or trusted friend without surrendering permanent parental custody or going through formal family court proceedings.`;
      penalties = `Unauthorized caregiving without parental consent prevents healthcare providers from administering non-emergency medical treatment and blocks public school enrollment.`;
      keyRequirements = [
        "Clear identification of custodial parents, designated temporary caregiver, and minor child",
        "Authority to consent to emergency, surgical, medical, and dental procedures under HIPAA",
        "Authority to enroll child in educational institutions and access student records under FERPA",
        "Parental reservation of right to unilaterally revoke agreement and retrieve child at any time",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Temporary guardianship agreements in ${state.name} typically cannot exceed one year without re-execution or court order.`,
        `Parental consent must be sworn before a licensed Notary Public to satisfy hospital and school district admission requirements.`,
      ];
      break;

    case "affidavit-of-heirship":
      noticeDays = "Immediate upon Recording";
      statuteCitation = `${profile.legalCodePrefix} Intestate Succession & Heirship Evidence Code`;
      statuteName = `${state.name} Estates Code and Heirship Recording Act`;
      summary = `In ${state.name}, an Affidavit of Heirship recorded in county deed records serves as prima facie evidence of family descent and title transfer for real property when an owner dies without a will, avoiding formal probate court administration.`;
      penalties = `Filing a false affidavit of heirship constitutes perjury under state law and subjects the affiant to felony criminal charges and civil fraud damages in ${state.courtSystemName}.`;
      keyRequirements = [
        "Sworn affiant statement by a disinterested individual with personal knowledge of decedent",
        "Exhaustive family genealogy: marital history, surviving spouse, biological and adopted children",
        "Formal real property legal description (Lot/Block or Metes-and-Bounds) and parcel ID",
        "Execution under oath before a licensed Notary Public for recording in county deed records",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Title companies in ${state.name} rely on recorded affidavits of heirship after statutory notice periods to issue title insurance policies.`,
        `Affidavits should be executed by disinterested witnesses who do not inherit any financial interest from the estate.`,
      ];
      break;

    case "non-compete-agreement":
      noticeDays = "Term of Covenant";
      statuteCitation = `${profile.legalCodePrefix} Restrictive Covenant and Trade Secrets Act`;
      statuteName = `${state.name} Employment Restrictive Covenant and Trade Secret Law`;
      summary = `In ${state.name}, post-employment non-compete agreements are strictly scrutinized and enforced only if ancillary to an otherwise enforceable agreement, protecting legitimate business interests, and reasonable in time, geography, and scope of activity. In states where non-competes are void (e.g. California), non-solicitation and trade secret protections apply.`;
      penalties = `Breach of an enforceable covenant authorizes temporary injunctive relief (TRO), preliminary injunctions, and recovery of actual damages and attorney fees in ${state.courtSystemName}.`;
      keyRequirements = [
        "Protection of legitimate business interests: proprietary trade secrets, customer goodwill, specialized training",
        "Reasonable temporal limit (generally 12 to 24 months maximum under state law)",
        "Reasonable geographic radius limited to territories where employee actually performed services",
        "Judicial blue-pencil reformation clause permitting court modification of overbroad covenants",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Under ${state.name} jurisprudence, covenants cannot impose an undue hardship on the employee or harm the general public interest.`,
        `Courts in ${state.name} may exercise blue-pencil discretion to narrow overbroad restrictions rather than declaring the entire agreement void.`,
      ];
      break;

    case "residential-lease-agreement":
      noticeDays = profile.defaultNoticeDays;
      statuteCitation = `${profile.legalCodePrefix} Residential Landlord and Tenant Act`;
      statuteName = `${state.name} Uniform Residential Landlord and Tenant Code`;
      summary = `In ${state.name}, residential lease contracts are governed by statutory habitability requirements, security deposit accounting rules, and mandatory advance notice periods for landlord entry.`;
      penalties = `Lease breach authorizes statutory cure-or-quit notice, lease forfeiture, and judicial eviction proceedings in ${state.courtSystemName}.`;
      keyRequirements = [
        "Compliance with state statutory security deposit ceilings and escrow rules",
        "Adherence to mandatory advance written notice before landlord property entry",
        "Strict warranty of habitability under state housing safety codes",
        "Mandatory federal lead-based paint disclosure for dwellings built before 1978",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Landlord entry in ${state.name} requires at least ${profile.entryNoticeHours} advance written notice for routine inspections or repairs.`,
        `Deposit disputes under this lease are subject to the small claims ceiling of ${state.smallClaimsLimit} in ${state.courtSystemName}.`,
      ];
      break;

    case "eviction-notice-non-payment":
      noticeDays = profile.cureDays;
      statuteCitation = `${profile.legalCodePrefix} Summary Eviction & Unlawful Detainer Code`;
      statuteName = `${state.name} Notice to Pay Rent or Quit Statute`;
      summary = `In ${state.name}, a landlord must serve a formal statutory written notice to pay rent or quit, granting a mandatory cure window before initiating summary eviction proceedings.`;
      penalties = `Failure to pay delinquent rent or surrender possession within ${profile.cureDays} days authorizes immediate filing of an unlawful detainer complaint, writ of restitution, and judgment for unpaid rent and court costs in ${state.courtSystemName}.`;
      keyRequirements = [
        `Strict adherence to the mandatory state statutory ${profile.cureDays}-day cure period`,
        "Itemized delinquent rent ledger with clear breakdown of rent and lawful late fees",
        "Clear payment delivery instructions and accepted payment methods",
        "Formal server Affidavit and Certificate of Service meeting judicial standards",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `In ${state.name}, eviction complaints filed before the full statutory notice period has elapsed are dismissed with prejudice.`,
        `Service must comply with strict state rules: personal in-hand delivery, substituted service, or conspicuous posting with follow-up certified mail.`,
      ];
      break;

    case "notice-of-intent-to-vacate":
      noticeDays = 30;
      statuteCitation = `${profile.legalCodePrefix} Periodic Tenancy Termination & Deposit Accounting Law`;
      statuteName = `${state.name} Residential Tenancy Notice of Surrender Code`;
      summary = `Under ${state.name} law, periodic tenants must provide written notice (typically 30 or 60 days) to terminate tenancy, initiating the landlord's statutory security deposit accounting timeline.`;
      penalties = `Surrendering possession without required statutory notice may leave tenant liable for continued rent until unit is re-rented or term expires under ${state.name} mitigation rules.`;
      keyRequirements = [
        "Delivery of written notice at least 30 days prior to the periodic rental cycle expiration",
        "Designation of formal forwarding address for mandatory security deposit accounting",
        "Request for statutory pre-move joint walkthrough inspection where authorized by state law",
        "Surrender of all keys, remotes, and possession on or before the stated vacate date",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Landlords in ${state.name} must mitigate damages by making reasonable commercial efforts to re-rent the premises following tenant move-out.`,
        `Providing a forwarding address triggers the landlord mandatory statutory return deadline for security deposit accounting.`,
      ];
      break;

    case "roommate-agreement":
      noticeDays = 30;
      statuteCitation = `${profile.legalCodePrefix} General Contract & Joint Obligation Principles`;
      statuteName = `${state.name} Co-Tenant Contract & Contribution Law`;
      summary = `In ${state.name}, roommate contracts establish enforceable rights of contribution and indemnity among co-tenants for rent, utilities, and damage independently of the master landlord.`;
      penalties = `Breaching co-tenant is liable for unpaid rent shares, utility debts, and attorney fees recoverable in ${state.courtSystemName} (Limit: ${state.smallClaimsLimit}).`;
      keyRequirements = [
        "Clear itemization of individual monthly rent shares and utility split ratios",
        "Agreed house rules covering quiet hours, guest stays, and chore rotations",
        "Notice protocol (at least 30 days) and replacement roommate approval procedures for early move-out",
        "Division and reimbursement protocol for shared security deposits",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Contracts between co-tenants are enforceable in ${state.courtSystemName} small claims division up to ${state.smallClaimsLimit}.`,
        `Under ${state.name} law, co-signers on a master lease remain jointly and severally liable to the landlord regardless of private roommate agreements.`,
      ];
      break;

    case "sublease-agreement":
      noticeDays = profile.defaultNoticeDays;
      statuteCitation = `${profile.legalCodePrefix} Subletting and Lease Assignment Regulations`;
      statuteName = `${state.name} Residential Subtenancy Law`;
      summary = `In ${state.name}, sublease agreements are subordinate to the prime master lease and require landlord consent when stipulated by contract. Subtenants are bound by all master covenants.`;
      penalties = `Unauthorized subletting or subtenant default empowers prime lessor to terminate tenancy and evict all occupants through ${state.courtSystemName}.`;
      keyRequirements = [
        "Incorporation and subordinate compliance with the underlying master lease agreement",
        "Written landlord consent rider to prevent lease forfeiture for unauthorized transfer",
        "Distinct sublease security deposit holding and accounting pursuant to state law",
        "Subtenant indemnification protecting prime tenant from lease violations",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `In ${state.name}, prime tenants remain fully liable to the master landlord for rent and property damage during the sublease term.`,
        `Subtenants acquire statutory tenant protections and can only be evicted through formal court proceedings in ${state.courtSystemName}.`,
      ];
      break;

    case "security-deposit-demand":
      noticeDays = 10;
      statuteCitation = `${profile.legalCodePrefix} Security Deposit Holding, Accounting & Penalty Act`;
      statuteName = `${state.name} Security Deposit Return and Treble Damages Law`;
      summary = `Under ${state.name} statutory deposit laws, landlords must return security deposits with itemized invoices within mandatory statutory windows following surrender.`;
      penalties = `Bad-faith withholding in ${state.name} exposes landlord to statutory punitive damages of double or treble the deposit amount, plus court costs and attorney fees in ${state.courtSystemName}.`;
      keyRequirements = [
        "Clear citation of the state statutory deadline following tenant surrender of keys",
        "Itemized contest of improper wear-and-tear deductions or demand for unreturned sum",
        "Formal demand for itemized contractor invoices and actual receipts",
        "Pre-suit notice of intent to sue in small claims court for statutory penalty multipliers",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Landlords in ${state.name} forfeiting statutory deposit deadlines lose all rights to withhold funds and face statutory multiplier damages.`,
        `Small claims lawsuits for unreturned deposits can be filed in ${state.courtSystemName} up to ${state.smallClaimsLimit} without an attorney.`,
      ];
      break;

    case "esa-housing-letter-request":
      noticeDays = 10;
      statuteCitation = `42 U.S.C. Section 3604(f)(3)(B) & ${profile.legalCodePrefix} Fair Housing Act`;
      statuteName = `Federal Fair Housing Act & ${state.name} Human Rights Law`;
      summary = `Governed by federal Fair Housing Act regulations and ${state.name} disability rights statutes. Housing providers must grant reasonable accommodations for emotional support animals.`;
      penalties = `Unlawful denial or imposition of pet fees on assistance animals exposes housing provider to HUD discrimination complaints, state licensing audits, and civil damages.`;
      keyRequirements = [
        "Grounding under federal Fair Housing Act (42 U.S.C. 3604) and HUD Notice FHEO-2020-01",
        "Exemption from all pet deposits, monthly pet rent surcharges, and breed/weight limits",
        "Verification letter from a licensed medical or mental healthcare professional",
        "Mandatory prompt response protocol requiring provider action within 10 business days",
      ];
      stateRules = [
        `Under federal and ${state.name} law, assistance animals are not classified as pets and cannot be charged pet rent.`,
        `Housing providers in ${state.name} cannot demand access to confidential psychiatric records or diagnostic test charts.`,
      ];
      break;

    case "motor-vehicle-bill-of-sale":
      noticeDays = "Immediate upon Delivery";
      statuteCitation = `49 U.S.C. Section 32705 & ${profile.legalCodePrefix} Motor Vehicle Code`;
      statuteName = `Federal Truth in Mileage Act & ${state.name} Vehicle Title Code`;
      summary = `Private motor vehicle transfers in ${state.name} require certified odometer disclosure under federal law, VIN verification, and proper endorsement of state Certificate of Title.`;
      penalties = `False odometer disclosure carries federal and state felony penalties, statutory civil liability, and treble damages.`;
      keyRequirements = [
        "Federal Truth in Mileage Act odometer disclosure statement with mechanical limit certification",
        "Full 17-digit Vehicle Identification Number (VIN), make, model, year, and body type",
        "Express 'as-is, where-is' warranty disclaimer shielding transferor from mechanical claims",
        "Endorsement and physical handover of the valid state Certificate of Title",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Purchasers in ${state.name} must register the vehicle and transfer title with the DMV within state statutory deadlines (typically 10 to 30 days).`,
        `Sellers must promptly file a transfer notification with the state motor vehicle division to eliminate parking and toll liability.`,
      ];
      break;

    case "dmv-release-of-liability":
      noticeDays = 5;
      statuteCitation = `${profile.legalCodePrefix} Motor Vehicle Transfer & Civil Immunity Statute`;
      statuteName = `${state.name} DMV Notice of Transfer and Release of Liability Law`;
      summary = `In ${state.name}, filing a timely Notice of Transfer with the state DMV protects the former owner from civil liability for subsequent traffic accidents, parking violations, and toll charges.`;
      penalties = `Failure to file notice of transfer leaves seller exposed to civil presumption of registered ownership and toll/towing collections.`;
      keyRequirements = [
        "Accurate record of purchaser full legal name, physical address, and contact information",
        "Exact date and odometer reading at the moment of physical custody transfer",
        "Complete vehicle identification: 17-digit VIN, license plate number, year, make, and model",
        "Sworn certification under penalty of perjury meeting DMV submission standards",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Under ${state.name} motor vehicle statutes, timely delivery of transfer notification establishes an affirmative defense against civil traffic liability.`,
        `Toll authorities and parking enforcement agencies in ${state.name} dismiss citations issued after the certified transfer timestamp.`,
      ];
      break;

    case "quitclaim-deed":
      noticeDays = "Immediate upon Recording";
      statuteCitation = `${profile.legalCodePrefix} Real Property Conveyance & Recording Acts`;
      statuteName = `${state.name} Statutory Quitclaim Deed and Land Records Law`;
      summary = `In ${state.name}, a quitclaim deed conveys all existing right, title, and interest of grantor without warranty. Proper county recording gives public constructive notice.`;
      penalties = `Unrecorded deeds are void as against subsequent bona fide purchasers for value under ${state.name} recording acts.`;
      keyRequirements = [
        "Compliant first-page recording margins (3-inch top margin for county recorder stamps)",
        "Assessor's Parcel Number (APN / Tax ID) and formal legal real property description",
        "Nominal consideration recitation ($10.00) and tax statement mailing address",
        "Formal Notary Public acknowledgment jurat conforming to state statutory notary law",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `In ${state.name}, deeds must be recorded in the county where the real property is physically situated to establish priority.`,
        `Grantors transfer only their present interest; a quitclaim deed contains no title warranties or encumbrance covenants.`,
      ];
      break;

    case "general-bill-of-sale":
      noticeDays = "Immediate upon Execution";
      statuteCitation = `UCC Article 2 & ${profile.legalCodePrefix} Commercial Code`;
      statuteName = `${state.name} Uniform Commercial Code Sales Law`;
      summary = `Governs sales of personal property and equipment in ${state.name}. Incorporates UCC warranty of title (UCC 2-312) and lawful 'as-is' warranty disclaimers (UCC 2-316).`;
      penalties = `Breach of title warranty authorizes buyer action for purchase price refund and consequential damages in ${state.courtSystemName}.`;
      keyRequirements = [
        "Unencumbered title warranty confirming property is free of liens, loans, and chattel mortgages",
        "Prominent 'as-is, where-is' disclaimer excluding implied warranties of merchantability and fitness",
        "Detailed identification numbers (make, model, serial number, or vessel registration)",
        "Written receipt acknowledging delivery and payment in full of agreed purchase price",
      ];
      stateRules = [
        `Sales of goods exceeding $500 in ${state.name} must satisfy UCC Statute of Frauds writing requirements.`,
        `Disputes arising under this bill of sale may be litigated in ${state.courtSystemName} up to ${state.smallClaimsLimit} in small claims division.`,
      ];
      break;

    case "llc-operating-agreement":
      noticeDays = "Immediate upon Adoption";
      statuteCitation = `${profile.legalCodePrefix} Limited Liability Company Act (ULLCA)`;
      statuteName = `${state.name} Limited Liability Company Code`;
      summary = `Under ${state.name} corporate law, an operating agreement establishes member governance, capital ownership, voting rules, and preserves the corporate veil shielding owners personal assets.`;
      penalties = `Operating without a written agreement subjects the LLC to statutory default rules and increases vulnerability to piercing of the corporate veil in ${state.courtSystemName}.`;
      keyRequirements = [
        "Designation of operational structure: Member-Managed vs Manager-Managed",
        "Detailed initial capital contributions, ownership percentage interests, and profit distribution rules",
        "Corporate veil protection explicitly shielding members from personal liability for company debts",
        "IRS federal tax classification election (Disregarded Entity, Partnership, or S-Corp)",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `In ${state.name}, an executed operating agreement is required by commercial banks to open entity checking and credit accounts.`,
        `Limited liability protection under ${state.name} law shields personal assets from business creditors absent intentional fraud.`,
      ];
      break;

    case "standard-nda":
      noticeDays = "Term of Agreement";
      statuteCitation = `18 U.S.C. Section 1836 & ${profile.legalCodePrefix} Uniform Trade Secrets Act`;
      statuteName = `Defend Trade Secrets Act & ${state.name} Trade Secret Law`;
      summary = `In ${state.name}, non-disclosure agreements protect proprietary trade secrets, technical know-how, and commercial data with temporary restraining orders and preliminary injunctions.`;
      penalties = `Breach authorizes immediate emergency injunctive relief, recovery of actual damages, unjust enrichment, and attorney fees in ${state.courtSystemName}.`;
      keyRequirements = [
        "Precise definition of confidential information with standard exclusions (public knowledge, prior possession)",
        "Stated duration of confidentiality (multi-year term with trade secrets protected in perpetuity)",
        "Equitable injunctive relief remedies without necessity of posting bond",
        "Mandatory federal Defend Trade Secrets Act (DTSA) whistleblower immunity notice",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Trade secrets under ${state.name} UTSA jurisprudence remain protected indefinitely so long as secrecy is reasonably maintained.`,
        `Injunctions to prevent disclosure may be filed as emergency ex parte applications in ${state.courtSystemName}.`,
      ];
      break;

    case "promissory-note":
      noticeDays = profile.defaultNoticeDays;
      statuteCitation = `UCC Article 3 & ${profile.legalCodePrefix} Usury and Interest Statutes`;
      statuteName = `${state.name} Commercial Paper and Lawful Interest Code`;
      summary = `In ${state.name}, promissory notes represent negotiable instruments governed by UCC Article 3, subject to state statutory usury ceilings (${profile.statutoryInterest}).`;
      penalties = `Default authorizes balance acceleration, collection lawsuits, judgment liens, and recovery of statutory collection attorney fees in ${state.courtSystemName}.`;
      keyRequirements = [
        "Unconditional promise to pay a sum certain in money on demand or at a definite time",
        "Fixed interest rate strictly adhering to state usury caps and non-usurious savings clauses",
        "Default acceleration clause making entire unpaid balance immediately due upon default",
        "Waiver of presentment, demand, notice of dishonor, and recovery of collection attorney fees",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Contract interest in ${state.name} cannot exceed statutory usury caps; excess interest forfeits lender collection rights.`,
        `Promissory notes qualify for expedited summary judgment on negotiable instruments in ${state.courtSystemName}.`,
      ];
      break;

    case "employment-separation-agreement":
      noticeDays = 21;
      statuteCitation = `29 U.S.C. Section 626(f) & ${profile.legalCodePrefix} Fair Employment Practices Act`;
      statuteName = `Older Workers Benefit Protection Act & ${state.name} Labor Code`;
      summary = `In ${state.name}, severance releases require valid consideration beyond earned wages, OWBPA statutory review periods (21/45 days), and 7-day post-execution revocation windows.`;
      penalties = `Failing to comply with statutory waiver formalities renders employee releases of age discrimination and wage claims unenforceable in ${state.courtSystemName}.`;
      keyRequirements = [
        "OWBPA statutory compliance: 21-day consideration period and mandatory 7-day post-execution revocation window",
        "Written advice to consult with independent legal counsel before signing",
        "Comprehensive waiver of federal Title VII, ADA, ADEA, FMLA, and state wage claims",
        "Severance pay consideration paid in excess of all earned wages, commissions, and accrued PTO",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Under ${state.name} labor law, severance cannot be made conditional on waiving non-waivable statutory unemployment or worker compensation rights.`,
        `Earned wages and accrued PTO must be paid regardless of whether employee signs the separation release.`,
      ];
      break;

    case "durable-power-of-attorney":
      noticeDays = "Immediate upon Execution";
      statuteCitation = `${profile.legalCodePrefix} Uniform Power of Attorney Act (UPOAA)`;
      statuteName = `${state.name} Durable Power of Attorney Code`;
      summary = `Under ${state.name} probate statutes, a durable financial power of attorney authorizes an agent to manage real estate, banking, and tax affairs, surviving the principal's mental incapacity.`;
      penalties = `Third parties unreasonably refusing to honor a statutory durable POA in ${state.name} may face court injunctions and liability for attorney fees.`;
      keyRequirements = [
        "Statutory durability provision: 'This power of attorney is not affected by subsequent disability or incapacity of the principal'",
        "Specific enumeration of banking, real estate, business, and tax (IRS Form 2848) powers",
        "Nomination of successor alternate agents to avoid judicial guardianship proceedings",
        "Formal execution before a licensed Notary Public and qualified adult witnesses",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Financial institutions in ${state.name} honoring an executed statutory durable power of attorney are held harmless by statute.`,
        `Agents owe a strict fiduciary duty of loyalty and must maintain accurate financial accountings under ${state.name} probate law.`,
      ];
      break;

    case "last-will-and-testament":
      noticeDays = "Upon Testator Demise";
      statuteCitation = `${profile.legalCodePrefix} Probate Code & Uniform Probate Code`;
      statuteName = `${state.name} Estates and Probate Law`;
      summary = `In ${state.name}, a Last Will and Testament directs distribution of estate assets, nominates executors and minor child guardians, and avoids intestacy laws.`;
      penalties = `Dying without a valid will triggers intestate succession in ${state.courtSystemName}, distributing property under state formulas rather than testator intent.`;
      keyRequirements = [
        "Testator legal capacity, testamentary intent, and express revocation of all prior wills",
        "Appointment of primary Executor (Personal Representative) and alternate without bond requirement",
        "Testamentary guardian designation for minor children to prevent state custody disputes",
        "Statutory Self-Proving Affidavit with two disinterested adult witnesses and Notary Public jurat",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `A self-proving affidavit in ${state.name} allows the will to be admitted to probate without requiring live witness court testimony.`,
        `Surviving spouses in ${state.name} retain statutory elective share rights that cannot be completely disinherited by will.`,
      ];
      break;

    case "child-travel-consent":
      noticeDays = "Travel Itinerary Window";
      statuteCitation = `8 U.S.C. Section 1182 & U.S. Customs and Border Protection Travel Regulations`;
      statuteName = `Federal Border Protection & ${state.name} Parental Custody Standards`;
      summary = `Complies with CBP, TSA, and international airline requirements for minors traveling abroad or domestically with one parent, grandparents, or authorized chaperones.`;
      penalties = `Traveling without verifiable notarized parental consent can lead to denied airline boarding, international border delays, or travel refusal by foreign authorities.`;
      keyRequirements = [
        "Identification of consenting custodial parent(s), minor child, and designated travel chaperone",
        "Complete travel itinerary including departure/return dates, flight details, and destination countries",
        "Passport, birth certificate, or state identification numbers for minor and chaperone",
        "Emergency medical authorization permitting chaperone to consent to emergency physician care",
      ];
      stateRules = [
        `U.S. Customs and Border Protection (CBP) strongly recommends that minor children traveling without both parents carry a notarized consent letter.`,
        `Child custody orders in ${state.name} must be reviewed to ensure travel complies with geographic court restrictions.`,
      ];
      break;

    case "child-medical-consent":
      noticeDays = "Term of Caregiver Authorization";
      statuteCitation = `45 C.F.R. Section 164.508 & ${profile.legalCodePrefix} Minor Medical Consent Law`;
      statuteName = `Federal HIPAA Privacy Rule & ${state.name} Minor Healthcare Consent Code`;
      summary = `Under ${state.name} family law, custodial parents can delegate temporary medical consent authority to trusted caregivers for pediatric, dental, hospital, and emergency treatment.`;
      penalties = `Without valid parental authorization, healthcare facilities may refuse non-emergency medical treatment until parental contact is verified.`;
      keyRequirements = [
        "Parental delegation of medical, pediatric, dental, diagnostic, and surgical consent authority",
        "Full HIPAA medical records privacy authorization under 45 C.F.R. Section 164.508",
        "Detailed medical history: allergies, ongoing prescriptions, chronic conditions, and pediatrician contact",
        "Health insurance provider data, policy ID numbers, and guarantor financial responsibility terms",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Healthcare providers in ${state.name} require notarized parental consent before administering non-emergency medical care to minors.`,
        `Parents may revoke caregiver medical consent at any time upon written notice to the healthcare provider.`,
      ];
      break;

    case "debt-validation-letter":
      noticeDays = 30;
      statuteCitation = `15 U.S.C. Section 1692g & ${profile.legalCodePrefix} Fair Debt Collection Law`;
      statuteName = `Federal Fair Debt Collection Practices Act & ${state.name} Debt Collection Act`;
      summary = `Under federal law (15 U.S.C. 1692g), consumers have 30 days from initial contact to demand validation. Debt collectors must cease all collection activities until proof is provided.`;
      penalties = `Continuing collection efforts without providing validation violates the FDCPA, subjecting the debt collector to statutory damages of $1,000, actual damages, and attorney fees.`;
      keyRequirements = [
        "Timely dispute invoked within the 30-day statutory window of initial collection contact",
        "Mandatory directive forcing collector to cease all collection efforts until validation is mailed",
        "Demand for complete accounting ledger, original contract, chain of assignment, and state license",
        "Instruction restricting all future communications strictly to writing, barring telephone calls",
      ];
      stateRules = [
        `Under 15 U.S.C. 1692g(b), reporting unverified debts to credit bureaus after receiving a dispute violates federal law.`,
        `Debt collection practices in ${state.name} are subject to state consumer protection statutes and ${state.courtSystemName} civil remedies.`,
      ];
      break;
    case "month-to-month-lease":
      noticeDays = profile.rentIncreaseNoticeDays || 30;
      statuteCitation = `${profile.legalCodePrefix} Periodic Tenancy & Month-to-Month Termination Statutes`;
      statuteName = `${state.name} Periodic Tenancy and Landlord-Tenant Act`;
      summary = `In ${state.name}, month-to-month periodic tenancies may be terminated by either landlord or tenant upon delivering timely advance written notice (typically 30 or 60 days depending on tenancy duration).`;
      penalties = `Improper or deficient notice renders the termination legally ineffective, obligating landlord to continue tenancy or exposing landlord to wrongful eviction counterclaims.`;
      keyRequirements = [
        `Delivery of formal written notice at least ${noticeDays} days prior to termination date`,
        "Clear identification of leased premises, tenant of record, and surrender date",
        `Compliance with ${state.name} security deposit accounting and refund deadlines`,
        "Strict prohibition against retaliatory or discriminatory lease terminations",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Tenancy termination notices in ${state.name} must adhere to statutory delivery methods to be legally enforceable in ${state.courtSystemName}.`,
      ];
      break;

    case "commercial-lease-agreement":
      noticeDays = 30;
      statuteCitation = `${profile.legalCodePrefix} Commercial Real Property Leasing & Landlord Remedies`;
      statuteName = `${state.name} Commercial Landlord and Tenant Act`;
      summary = `Under ${state.name} commercial property codes, commercial leases grant broad contractual autonomy for Gross, Modified Gross, and Triple-Net (NNN) expense allocations and default remedies.`;
      penalties = `Breach triggers commercial eviction, lockout under statutory lease terms, default interest, acceleration of rent, and foreclosure on landlord statutory liens.`;
      keyRequirements = [
        "Lease term duration, base rent schedule, and percentage rent or annual CPI escalations",
        "Allocation of Common Area Maintenance (CAM), real property taxes, and building insurance (NNN)",
        "Commercial security deposit terms, permitted business uses, and exclusive use covenants",
        "Default cure periods, landlord re-entry rights, and commercial dispute forum selection",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Commercial tenancies in ${state.name} are not subject to residential rent control statutes and are enforced according to the express terms of the agreement.`,
      ];
      break;

    case "lead-paint-disclosure":
      noticeDays = 10;
      statuteCitation = `42 U.S.C. Section 4852d (Residential Lead-Based Paint Hazard Reduction Act) & EPA Title X`;
      statuteName = `Federal Title X Residential Lead Hazard Disclosure & ${state.name} Health Code`;
      summary = `Federally mandated disclosure for all residential housing constructed prior to 1978. Requires landlords and sellers to disclose known lead-based paint and provide the EPA-approved pamphlet.`;
      penalties = `Violations of federal lead disclosure laws carry EPA civil penalties up to $19,507 per violation, treble damages in civil litigation, and criminal sanctions for willful non-compliance.`;
      keyRequirements = [
        "Federally mandated Lead Warning Statement text signed by landlord/seller, tenant/buyer, and agent",
        "Explicit disclosure of known presence of lead-based paint and lead hazards in the housing unit",
        "Provision of all available records, inspection reports, and risk assessments concerning lead hazards",
        "Mandatory 10-day evaluation window for purchasers to conduct independent lead risk assessment",
      ];
      stateRules = [
        "Federal EPA Title X requirements apply in all 50 states without exception for pre-1978 residential properties.",
        `State and local health authorities in ${state.name} may impose additional lead abatement inspection mandates.`,
      ];
      break;

    case "rental-inspection-checklist":
      noticeDays = profile.defaultNoticeDays;
      statuteCitation = `${profile.legalCodePrefix} Security Deposit Itemization & Move-In Inspection Law`;
      statuteName = `${state.name} Move-In / Move-Out Rental Condition Inspection Standards`;
      summary = `Under ${state.name} security deposit statutes, a signed move-in condition checklist is essential to substantiate lawful damage deductions against tenant security deposits upon lease termination.`;
      penalties = `Failure to document pre-existing conditions bars landlords from withholding deposit funds for disputed damage and can result in statutory bad-faith penalties up to 2x or 3x the deposit amount.`;
      keyRequirements = [
        "Room-by-room condition assessment covering floors, walls, appliances, fixtures, and windows",
        "Identification of pre-existing wear, tear, chips, stains, and functional defects prior to occupancy",
        "Joint signatures of landlord and tenant at move-in and at formal move-out checkout inspection",
        "Written itemization of damage deductions with contractor invoices delivered within statutory deposit deadline",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `In ${state.name}, courts strictly construe damage deductions against landlords who fail to maintain contemporaneous move-in condition documentation.`,
      ];
      break;

    case "notice-of-belief-of-abandonment":
      noticeDays = 15;
      statuteCitation = `${profile.legalCodePrefix} Real Property Abandonment & Personal Property Disposal Act`;
      statuteName = `${state.name} Notice of Belief of Abandonment of Real and Personal Property`;
      summary = `In ${state.name}, landlords must serve formal statutory notice when rent is unpaid for 14+ consecutive days and the landlord reasonably believes the tenant has vacated the premises.`;
      penalties = `Entering or disposing of tenant property without statutory abandonment notice constitutes wrongful eviction and civil conversion, triggering actual and punitive damages.`;
      keyRequirements = [
        "Unpaid rent for the statutory minimum period (typically 14 consecutive days)",
        "Reasonable belief based on facts that tenant has vacated the premises without intent to return",
        `Mandatory notice window (15 days if served personally, 18 days if mailed) for tenant to respond`,
        "Inventory and safe storage of personal property left behind prior to statutory public sale or disposal",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Landlords in ${state.name} must strictly adhere to statutory abandonment procedures before retaking possession without a judicial eviction order.`,
      ];
      break;

    case "general-warranty-deed":
      noticeDays = "Recording Immediate";
      statuteCitation = `${profile.legalCodePrefix} Conveyancing, Real Property Covenants & Warranty Deeds`;
      statuteName = `${state.name} Real Property Conveyance and Statutory Warranty Deed Code`;
      summary = `Under ${state.name} real estate law, a General Warranty Deed conveys fee simple title with full statutory covenants, including seisin, right to convey, against encumbrances, and warranty of quiet enjoyment.`;
      penalties = `Grantor is legally liable for damages and defense costs if any cloud or superior third-party title claim arises against the conveyed parcel.`;
      keyRequirements = [
        "Accurate legal property description, metes and bounds, and Assessor Parcel Number (APN)",
        "Express granting language with full statutory covenants of title and general warranty defense",
        "Execution by Grantor before a commissioned Notary Public with formal jurat acknowledgment",
        `Compliance with ${state.name} county recorder margin, font, and transfer tax documentation rules`,
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Warranty deeds in ${state.name} must be recorded in the county land records where the real property is situated to impart constructive legal notice to third parties.`,
      ];
      break;

    case "prenuptial-agreement":
      noticeDays = "Pre-Marriage Execution";
      statuteCitation = `${profile.legalCodePrefix} Uniform Premarital Agreement Act (UPAA)`;
      statuteName = `${state.name} Premarital Agreements and Separate Property Act`;
      summary = `Governed by the Uniform Premarital Agreement Act (UPAA) as enacted in ${state.name}. Establishes enforceable terms governing separate property, marital debt liability, and spousal support waiver.`;
      penalties = `Involuntary execution, lack of fair and reasonable financial disclosure, or unconscionability at execution invalidates premarital agreements in family court.`;
      keyRequirements = [
        "Voluntary written agreement executed prior to solemnization of marriage without duress or coercion",
        "Full, fair, and reasonable written disclosure of all assets, debts, real estate, and financial liabilities",
        "Clear opportunity for independent legal counsel representation for each party",
        "Enforceable waiver or specification of spousal maintenance, separate property, and inheritance rights",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Family courts in ${state.name} closely scrutinize premarital agreements signed immediately prior to the wedding date; sufficient review time is essential.`,
      ];
      break;

    case "marital-separation-agreement":
      noticeDays = "Effective upon Execution";
      statuteCitation = `${profile.legalCodePrefix} Domestic Relations & Marital Settlement Agreement Law`;
      statuteName = `${state.name} Legal Separation and Marital Property Settlement Code`;
      summary = `In ${state.name}, spouses living separate and apart may execute a binding separation agreement dividing marital property, allocating marital debts, and establishing spousal maintenance.`;
      penalties = `Violation of an executed marital separation agreement allows the non-breaching spouse to obtain court enforcement, contempt orders, and wage garnishments.`;
      keyRequirements = [
        "Equitable division of marital real property, retirement plans (QDROs), vehicles, and personal effects",
        "Allocation of marital debts and mutual indemnification holding each party harmless from assigned debts",
        "Terms governing spousal maintenance or express waiver thereof with mutual living-apart covenants",
        "Provision for incorporation and merger into any future dissolution or divorce decree",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Separation agreements in ${state.name} become enforceable contracts upon execution and may be submitted to ${state.courtSystemName} for formal judicial ratification.`,
      ];
      break;

    case "codicil-to-will":
      noticeDays = "Effective with Last Will";
      statuteCitation = `${profile.legalCodePrefix} Wills, Codicils & Probate Code`;
      statuteName = `${state.name} Probate Code on Execution and Amendment of Wills`;
      summary = `Under ${state.name} probate statutes, a Codicil formally modifies, amends, or adds specific provisions to an existing Last Will and Testament while republishing the unamended remainder.`;
      penalties = `An improperly executed codicil will be declared invalid by the probate court, causing the prior will or statutory intestacy rules to govern disputed bequests.`;
      keyRequirements = [
        "Clear identification and date of original Last Will and Testament being amended",
        "Specific revocation, alteration, or addition of specific bequests, executors, or guardians",
        "Express republication and ratification of all unamended provisions of the underlying will",
        "Execution before two disinterested adult witnesses and a commissioned Notary Public with Self-Proving Affidavit",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `In ${state.name}, codicils must strictly comply with the same statutory execution formalities required for original wills to be admitted to probate.`,
      ];
      break;

    case "partnership-agreement":
      noticeDays = "Immediate upon Execution";
      statuteCitation = `${profile.legalCodePrefix} Revised Uniform Partnership Act (RUPA)`;
      statuteName = `${state.name} General Partnership and Business Entities Code`;
      summary = `Governed by the Revised Uniform Partnership Act (RUPA) in ${state.name}. Defines partner capital accounts, profit allocations, management authority, and buy-sell buyout mechanics.`;
      penalties = `Partners breaching fiduciary duties of loyalty and care face partnership accounting actions, dissociation, and personal liability for damages.`;
      keyRequirements = [
        "Itemization of initial capital contributions (cash and property) and percentage equity ownership",
        "Clear rules for allocation of net profits, operational losses, and periodic partner distributions",
        "Management voting standards, banking signature thresholds, and veto powers on extraordinary debts",
        "Ironclad buy-sell provisions with valuation formula upon death, disability, or voluntary withdrawal",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `General partners in ${state.name} share joint and several liability for partnership debts unless registered as a limited liability partnership (LLP).`,
      ];
      break;

    case "corporate-bylaws":
      noticeDays = "Immediate upon Adoption";
      statuteCitation = `${profile.legalCodePrefix} General Corporation Law & Corporate Governance Code`;
      statuteName = `${state.name} Business Corporations Act and Governance Code`;
      summary = `Establishes internal governance rules for C-Corps and S-Corps in ${state.name}, regulating shareholder annual meetings, board of directors authority, executive officer roles, and corporate indemnification.`;
      penalties = `Operating without formal bylaws undermines corporate veil protection, exposing shareholders and directors to personal liability for company liabilities.`;
      keyRequirements = [
        "Designation of corporate offices, fiscal year end, and annual shareholder meeting schedule",
        "Quorum requirements and voting thresholds for shareholder actions and board resolutions",
        "Powers, term lengths, vacancies, and committee authorities of the Board of Directors",
        "Statutory indemnification provisions protecting directors and executive officers from liability",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Under ${state.name} corporate law, bylaws must be maintained at the principal executive office along with corporate stock ledgers and board minutes.`,
      ];
      break;

    case "letter-of-intent-purchase":
      noticeDays = "Inspection Window Duration";
      statuteCitation = `${profile.legalCodePrefix} Real Estate Purchase Contracts & Escrow Law`;
      statuteName = `${state.name} Commercial Contracts and Due Diligence Standards`;
      summary = `Formal acquisition LOI for real estate or business purchases in ${state.name}. Establishes proposed purchase price, earnest money escrow, due diligence inspection period, and binding exclusivity.`;
      penalties = `Breach of binding exclusivity (no-shop) or confidentiality covenants subjects breaching party to injunctive relief and civil contract damages.`;
      keyRequirements = [
        "Clear definition of target real property or commercial assets and proposed purchase consideration",
        "Earnest money escrow deposit amount and escrow agent designation",
        "Due diligence inspection window allowing buyer termination for any reason without penalty",
        "Binding exclusivity covenants barring seller from soliciting competing offers during diligence",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `In ${state.name}, letters of intent must clearly distinguish between non-binding business terms and binding covenants such as exclusivity and confidentiality.`,
      ];
      break;

    case "consulting-agreement":
      noticeDays = profile.defaultNoticeDays;
      statuteCitation = `${profile.legalCodePrefix} Independent Contractor & Intellectual Property Assignment Law`;
      statuteName = `${state.name} Professional Services and Commercial Contract Code`;
      summary = `Professional consulting contract in ${state.name} defining scope of services, compensation retainer, work-for-hire IP assignment, and independent contractor autonomy under IRS 1099 standards.`;
      penalties = `Client failure to pay consulting fees triggers breach of contract claims plus statutory prejudgment interest; consultant breach of confidentiality risks injunctions and damages.`;
      keyRequirements = [
        "Comprehensive Scope of Work (SOW) defining deliverables, milestones, and performance criteria",
        "Fee schedule specifying hourly rate, fixed fee, or monthly retainer and expense reimbursement",
        "Work-made-for-hire intellectual property assignment clause transferring all rights to client",
        "Confirmation of autonomous contractor status with sole tax responsibility under IRS 1099 guidelines",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Independent contractor agreements in ${state.name} must respect economic reality tests and state labor classifications to avoid misclassification liabilities.`,
      ];
      break;

    case "employee-warning-notice":
      noticeDays = "30-Day Corrective Action Window";
      statuteCitation = `${profile.legalCodePrefix} Employment at Will & Disciplinary Documentation Standards`;
      statuteName = `${state.name} Labor Code and Progressive Discipline Standards`;
      summary = `Progressive discipline instrument in ${state.name} establishing clear factual notice of performance or conduct violations, setting measurable corrective benchmarks, and warning of termination.`;
      penalties = `Inadequate documentation of misconduct exposes employers to unemployment claim forfeitures, wrongful termination lawsuits, and administrative discrimination complaints.`;
      keyRequirements = [
        "Specific factual itemization of dates, conduct, policy sections, and observed deficiencies",
        "Disciplinary classification (First Warning, Second Warning, or Final Termination Warning)",
        "Measurable Corrective Action Plan (CAP) with explicit timeline for re-evaluation",
        "Employee receipt acknowledgment signature with opportunity for written rebuttal submission",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Progressive discipline documentation in ${state.name} serves as crucial evidence in defending at-will employment terminations before administrative agencies.`,
      ];
      break;

    case "resignation-letter":
      noticeDays = "14 (Standard Two-Week Notice)";
      statuteCitation = `${profile.legalCodePrefix} Final Wage Payment & Labor Code Regulations`;
      statuteName = `${state.name} Wage Payment and Collection Act`;
      summary = `Formal resignation notice in ${state.name} providing two-week notice, committing to project transition and company property return, and demanding final wages under state labor code deadlines.`;
      penalties = `Employers failing to remit final wages and accrued PTO within state statutory deadlines face mandatory liquidated damages and attorney fees under ${state.name} labor law.`;
      keyRequirements = [
        "Clear, unambiguous statement of voluntary resignation with exact final working date",
        "Commitment to handover assistance, project documentation, and knowledge transfer to team",
        "Surrender and return of all company equipment, badges, proprietary materials, and digital logins",
        `Formal demand for final earned compensation and accrued PTO pursuant to ${state.name} wage statutes`,
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Under ${state.name} labor law, employers must issue final paychecks within statutory timelines following employee voluntary resignation.`,
      ];
      break;

    case "employee-invention-agreement":
      noticeDays = "Immediate upon Employment";
      statuteCitation = `${profile.legalCodePrefix} Employee Invention Assignment & Trade Secrets Act`;
      statuteName = `${state.name} Uniform Trade Secrets Act and Invention Assignment Code`;
      summary = `Proprietary Information and Inventions Agreement (PIIA) in ${state.name} securing company ownership of inventions, software, and trade secrets, with statutory prior invention carve-outs.`;
      penalties = `Unauthorized disclosure or misappropriation of trade secrets triggers federal DTSA and state trade secret injunctions, treble exemplary damages, and attorney fees.`;
      keyRequirements = [
        "Broad assignment of all patentable discoveries, algorithms, copyrightable software, and technical trade secrets",
        "Classification of employee creations as works made for hire under the US Copyright Act",
        "Prior inventions disclosure schedule excluding personal discoveries made before employment",
        `Statutory notice of employee rights under ${state.name} labor code governing non-work related inventions`,
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `State invention assignment statutes in ${state.name} protect employee side-projects developed without employer resources or proprietary trade secrets.`,
      ];
      break;

    case "bounced-check-demand-letter":
      noticeDays = 30;
      statuteCitation = `${profile.legalCodePrefix} Dishonored Check Civil Recovery & Treble Damages Statute`;
      statuteName = `${state.name} Commercial Code Bad Check Civil Liability Act`;
      summary = `Formal statutory demand notice in ${state.name} requiring check drawer to pay dishonored check face amount plus statutory service charges within 30 days before filing suit for treble damages.`;
      penalties = `Failure to remit certified funds within statutory notice period renders drawer liable for face amount plus statutory treble (3x) civil damages, court costs, and attorney fees.`;
      keyRequirements = [
        "Itemization of check number, face amount, issuance date, and drawee financial institution",
        "Statutory returned check service fee authorized under state civil code",
        "Strict 30-day (or state statutory) cure deadline to deliver certified cashier funds",
        "Explicit statutory warning of treble damages liability and referral to civil litigation",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `In ${state.name}, delivering this statutory demand letter via certified mail is an essential legal prerequisite before initiating civil bad-check court proceedings.`,
      ];
      break;

    case "boat-bill-of-sale":
      noticeDays = "Immediate upon Transfer";
      statuteCitation = `${profile.legalCodePrefix} Vessel Titling, Registration & Uniform Commercial Code Article 2`;
      statuteName = `${state.name} Watercraft Titling and Marine Transfer Act`;
      summary = `Official vessel bill of sale in ${state.name} transferring boat, outboard propulsion motor, and trailer with Hull Identification Number (HIN), state bow numbers, and as-is warranty disclaimers.`;
      penalties = `Operating or transferring an untitled or incorrectly documented watercraft triggers state wildlife/DNR fines, registration suspension, and title transfer delays.`;
      keyRequirements = [
        "12-character Hull Identification Number (HIN) and state department of natural resources registration number",
        "Outboard motor manufacturer, horsepower rating, and serial number specifications",
        "Boat transport trailer make, model year, and 17-character vehicle identification number (VIN)",
        "Seller warranty of unencumbered clear title free of maritime liens, combined with as-is condition disclaimer",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Watercraft titles and registration transfers in ${state.name} must be completed with the state licensing agency within the statutory grace period following sale.`,
      ];
      break;

    case "satisfaction-of-lien":
      noticeDays = "Immediate for County Recording";
      statuteCitation = `${profile.legalCodePrefix} Mechanic's Lien Discharge & County Recording Act`;
      statuteName = `${state.name} Real Property Code on Release and Cancellation of Liens`;
      summary = `Official recorded document in ${state.name} certifying that a previously filed mechanic's lien, construction claim, or judgment encumbrance has been satisfied in full and discharged of record.`;
      penalties = `Failure of a paid lienor to record a timely satisfaction of lien within statutory deadlines (typically 10 to 30 days) triggers statutory monetary penalties and liability for owner attorney fees.`;
      keyRequirements = [
        "Precise county recording reference number, book, page, and original recorded date of the lien claim",
        "Legal description and Assessor Parcel Number (APN) of the encumbered real property",
        "Formal certification by lienholder that all secured indebtedness has been paid in full",
        "Notary Public acknowledgment jurat conforming to county clerk land recording statutes",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `In ${state.name}, property owners can demand statutory penalties against lienors who refuse or neglect to record a formal lien satisfaction following full payment.`,
      ];
      break;

    case "affidavit-surviving-spouse":
      noticeDays = "Recording Immediate";
      statuteCitation = `${profile.legalCodePrefix} Survivorship Tenancy & Real Property Probate Transfer Code`;
      statuteName = `${state.name} Joint Tenancy with Right of Survivorship Title Clearance Act`;
      summary = `Sworn affidavit recorded in ${state.name} county land records by a surviving spouse or joint tenant to terminate survivorship tenancy, remove the deceased owner, and establish sole clear title.`;
      penalties = `Failure to clear record title prevents subsequent sale, refinancing, or insurable title conveyance through title insurance underwriters.`;
      keyRequirements = [
        "Sworn statement of affiant surviving spouse or surviving joint tenant under penalty of perjury",
        "Certified copy of decedent death certificate attached and incorporated into county land records",
        "Recorded deed reference, legal description, and Assessor Parcel Number of the real property",
        "Affirmation that all decedent debts and potential estate taxes have been paid or adequately provided for",
      ];
      stateRules = [
        profile.uniqueStateGuidance,
        `Recording an Affidavit of Surviving Spouse in ${state.name} legally clears real estate title without requiring full formal probate court administration.`,
      ];
      break;

  }

  return {
    stateCode: state.code,
    stateName: state.name,
    statuteCitation,
    statuteName,
    noticePeriodDays: noticeDays,
    serviceMethods: [
      "USPS Certified Mail Return Receipt Requested",
      "Personal In-Hand Delivery by Process Server",
      "Substituted Service with First-Class Mail Verification",
    ],
    courtJurisdiction: state.courtSystemName,
    keyRequirements,
    statuteSummary: summary,
    penaltiesOrConsequences: penalties,
    stateSpecificRules: stateRules,
    prejudgmentInterestRate: profile.statutoryInterest,
  };
}
