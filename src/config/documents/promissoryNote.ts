import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const promissoryNoteConfig: DocumentConfig = {
  id: "promissory-note",
  slug: "promissory-note",
  title: "Promissory Note (Secured & Unsecured Loan Agreement)",
  shortTitle: "Promissory Note",
  category: "Financial & Loans",
  description: "Legally enforceable promissory note establishing principal debt, interest rate conforming to state usury caps, repayment installment schedule, default acceleration, and collection remedies.",
  metaDescription: "Generate a legally binding Promissory Note. Includes state usury rate compliance, default acceleration clauses, and flexible installment options for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "UCC Commercial Paper",
  iconName: "CreditCard",
  searchKeywords: [
    "promissory note template pdf",
    "unsecured loan agreement promissory note",
    "secured promissory note form",
    "installment loan note with interest",
    "demand promissory note form",
    "personal loan contract between individuals",
  ],
  features: [
    "Enforceable commercial paper governed by Uniform Commercial Code (UCC Article 3)",
    "Incorporates statutory usury rate ceilings and lawful compounding limitations",
    "Features default acceleration clause permitting immediate collection of entire balance upon nonpayment",
    "Includes waiver of presentment, demand, notice of dishonor, and recovery of attorney fees",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "TX",
    borrowerName: "",
    borrowerAddress: "",
    lenderName: "",
    lenderAddress: "",
    principalAmount: "15000.00",
    annualInterestRate: "7.5",
    repaymentStructure: "monthly_installments",
    monthlyPaymentAmount: "466.50",
    numberOfPayments: "36",
    firstPaymentDueDate: "",
    finalMaturityDate: "",
    lateFeePolicy: "50.00",
    isSecured: "unsecured",
    collateralDescription: "",
  },
  steps: [
    {
      id: "parties_loan",
      title: "Borrower & Lender Information",
      description: "Enter identifying details for the borrower and lender.",
      fields: [
        {
          name: "borrowerName",
          label: "Borrower Full Legal Name(s)",
          type: "text",
          placeholder: "e.g., Marcus Alexander Reed",
          required: true,
          gridCols: 1,
        },
        {
          name: "borrowerAddress",
          label: "Borrower Legal Physical Address",
          type: "text",
          placeholder: "e.g., 2800 Post Oak Blvd, Suite 1200, Houston, TX 77056",
          required: true,
          gridCols: 1,
        },
        {
          name: "lenderName",
          label: "Lender Full Legal Name / Lending Institution",
          type: "text",
          placeholder: "e.g., Lone Star Capital Partners LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "lenderAddress",
          label: "Lender Notice & Payment Delivery Address",
          type: "text",
          placeholder: "e.g., 1000 Louisiana Street, Suite 4000, Houston, TX 77002",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "loan_terms",
      title: "Principal, Interest & Repayment Schedule",
      description: "Define loan principal, annual interest rate, and payment installment terms.",
      fields: [
        {
          name: "principalAmount",
          label: "Principal Loan Amount ($ USD)",
          type: "currency",
          placeholder: "e.g., 15000.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "annualInterestRate",
          label: "Annual Interest Rate (APR %)",
          type: "text",
          placeholder: "e.g., 7.5 (Must not exceed state usury caps)",
          required: true,
          gridCols: 2,
        },
        {
          name: "repaymentStructure",
          label: "Repayment Structure",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Monthly Equal Installments (Principal + Interest)", value: "monthly_installments" },
            { label: "Lump Sum Payment on Maturity Date", value: "lump_sum_maturity" },
            { label: "Interest-Only Monthly with Final Principal Balloon", value: "interest_only_balloon" },
            { label: "Payable on Demand upon 30 Days Notice", value: "on_demand" },
          ],
        },
        {
          name: "monthlyPaymentAmount",
          label: "Monthly Payment Sum ($ USD)",
          type: "currency",
          placeholder: "e.g., 466.50",
          required: false,
          gridCols: 2,
        },
        {
          name: "firstPaymentDueDate",
          label: "First Payment Due Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "finalMaturityDate",
          label: "Final Loan Maturity Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "lateFeePolicy",
          label: "Late Fee after 10-Day Grace Period ($ USD)",
          type: "currency",
          placeholder: "e.g., 50.00",
          required: false,
          gridCols: 2,
        },
        {
          name: "isSecured",
          label: "Loan Security / Collateral Status",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Unsecured Personal / Commercial Loan", value: "unsecured" },
            { label: "Secured by Personal Property / Equipment Collateral", value: "secured" },
          ],
        },
        {
          name: "collateralDescription",
          label: "Collateral Description (If Secured)",
          type: "text",
          placeholder: "e.g., 2020 Caterpillar Mini-Excavator, VIN/Serial #CAT-98214",
          required: false,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Date Promissory Note Signed",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const borrower = data.borrowerName || "Borrower";
    const lender = data.lenderName || "Lender";
    const principal = parseFloat(data.principalAmount || "0").toFixed(2);
    const apr = data.annualInterestRate || "7.5";
    const monthly = parseFloat(data.monthlyPaymentAmount || "0").toFixed(2);
    const late = parseFloat(data.lateFeePolicy || "0").toFixed(2);
    const statuteCite = statute?.statuteCitation || "Uniform Commercial Code (UCC) Article 3 - Negotiable Instruments";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "COMMERCIAL INSTRUMENT", value: "NEGOTIABLE PROMISSORY NOTE" },
          { label: "BORROWER (MAKER)", value: `${borrower}, ${data.borrowerAddress || ""}` },
          { label: "LENDER (HOLDER)", value: `${lender}, ${data.lenderAddress || ""}` },
          { label: "PRINCIPAL DEBT", value: `$${principal} USD` },
          { label: "ANNUAL INTEREST RATE", value: `${apr}% Fixed APR` },
          { label: "REPAYMENT TERMS", value: data.repaymentStructure === "monthly_installments" ? `$${monthly} USD monthly commencing ${data.firstPaymentDueDate || "agreed start"}` : "Lump sum or interest installments" },
          { label: "FINAL MATURITY DATE", value: `${data.finalMaturityDate || "Maturity Date"}` },
          { label: "SECURITY STATUS", value: data.isSecured === "secured" ? `Secured by: ${data.collateralDescription || "Pledged collateral"}` : "Unsecured Loan" },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Promise to Pay & Interest Terms",
        type: "body",
        paragraphs: [
          `FOR VALUE RECEIVED, Borrower ${borrower} promises to pay to the order of Lender ${lender}, at the lender address designated above or at such other place as Lender may designate in writing, the principal sum of $${principal} USD, together with interest on the unpaid principal balance at the fixed rate of ${apr}% per annum.`,
          `Interest shall be computed on the basis of a 365-day year and the actual number of days elapsed. The parties stipulate and agree that in no event shall the interest rate contracted for exceed the maximum lawful non-usurious rate permitted under ${statute?.stateName || "applicable state"} usury statutes. If any excess interest is collected, it shall be credited against principal.`,
        ],
      },
      {
        title: "2. Schedule of Payments & Prepayment Rights",
        type: "body",
        paragraphs: [
          `Repayment Schedule: Principal and accrued interest shall be paid in installments as follows: "${data.repaymentStructure === "monthly_installments" ? `Consecutive monthly payments of $${monthly} USD commencing on ${data.firstPaymentDueDate || "start date"} and continuing on the same day of each subsequent month until ${data.finalMaturityDate || "maturity date"}, at which time the remaining balance shall be paid in full.` : `The entire principal balance plus accrued interest shall become due and payable on ${data.finalMaturityDate || "the maturity date"}.`}"`,
          `Late Charges: If any installment is not received within ten (10) calendar days after its due date, Borrower agrees to pay a late fee of $${late} USD to defray the additional administrative expense of handling delinquent accounts.`,
          `Prepayment: Borrower reserves the absolute right to prepay all or any part of the outstanding principal balance at any time without penalty or premium. Prepayments shall be applied first to accrued interest and then to principal reduction.`,
        ],
      },
      {
        title: "3. Default, Acceleration & Collection Remedies",
        type: "body",
        paragraphs: [
          `Default & Acceleration: If Borrower fails to make any payment when due and such default continues for fifteen (15) calendar days following written notice of default, the entire unpaid principal balance, together with all accrued interest, shall immediately become due and payable at the option of Lender without further notice or demand.`,
          `Waiver & Collection Costs: Borrower hereby waives presentment for payment, demand, notice of nonpayment, protest, and notice of protest. If this Note is placed in the hands of an attorney for collection or enforced through litigation in ${statute?.courtJurisdiction || "court"}, Borrower agrees to pay all reasonable attorney fees, court costs, and collection expenses incurred by Lender.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
      {
        type: "notary",
        paragraphs: [],
      },
    ];
  },
};
