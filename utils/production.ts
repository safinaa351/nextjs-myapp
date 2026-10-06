import type { MerchVariant, ProductionOrder } from "@/types";

export function getProductionSummary(
  variant: MerchVariant,
  orders: ProductionOrder[]
) {
  const variantOrders = orders.filter(
    (order) => order.merchVariantId === variant.id
  );

  const ordered = variantOrders.reduce(
    (total, order) => total + order.orderedQuantity,
    0
  );

  // Since receivedQuantity is removed, we count an order as received if it has "arrived"
  const received = variantOrders.reduce(
    (total, order) => 
      order.status === "arrived" ? total + order.orderedQuantity : total,
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
  orders: ProductionOrder[]
) {
  const summary = getProductionSummary(variant, orders);

  if (summary.required === 0) {
    return 0;
  }

  return Math.min(
    Math.round((summary.received / summary.required) * 100),
    100
  );
}