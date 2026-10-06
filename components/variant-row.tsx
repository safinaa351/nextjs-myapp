"use client";

import { useState } from "react";
import { MerchVariant } from "@/types";

interface VariantRowProps {
  variant: MerchVariant;
  onUpdate: (
    variant: MerchVariant
  ) => void;
  onDelete: () => void;
}

export default function VariantRow({
  variant,
  onUpdate,
  onDelete,
}: VariantRowProps) {
  const [editing, setEditing] =
    useState(false);

  const [name, setName] =
    useState(variant.name);

  const [quantity, setQuantity] =
    useState(variant.plannedQuantity);

  const [sellingPrice, setSellingPrice] =
    useState(variant.sellingPrice);

  const [unitCost, setUnitCost] =
    useState(variant.unitCost);

  function save() {
    onUpdate({
      ...variant,
      name,
      plannedQuantity: quantity,
      sellingPrice,
      unitCost,
    });

    setEditing(false);
  }

  const profit =
    variant.sellingPrice -
    variant.unitCost;

  if (editing) {
    return (
      <div className="rounded-lg border bg-gray-50 p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="rounded-lg border px-3 py-2"
            placeholder="Variant"
          />

          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                Number(e.target.value)
              )
            }
            className="rounded-lg border px-3 py-2"
            placeholder="Quantity"
          />

          <input
            type="number"
            value={sellingPrice}
            onChange={(e) =>
              setSellingPrice(
                Number(e.target.value)
              )
            }
            className="rounded-lg border px-3 py-2"
            placeholder="Selling price"
          />

          <input
            type="number"
            value={unitCost}
            onChange={(e) =>
              setUnitCost(
                Number(e.target.value)
              )
            }
            className="rounded-lg border px-3 py-2"
            placeholder="Unit cost"
          />
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={save}
            className="rounded-lg bg-black px-4 py-2 text-sm text-white"
          >
            Save
          </button>

          <button
            onClick={() =>
              setEditing(false)
            }
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 transition hover:border-violet-200 hover:bg-violet-50/30">
      <div className="grid items-center gap-4 md:grid-cols-6">
        <div className="font-semibold text-stone-800">
          {variant.name}
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
            Planned
          </p>

          <p className="mt-1 font-medium text-stone-700">
            {variant.plannedQuantity} pcs
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
            Selling Price
          </p>

          <p className="mt-1 font-medium text-stone-700">
            Rp{" "}
            {variant.sellingPrice.toLocaleString("id-ID")}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
            Unit Cost
          </p>

          <p className="mt-1 font-medium text-stone-700">
            Rp{" "}
            {variant.unitCost.toLocaleString("id-ID")}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
            Profit / Unit
          </p>

          <p
            className={`mt-1 font-semibold ${
              profit >= 0
                ? "text-emerald-600"
                : "text-red-500"
            }`}
          >
            Rp {profit.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="flex gap-2 md:justify-end">
          <button
            onClick={() => setEditing(true)}
            className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:bg-stone-100"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}