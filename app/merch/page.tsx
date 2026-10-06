"use client";


import { useState } from "react";
import { Merch, MerchVariant } from "@/types";
import MerchCard from "@/components/merch-card";
import AddMerchForm from "@/components/add-merch-form";

const initialMerchList: Merch[] = [
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
];

export default function MerchPage() {
  const [merchList, setMerchList] =
    useState<Merch[]>(initialMerchList);

  const [showForm, setShowForm] =
    useState(false);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-violet-600">
              Merch Planning
            </p>

            <h1 className="mt-1 text-3xl font-bold text-stone-800">
              Merch Masterlist
            </h1>

            <p className="mt-2 text-sm text-stone-500">
              Plan your merch, variants, pricing, and production quantities.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
          >
            + Add Merch
          </button>
        </div>
      </section>

      {showForm && (
        <AddMerchForm
          onAdd={(newMerch) => {
            setMerchList((current) => [
              ...current,
              newMerch,
            ]);

            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="space-y-4">
        {merchList.map((merch) => (
          <MerchCard
            key={merch.id}
            merch={merch}
            onDelete={() => {
              setMerchList((current) =>
                current.filter(
                  (item) => item.id !== merch.id
                )
              );
            }}
            onUpdate={(updatedMerch) => {
              setMerchList((current) =>
                current.map((item) =>
                  item.id === updatedMerch.id
                    ? updatedMerch
                    : item
                )
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}