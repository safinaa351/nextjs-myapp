"use client";

import { useState } from "react";
import type {
  Merch,
  ProductionOrder,
  ProductionStatus,
} from "@/types";

interface AddProductionFormProps {
  merchList: Merch[];
  onAdd: (order: ProductionOrder) => void;
  onCancel: () => void;
}

export default function AddProductionForm({
  merchList,
  onAdd,
  onCancel,
}: AddProductionFormProps) {
  const [vendor, setVendor] =
    useState("");

  const [merchId, setMerchId] =
    useState("");

  const [merchVariantId, setMerchVariantId] =
    useState("");

  const [orderedQuantity, setOrderedQuantity] =
    useState(0);

  const [unitCost, setUnitCost] =
    useState(0);

  const [status, setStatus] =
    useState<ProductionStatus>("not-ordered");

  const [notes, setNotes] =
    useState("");

  const selectedMerch = merchList.find(
    (merch) => merch.id === merchId
  );

  const variants =
    selectedMerch?.variants ?? [];

  function handleMerchChange(
    selectedMerchId: string
  ) {
    setMerchId(selectedMerchId);

    // Reset variant whenever merch changes.
    setMerchVariantId("");
  }

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      !vendor.trim() ||
      !merchId ||
      !merchVariantId
    ) {
      return;
    }

    const newOrder: ProductionOrder = {
      id: crypto.randomUUID(),
      vendor: vendor.trim(),
      merchId,
      merchVariantId,
      orderedQuantity: Number(
        orderedQuantity
      ),
      unitCost: Number(unitCost),
      status,
      notes: notes.trim() || undefined,
    };

    onAdd(newOrder);
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
          Add Production Order
        </h2>

        <p className="mt-1 text-sm text-stone-500">
          Record an order placed with a vendor.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {/* Vendor */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Vendor
          </label>

          <input
            type="text"
            value={vendor}
            onChange={(e) =>
              setVendor(e.target.value)
            }
            placeholder="e.g. Sticker Vendor A"
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            required
          />
        </div>

        {/* Merch */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Merch
          </label>

          <select
            value={merchId}
            onChange={(e) =>
              handleMerchChange(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            required
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
        </div>

        {/* Variant */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Variant
          </label>

          <select
            value={merchVariantId}
            onChange={(e) =>
              setMerchVariantId(
                e.target.value
              )
            }
            disabled={!merchId}
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-stone-100"
            required
          >
            <option value="">
              {merchId
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
        </div>

        {/* Ordered Quantity */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Ordered Quantity
          </label>

          <input
            type="number"
            min="0"
            value={orderedQuantity}
            onChange={(e) =>
              setOrderedQuantity(
                Number(e.target.value)
              )
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
            value={unitCost}
            onChange={(e) =>
              setUnitCost(
                Number(e.target.value)
              )
            }
            placeholder="e.g. 3500"
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        {/* Status */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as ProductionStatus
              )
            }
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
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
        </div>

        {/* Notes */}

        <div className="md:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Notes
          </label>

          <input
            type="text"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
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
          Add Order
        </button>
      </div>
    </form>
  );
}