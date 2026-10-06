import type { MerchVariant, ProductionBatch } from "@/types";

export function getProductionSummary(
  variant: MerchVariant,
  batches: ProductionBatch[]
) {
  const variantBatches = batches.filter(
    (batch) => batch.merchVariantId === variant.id
  );

  const ordered = variantBatches.reduce(
    (total, batch) => total + batch.orderedQuantity,
    0
  );

  const received = variantBatches.reduce(
    (total, batch) => total + batch.receivedQuantity,
    0
  );

  const remaining = Math.max(variant.plannedQuantity - received, 0);

  return {
    required: variant.plannedQuantity,
    ordered,
    received,
    remaining,
  };
}

export function getProductionProgress(
  variant: MerchVariant,
  batches: ProductionBatch[]
) {
  const summary = getProductionSummary(variant, batches);

  if (summary.required === 0) {
    return 0;
  }

  return Math.min(
    Math.round((summary.received / summary.required) * 100),
    100
  );
}