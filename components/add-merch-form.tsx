"use client";

import { useState } from "react";
import { Merch } from "@/types";

interface AddMerchFormProps {
  onAdd: (merch: Merch) => void;
  onCancel: () => void;
}

export default function AddMerchForm({
  onAdd,
  onCancel,
}: AddMerchFormProps) {
  const [name, setName] =
    useState("");

  const [category, setCategory] =
    useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!name.trim() || !category.trim()) {
      return;
    }

    const newMerch: Merch = {
      id: crypto.randomUUID(),
      name: name.trim(),
      category: category.trim(),
      status: "idea",
      variants: [],
    };

    onAdd(newMerch);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold">
        Add New Merch
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Merch Name
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Your merch name"
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Category
          </label>

          <input
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            placeholder="e.g. Sticker"
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          Add Merch
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}