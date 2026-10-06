"use client";

import { useState } from "react";
import type { ProductionBatch } from "@/types";

interface ProductionBatchRowProps {
  batch: ProductionBatch;
  onUpdate: (batch: ProductionBatch) => void;
  onDelete: (id: string) => void;
}

export default function ProductionBatchRow({
  batch,
  onUpdate,
  onDelete,
}: ProductionBatchRowProps) {
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState(batch);

  function handleSave() {
    onUpdate({
      ...formData,
      vendor: formData.vendor.trim(),
      notes: formData.notes?.trim() || undefined,
    });

    setEditing(false);
  }

  function handleCancel() {
    setFormData(batch);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="rounded-xl border border-violet-100 bg-violet-50/40 p-4">
        <div className="grid gap-3 md:grid-cols-6">
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
            placeholder="Ordered"
            className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400"
          />

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
            placeholder="Received"
            className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400"
          />

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
            placeholder="Unit cost"
            className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400"
          />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as ProductionBatch["status"],
              })
            }
            className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400"
          >
            <option value="not-ordered">Not Ordered</option>
            <option value="ordered">Ordered</option>
            <option value="in-production">In Production</option>
            <option value="shipped">Shipped</option>
            <option value="arrived">Arrived</option>
          </select>

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
            className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400"
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
        <div>
          <p className="text-xs font-medium text-stone-400">Vendor</p>
          <p className="mt-1 text-sm font-semibold text-stone-800">
            {batch.vendor}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-stone-400">Ordered</p>
          <p className="mt-1 text-sm text-stone-700">
            {batch.orderedQuantity}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-stone-400">Received</p>
          <p className="mt-1 text-sm text-stone-700">
            {batch.receivedQuantity}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-stone-400">Unit Cost</p>
          <p className="mt-1 text-sm text-stone-700">
            Rp {batch.unitCost.toLocaleString("id-ID")}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-stone-400">Status</p>
          <p className="mt-1 text-sm font-medium text-violet-600">
            {batch.status.replace("-", " ")}
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditing(true)}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-violet-600 transition hover:bg-violet-100"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(batch.id)}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>

      {batch.notes && (
        <p className="mt-3 border-t border-stone-200 pt-3 text-xs text-stone-500">
          Note: {batch.notes}
        </p>
      )}
    </div>
  );
}