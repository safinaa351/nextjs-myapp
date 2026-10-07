"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Merch, MerchVariant } from "@/types";
import MerchCard from "@/components/merch-card";
import AddMerchForm from "@/components/add-merch-form";


export default function MerchPage() {
  const [merchList, setMerchList] = useState<Merch[]>([]);
  const [loading, setLoading] = useState(true); 
  const [showForm, setShowForm] = useState(false);

  async function fetchMerch() {
    setLoading(true);

    const { data, error } = await supabase
      .from("merch")
      .select(`
        id,
        name,
        category,
        status,
        variants:merch_variants (
          id,
          name,
          planned_quantity,
          selling_price,
          unit_cost
        )
      `)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching merch:", error);
      setLoading(false);
      return;
    }

    const formattedMerch: Merch[] = data.map((merch) => ({
      id: merch.id,
      name: merch.name,
      category: merch.category,
      status: merch.status as Merch["status"],
      variants: merch.variants.map((variant) => ({
        id: variant.id,
        name: variant.name,
        plannedQuantity: variant.planned_quantity,
        sellingPrice: variant.selling_price,
        unitCost: variant.unit_cost,
      })),
    }));

    setMerchList(formattedMerch);
    setLoading(false);
  }

  useEffect(() => {
    fetchMerch();
  }, []);

  //add function
  async function handleAddMerch(newMerch: Merch) {
    const { error } = await supabase
      .from("merch")
      .insert({
        id: newMerch.id,
        name: newMerch.name,
        category: newMerch.category,
        status: newMerch.status,
      });

    if (error) {
      console.error("Error adding merch:", error);
      alert("Failed to add merch.");
      return;
    }

    await fetchMerch();
    setShowForm(false);
  }

  // edit and delete functions
  async function handleUpdateMerch(updatedMerch: Merch) {
    const previousMerch = merchList.find(
      (merch) => merch.id === updatedMerch.id
    );

    if (!previousMerch) {
      return;
    }

    // Update merch itself
    const { error: merchError } = await supabase
      .from("merch")
      .update({
        name: updatedMerch.name,
        category: updatedMerch.category,
        status: updatedMerch.status,
      })
      .eq("id", updatedMerch.id);

    if (merchError) {
      console.error("Error updating merch:", merchError);
      alert("Failed to update merch.");
      return;
    }

    // Update existing variants
    for (const variant of updatedMerch.variants) {
      const existingVariant = previousMerch.variants.find(
        (oldVariant) => oldVariant.id === variant.id
      );

      if (existingVariant) {
        const { error: variantError } = await supabase
          .from("merch_variants")
          .update({
            name: variant.name,
            planned_quantity: variant.plannedQuantity,
            selling_price: variant.sellingPrice,
            unit_cost: variant.unitCost,
          })
          .eq("id", variant.id);

        if (variantError) {
          console.error(
            "Error updating variant:",
            variantError
          );
          alert("Failed to update variant.");
          return;
        }
      }
    }

    // Add new variants
    const newVariants = updatedMerch.variants.filter(
      (variant) =>
        !previousMerch.variants.some(
          (oldVariant) => oldVariant.id === variant.id
        )
    );

    if (newVariants.length > 0) {
      const { error: insertVariantError } = await supabase
        .from("merch_variants")
        .insert(
          newVariants.map((variant) => ({
            id: variant.id,
            merch_id: updatedMerch.id,
            name: variant.name,
            planned_quantity: variant.plannedQuantity,
            selling_price: variant.sellingPrice,
            unit_cost: variant.unitCost,
          }))
        );

      if (insertVariantError) {
        console.error(
          "Error adding variants:",
          insertVariantError
        );
        alert("Failed to add variant.");
        return;
      }
    }

    // Delete removed variants
    const removedVariants = previousMerch.variants.filter(
      (oldVariant) =>
        !updatedMerch.variants.some(
          (variant) => variant.id === oldVariant.id
        )
    );

    for (const variant of removedVariants) {
      const { error: deleteVariantError } = await supabase
        .from("merch_variants")
        .delete()
        .eq("id", variant.id);

      if (deleteVariantError) {
        console.error(
          "Error deleting variant:",
          deleteVariantError
        );
        alert(
          "Failed to delete variant. It may already be used by a production order."
        );
        return;
      }
    }

    await fetchMerch();
  }

  //loading state return
  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-stone-500">
        Loading merch data...
      </div>
    );
  }

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
          onAdd={handleAddMerch}
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
            onUpdate={handleUpdateMerch}
          />
        ))}
      </div>
    </div>
  );
}