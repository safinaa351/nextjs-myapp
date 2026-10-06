import {
  Artcon,
  Merch,
  ProductionOrder,
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

export const productionOrders: ProductionOrder[] = [
  {
    id: "production-001",
    vendor: "Sticker Vendor A",
    merchId: "merch-001",
    merchVariantId: "variant-001",
    orderedQuantity: 50,
    unitCost: 3500,
    status: "arrived",
  },
  {
    id: "production-002",
    vendor: "Sticker Vendor A",
    merchId: "merch-001",
    merchVariantId: "variant-002",
    orderedQuantity: 30,
    unitCost: 5000,
    status: "shipped",
  },
  {
    id: "production-003",
    vendor: "Print Vendor B",
    merchId: "merch-002",
    merchVariantId: "variant-003",
    orderedQuantity: 20,
    unitCost: 12000,
    status: "in-production",
  },
  {
    id: "production-004",
    vendor: "Print Vendor B",
    merchId: "merch-002",
    merchVariantId: "variant-004",
    orderedQuantity: 10,
    unitCost: 18000,
    status: "arrived",
  },
];