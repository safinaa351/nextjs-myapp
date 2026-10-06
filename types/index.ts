export type ProductStatus =
  | "idea"
  | "planned"
  | "in-production"
  | "arrived"
  | "ready";

export type ProductionStatus =
  | "not-ordered"
  | "ordered"
  | "in-production"
  | "shipped"
  | "arrived";

export interface Artcon {
  id: string;
  name: string;
  date: string;
  location: string;
  notes?: string;
}

export interface MerchVariant {
  id: string;
  name: string;
  plannedQuantity: number;
  sellingPrice: number;
  unitCost: number;
}

export interface Merch {
  id: string;
  name: string;
  category: string;
  status: ProductStatus;
  variants: MerchVariant[];
}

export interface ProductionBatch {
  id: string;
  merchVariantId: string;
  vendor: string;
  orderedQuantity: number;
  receivedQuantity: number;
  unitCost: number;
  status: ProductionStatus;
  notes?: string;
}