"use client";

import type { MerchVariant, ProductionBatch } from "@/types";
import ProductionBatchRow from "@/components/production-batch-row";
import { getProductionSummary } from "@/utils/production";

interface ProductionCardProps {
  variant: MerchVariant;
  batches: ProductionBatch[];
  onAddBatch: (variantId: string) => void;
  onUpdateBatch: (batch: ProductionBatch) => void;
  onDeleteBatch: (id: string) => void;
}

export default function ProductionCard({
  variant,
  batches,
  onAddBatch,
  onUpdateBatch,
  onDeleteBatch,
}: ProductionCardProps) {
  const summary = getProductionSummary(variant, batches);

  const progress =
    summary.required > 0
      ? Math.min(
          Math.round((summary.received / summary.required) * 100),
          100
        )
      : 0;

  const variantBatches = batches.filter(
    (batch) => batch.merchVariantId === variant.id
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-50 to-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-violet-600">
              Production
            </p>

            <h2 className="mt-1 text-xl font-bold text-stone-800">
              {variant.name}
            </h2>
          </div>

          <button
            onClick={() => onAddBatch(variant.id)}
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
          >
            + Add Batch
          </button>
        </div>

        {/* Summary */}
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          <SummaryItem
            label="Required"
            value={summary.required}
          />

          <SummaryItem
            label="Ordered"
            value={summary.ordered}
          />

          <SummaryItem
            label="Received"
            value={summary.received}
          />

          <SummaryItem
            label="Remaining"
            value={summary.remaining}
          />
        </div>

        {/* Progress */}
        <div className="mt-5">
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="font-medium text-stone-500">
              Production Progress
            </span>

            <span className="font-semibold text-violet-600">
              {progress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-stone-100">
            <div
              className="h-full rounded-full bg-violet-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Production batches */}
      <div className="border-t border-stone-100 p-6">
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-stone-800">
            Production Batches
          </h3>

          <p className="mt-1 text-xs text-stone-500">
            Orders from vendors for this variant.
          </p>
        </div>

        {variantBatches.length === 0 ? (
          <div className="rounded-xl border border-dashed border-stone-200 bg-stone-50 p-6 text-center">
            <p className="text-sm text-stone-500">
              No production batch yet.
            </p>

            <button
              onClick={() => onAddBatch(variant.id)}
              className="mt-2 text-sm font-medium text-violet-600 hover:text-violet-700"
            >
              Add the first batch
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {variantBatches.map((batch) => (
              <ProductionBatchRow
                key={batch.id}
                batch={batch}
                onUpdate={onUpdateBatch}
                onDelete={onDeleteBatch}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-3">
      <p className="text-xs font-medium text-stone-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold text-stone-800">
        {value}
      </p>
    </div>
  );
}