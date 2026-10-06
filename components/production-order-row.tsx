"use client";

import { useState } from "react";
import type {
  Merch,
  ProductionOrder,
  ProductionStatus,
} from "@/types";

interface ProductionOrderRowProps {
  order: ProductionOrder;
  merchList: Merch[];
  onUpdate: (order: ProductionOrder) => void;
  onDelete: (id: string) => void;
}

export default function ProductionOrderRow({
  order,
  merchList,
  onUpdate,
  onDelete,
}: ProductionOrderRowProps) {
  const [editing, setEditing] =
    useState(false);

  const [formData, setFormData] =
    useState<ProductionOrder>(order);

  const selectedMerch =
    merchList.find(
      (merch) =>
        merch.id === formData.merchId
    );

  const variants =
    selectedMerch?.variants ?? [];

  const merchName =
    merchList.find(
      (merch) => merch.id === order.merchId
    )?.name ?? "Unknown";

  const variantName =
    selectedMerch?.variants.find(
      (variant) =>
        variant.id === order.merchVariantId
    )?.name ?? "Unknown";

  function handleMerchChange(
    merchId: string
  ) {
    setFormData({
      ...formData,
      merchId,
      merchVariantId: "",
    });
  }

  function handleSave() {
    if (
      !formData.vendor.trim() ||
      !formData.merchId ||
      !formData.merchVariantId
    ) {
      return;
    }

    onUpdate({
      ...formData,
      vendor: formData.vendor.trim(),
      notes:
        formData.notes?.trim() ||
        undefined,
    });

    setEditing(false);
  }

  function handleCancel() {
    setFormData(order);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="rounded-xl border border-violet-100 bg-violet-50/40 p-4">

        <div className="grid gap-3 md:grid-cols-3">

          {/* Vendor */}

          <input
            type="text"
            value={formData.vendor}
            onChange={(e) =>
              setFormData({
                ...formData,
                vendor: e.target.value,
              })
            }
            placeholder="Vendor"
            className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400"
          />

          {/* Merch */}

          <select
            value={formData.merchId}
            onChange={(e) =>
              handleMerchChange(
                e.target.value
              )
            }
            className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400"
          >
            <option value="">
              Select merch
            </option>

            {merchList.map((merch) => (
              <option
                key={merch.id}
                value={merch.id}
              >
                {merch.name}
              </option>
            ))}
          </select>

          {/* Variant */}

          <select
            value={formData.merchVariantId}
            onChange={(e) =>
              setFormData({
                ...formData,
                merchVariantId:
                  e.target.value,
              })
            }
            disabled={!formData.merchId}
            className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400 disabled:cursor-not-allowed disabled:bg-stone-100"
          >
            <option value="">
              {formData.merchId
                ? "Select variant"
                : "Select merch first"}
            </option>

            {variants.map((variant) => (
              <option
                key={variant.id}
                value={variant.id}
              >
                {variant.name}
              </option>
            ))}
          </select>

          {/* Quantity */}

          <input
            type="number"
            min="0"
            value={formData.orderedQuantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                orderedQuantity:
                  Number(e.target.value),
              })
            }
            placeholder="Ordered quantity"
            className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400"
          />

          {/* Unit Cost */}

          <input
            type="number"
            min="0"
            value={formData.unitCost}
            onChange={(e) =>
              setFormData({
                ...formData,
                unitCost:
                  Number(e.target.value),
              })
            }
            placeholder="Unit cost"
            className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400"
          />

          {/* Status */}

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status:
                  e.target.value as ProductionStatus,
              })
            }
            className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400"
          >
            <option value="not-ordered">
              Not Ordered
            </option>

            <option value="ordered">
              Ordered
            </option>

            <option value="in-production">
              In Production
            </option>

            <option value="shipped">
              Shipped
            </option>

            <option value="arrived">
              Arrived
            </option>
          </select>

          {/* Notes */}

          <input
            type="text"
            value={formData.notes ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                notes: e.target.value,
              })
            }
            placeholder="Notes"
            className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400 md:col-span-3"
          />
        </div>

        <div className="mt-3 flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="rounded-xl px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-xl bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 transition hover:border-violet-200 hover:bg-violet-50/30">

      <div className="grid gap-4 md:grid-cols-6 md:items-center">

        {/* Vendor */}

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
            Vendor
          </p>

          <p className="mt-1 text-sm font-semibold text-stone-800">
            {order.vendor}
          </p>
        </div>

        {/* Merch */}

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
            Merch
          </p>

          <p className="mt-1 text-sm text-stone-700">
            {merchName}
          </p>
        </div>

        {/* Variant */}

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
            Variant
          </p>

          <p className="mt-1 text-sm text-stone-700">
            {variantName}
          </p>
        </div>

        {/* Quantity */}

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
            Quantity
          </p>

          <p className="mt-1 text-sm text-stone-700">
            {order.orderedQuantity} pcs
          </p>
        </div>

        {/* Cost */}

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
            Unit Cost
          </p>

          <p className="mt-1 text-sm text-stone-700">
            Rp{" "}
            {order.unitCost.toLocaleString(
              "id-ID"
            )}
          </p>
        </div>

        {/* Status + actions */}

        <div className="flex items-center justify-between gap-2 md:flex-col md:items-end">

          <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700">
            {order.status
              .replace("-", " ")}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setEditing(true)
              }
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-violet-600 transition hover:bg-violet-100"
            >
              Edit
            </button>

            <button
              onClick={() =>
                onDelete(order.id)
              }
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {order.notes && (
        <p className="mt-3 border-t border-stone-200 pt-3 text-xs text-stone-500">
          Note: {order.notes}
        </p>
      )}
    </div>
  );
}