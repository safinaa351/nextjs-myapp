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

export interface ProductionOrder {
  id: string;
  vendor: string;
  merchId: string;
  merchVariantId: string;
  orderedQuantity: number;
  unitCost: number;
  status: ProductionStatus;
  notes?: string;
}