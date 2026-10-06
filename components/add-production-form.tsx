"use client";

import { useState } from "react";
import type { Merch, ProductionBatch } from "@/types";

interface AddProductionFormProps {
  merchList: Merch[];
  initialVariantId?: string;
  onAdd: (batch: ProductionBatch) => void;
  onCancel: () => void;
}

export default function AddProductionForm({
  merchList,
  initialVariantId = "",
  onAdd,
  onCancel,
}: AddProductionFormProps) {
  const variants = merchList.flatMap((merch) =>
    merch.variants.map((variant) => ({
      merchName: merch.name,
      variantName: variant.name,
      variantId: variant.id,
      unitCost: variant.unitCost,
    }))
  );

  const [formData, setFormData] = useState({
    merchVariantId: initialVariantId,
    vendor: "",
    orderedQuantity: 0,
    receivedQuantity: 0,
    unitCost: 0,
    status: "not-ordered" as ProductionBatch["status"],
    notes: "",
  });

  const selectedVariant = variants.find(
    (variant) => variant.variantId === formData.merchVariantId
  );

  function handleVariantChange(variantId: string) {
    const variant = variants.find(
      (item) => item.variantId === variantId
    );

    setFormData({
      ...formData,
      merchVariantId: variantId,
      unitCost: variant?.unitCost ?? 0,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.merchVariantId || !formData.vendor.trim()) {
      return;
    }

    const newBatch: ProductionBatch = {
      id: `batch-${Date.now()}`,
      merchVariantId: formData.merchVariantId,
      vendor: formData.vendor.trim(),
      orderedQuantity: Number(formData.orderedQuantity),
      receivedQuantity: Number(formData.receivedQuantity),
      unitCost: Number(formData.unitCost),
      status: formData.status,
      notes: formData.notes.trim() || undefined,
    };

    onAdd(newBatch);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-violet-100 bg-violet-50/40 p-6 shadow-sm"
    >
      <div className="mb-5">
        <p className="text-sm font-medium text-violet-600">
          Production
        </p>

        <h2 className="mt-1 text-xl font-bold text-stone-800">
          Add Production Batch
        </h2>

        <p className="mt-1 text-sm text-stone-500">
          Record an order from a vendor.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Variant */}
        <div className="md:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Product / Variant
          </label>

          <select
            value={formData.merchVariantId}
            onChange={(e) => handleVariantChange(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            required
          >
            <option value="">Select variant</option>

            {variants.map((variant) => (
              <option key={variant.variantId} value={variant.variantId}>
                {variant.merchName} — {variant.variantName}
              </option>
            ))}
          </select>

          {selectedVariant && (
            <p className="mt-1.5 text-xs text-stone-500">
              Default unit cost: Rp{" "}
              {selectedVariant.unitCost.toLocaleString("id-ID")}
            </p>
          )}
        </div>

        {/* Vendor */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Vendor
          </label>

          <input
            type="text"
            value={formData.vendor}
            onChange={(e) =>
              setFormData({
                ...formData,
                vendor: e.target.value,
              })
            }
            placeholder="e.g. Sticker Vendor A"
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Status
          </label>

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as ProductionBatch["status"],
              })
            }
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          >
            <option value="not-ordered">Not Ordered</option>
            <option value="ordered">Ordered</option>
            <option value="in-production">In Production</option>
            <option value="shipped">Shipped</option>
            <option value="arrived">Arrived</option>
          </select>
        </div>

        {/* Ordered */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Ordered Quantity
          </label>

          <input
            type="number"
            min="0"
            value={formData.orderedQuantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                orderedQuantity: Number(e.target.value),
              })
            }
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        {/* Received */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Received Quantity
          </label>

          <input
            type="number"
            min="0"
            value={formData.receivedQuantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                receivedQuantity: Number(e.target.value),
              })
            }
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        {/* Unit Cost */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Unit Cost
          </label>

          <input
            type="number"
            min="0"
            value={formData.unitCost}
            onChange={(e) =>
              setFormData({
                ...formData,
                unitCost: Number(e.target.value),
              })
            }
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Notes
          </label>

          <input
            type="text"
            value={formData.notes}
            onChange={(e) =>
              setFormData({
                ...formData,
                notes: e.target.value,
              })
            }
            placeholder="Optional"
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl px-4 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
        >
          Add Batch
        </button>
      </div>
    </form>
  );
}