"use client";

import { useState } from "react";
import { merchList as initialMerchList } from "@/data/mock-data";

// Note: update mock-data.ts export to match "productionOrders" instead of "productionBatches"
import { productionOrders as initialProductionOrders } from "@/data/mock-data"; 
import type { ProductionOrder } from "@/types";

import AddProductionForm from "@/components/add-production-form";
import ProductionCard from "@/components/production-card";

export default function ProductionPage() {
  const [merchList] = useState(initialMerchList);
  const [orders, setOrders] = useState<ProductionOrder[]>(initialProductionOrders);
  const [showForm, setShowForm] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");

  function handleShowAddForm(variantId = "") {
    setSelectedVariantId(variantId);
    setShowForm(true);
  }

  function handleAddOrder(order: ProductionOrder) {
    setOrders((current) => [...current, order]);
    setShowForm(false);
    setSelectedVariantId("");
  }

  function handleUpdateOrder(updatedOrder: ProductionOrder) {
    setOrders((current) =>
      current.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  }

  function handleDeleteOrder(id: string) {
    setOrders((current) => current.filter((order) => order.id !== id));
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-violet-600">
              Production Planning
            </p>
            <h1 className="mt-1 text-3xl font-bold text-stone-800">
              Production
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-stone-500">
              Track vendor orders, received quantities, and production progress
              for each merch variant.
            </p>
          </div>

          <button
            onClick={() => handleShowAddForm()}
            className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
          >
            + Add Production Order
          </button>
        </div>
      </section>

      {/* Add Form */}
      {showForm && (
        <AddProductionForm
          merchList={merchList}
          initialVariantId={selectedVariantId}
          onAdd={handleAddOrder}
          onCancel={() => {
            setShowForm(false);
            setSelectedVariantId("");
          }}
        />
      )}

      {/* Production Cards */}
      <div className="space-y-4">
        {merchList.flatMap((merch) =>
          merch.variants.map((variant) => (
            <ProductionCard
              key={variant.id}
              variant={variant}
              orders={orders}
              onAddOrder={handleShowAddForm}
              onUpdateOrder={handleUpdateOrder}
              onDeleteOrder={handleDeleteOrder}
            />
          ))
        )}
      </div>
    </div>
  );
}