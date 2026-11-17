export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "date"
  | "currency"
  | "radio"
  | "checkbox-group"
  | "state-picker"
  | "number";

export interface FormOption {
  label: string;
  value: string;
  description?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  options?: FormOption[];
  defaultValue?: string | number | boolean | string[];
  gridCols?: 1 | 2; // for layout in form grid
  dependsOn?: {
    field: string;
    value: string | boolean | string[];
  };
}

export interface FormStep {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

export interface DocumentSection {
  title?: string;
  type: "header" | "parties" | "matter" | "body" | "statute" | "warning" | "signatures" | "notary" | "certificate_of_service";
  paragraphs: string[];
  bulletPoints?: string[];
  metaTable?: { label: string; value: string }[];
}

export interface StateStatuteInfo {
  stateCode: string;
  stateName: string;
  statuteCitation: string;
  statuteName: string;
  noticePeriodDays: number | string;
  serviceMethods: string[];
  courtJurisdiction: string;
  keyRequirements: string[];
  statuteSummary: string;
  penaltiesOrConsequences?: string;
}

export interface DocumentConfig {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: "Demands & Disputes" | "Landlord & Tenant" | "Real Estate & Liens" | "Contracts & Releases" | "Healthcare & Privacy";
  description: string;
  metaDescription: string;
  priceFormatted: string; // "$9.90"
  priceAmount: number; // 9.90
  badgeText: string;
  iconName: string;
  searchKeywords: string[];
  features: string[];
  steps: FormStep[];
  defaultValues: Record<string, any>;
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo) => DocumentSection[];
}
