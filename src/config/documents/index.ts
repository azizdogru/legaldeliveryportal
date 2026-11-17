import { DocumentConfig } from "@/types/document";
import { ceaseAndDesistConfig } from "./ceaseAndDesist";
import { demandLetterConfig } from "./demandLetter";
import { rentIncreaseNoticeConfig } from "./rentIncreaseNotice";
import { noticeOfIntentToEnterConfig } from "./noticeOfIntentToEnter";
import { leaseViolationNoticeConfig } from "./leaseViolationNotice";
import { releaseOfLiabilityConfig } from "./releaseOfLiability";
import { mechanicsLienNoticeConfig } from "./mechanicsLienNotice";
import { hipaaMedicalReleaseConfig } from "./hipaaMedicalRelease";
import { petAddendumConfig } from "./petAddendum";
import { equipmentRentalAgreementConfig } from "./equipmentRentalAgreement";

export const ALL_DOCUMENTS: DocumentConfig[] = [
  ceaseAndDesistConfig,
  demandLetterConfig,
  rentIncreaseNoticeConfig,
  noticeOfIntentToEnterConfig,
  leaseViolationNoticeConfig,
  releaseOfLiabilityConfig,
  mechanicsLienNoticeConfig,
  hipaaMedicalReleaseConfig,
  petAddendumConfig,
  equipmentRentalAgreementConfig,
];

export function getDocumentBySlug(slug: string): DocumentConfig | undefined {
  return ALL_DOCUMENTS.find((doc) => doc.slug.toLowerCase() === slug.toLowerCase());
}

export function getDocumentById(id: string): DocumentConfig | undefined {
  return ALL_DOCUMENTS.find((doc) => doc.id.toLowerCase() === id.toLowerCase());
}
