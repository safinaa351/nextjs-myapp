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
      className="rounded-xl border bg-white p-6"
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
            placeholder="e.g. Towa Sticker"
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
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-black px-4 py-2 text-sm text-white"
        >
          Add Merch
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-4 py-2 text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}