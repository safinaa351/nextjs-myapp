"use client";

import { useState } from "react";
import { Merch, MerchVariant } from "@/types";
import VariantRow from "@/components/variant-row";

interface MerchCardProps {
  merch: Merch;
  onDelete: () => void;
  onUpdate: (merch: Merch) => void;
}

export default function MerchCard({
  merch,
  onDelete,
  onUpdate,
}: MerchCardProps) {
  const [editing, setEditing] =
    useState(false);

  const [name, setName] =
    useState(merch.name);

  const [category, setCategory] =
    useState(merch.category);

  function saveChanges() {
    onUpdate({
      ...merch,
      name,
      category,
    });

    setEditing(false);
  }

  function addVariant() {
    const newVariant: MerchVariant = {
      id: crypto.randomUUID(),
      name: "New Variant",
      plannedQuantity: 0,
      sellingPrice: 0,
      unitCost: 0,
    };

    onUpdate({
      ...merch,
      variants: [
        ...merch.variants,
        newVariant,
      ],
    });
  }

  function updateVariant(
    updatedVariant: MerchVariant
  ) {
    onUpdate({
      ...merch,
      variants: merch.variants.map(
        (variant) =>
          variant.id === updatedVariant.id
            ? updatedVariant
            : variant
      ),
    });
  }

  function deleteVariant(
    variantId: string
  ) {
    onUpdate({
      ...merch,
      variants: merch.variants.filter(
        (variant) =>
          variant.id !== variantId
      ),
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      {/* MERCH HEADER */}

      {editing ? (
        <div className="space-y-4 bg-violet-50/40 p-6">
          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Merch name"
          />

          <input
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Category"
          />

          <div className="flex gap-2">
            <button
              onClick={saveChanges}
              className="rounded-lg bg-black px-4 py-2 text-sm text-white"
            >
              Save
            </button>

            <button
              onClick={() => setEditing(false)}
              className="rounded-lg border px-4 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between bg-gradient-to-r from-violet-50 to-white p-6">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-stone-800">
                {merch.name}
              </h2>

              <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700">
                {merch.status}
              </span>
            </div>

            <p className="mt-1 text-sm text-stone-500">
              {merch.category}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
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
      )}

      {/* VARIANTS */}

      <div className="border-t border-stone-100 p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-medium">
            Variants
          </h3>

          <button
            onClick={addVariant}
            className="text-sm font-medium underline"
          >
            + Add Variant
          </button>
        </div>

        <div className="space-y-2">
          {merch.variants.map(
            (variant) => (
              <VariantRow
                key={variant.id}
                variant={variant}
                onUpdate={updateVariant}
                onDelete={() =>
                  deleteVariant(
                    variant.id
                  )
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}