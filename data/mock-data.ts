import {
  Artcon,
  Merch,
  ProductionBatch,
} from "@/types";

export const currentArtcon: Artcon = {
  id: "artcon-2026",
  name: "Artcon Jakarta 2026",
  date: "2026-10-19",
  location: "Jakarta",
  notes: "Main convention event",
};

export const merchList: Merch[] = [
  {
    id: "merch-001",
    name: "Towa Sticker",
    category: "Sticker",
    status: "planned",
    variants: [
      {
        id: "variant-001",
        name: "Normal",
        plannedQuantity: 50,
        sellingPrice: 15000,
        unitCost: 3500,
      },
      {
        id: "variant-002",
        name: "Holographic",
        plannedQuantity: 30,
        sellingPrice: 18000,
        unitCost: 5000,
      },
    ],
  },

  {
    id: "merch-002",
    name: "Ren A5 Print",
    category: "Print",
    status: "in-production",
    variants: [
      {
        id: "variant-003",
        name: "Normal",
        plannedQuantity: 20,
        sellingPrice: 35000,
        unitCost: 12000,
      },
      {
        id: "variant-004",
        name: "Holographic",
        plannedQuantity: 10,
        sellingPrice: 45000,
        unitCost: 18000,
      },
    ],
  },

  {
    id: "merch-003",
    name: "Towa Acrylic Charm",
    category: "Acrylic",
    status: "planned",
    variants: [
      {
        id: "variant-005",
        name: "Standard",
        plannedQuantity: 15,
        sellingPrice: 50000,
        unitCost: 22000,
      },
    ],
  },
];

export const productionBatches: ProductionBatch[] = [
  {
    id: "batch-001",
    merchVariantId: "variant-001",
    vendor: "Sticker Vendor A",
    orderedQuantity: 50,
    receivedQuantity: 50,
    unitCost: 3500,
    status: "arrived",
  },

  {
    id: "batch-002",
    merchVariantId: "variant-002",
    vendor: "Sticker Vendor A",
    orderedQuantity: 30,
    receivedQuantity: 20,
    unitCost: 5000,
    status: "shipped",
  },

  {
    id: "batch-003",
    merchVariantId: "variant-003",
    vendor: "Print Vendor B",
    orderedQuantity: 20,
    receivedQuantity: 0,
    unitCost: 12000,
    status: "in-production",
  },

  {
    id: "batch-004",
    merchVariantId: "variant-004",
    vendor: "Print Vendor B",
    orderedQuantity: 10,
    receivedQuantity: 10,
    unitCost: 18000,
    status: "arrived",
  },
];