export interface InspectionRecord {
  id: number;
  partNumber: string;
  manufacturer: string;
  lotNumber: string;
  dateCode: string;
  status: 'PASS' | 'FAIL' | 'REVIEW';
  confidence: number;
  barcodeText: string;
  ocrText: string;
  remarks: string;
}
