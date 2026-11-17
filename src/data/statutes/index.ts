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
