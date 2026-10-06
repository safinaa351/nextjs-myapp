"use client";

import { useState } from "react";
import { merchList as initialMerchList } from "@/data/mock-data";
import { productionOrders as initialProductionOrders } from "@/data/mock-data";
import type { ProductionOrder } from "@/types";

import AddProductionForm from "@/components/add-production-form";
import ProductionOrderRow from "@/components/production-order-row";

export default function ProductionPage() {
  const [merchList] = useState(initialMerchList);

  const [orders, setOrders] =
    useState<ProductionOrder[]>(initialProductionOrders);

  const [showForm, setShowForm] =
    useState(false);

  function handleAddOrder(order: ProductionOrder) {
    setOrders((current) => [
      ...current,
      order,
    ]);

    setShowForm(false);
  }

  function handleUpdateOrder(
    updatedOrder: ProductionOrder
  ) {
    setOrders((current) =>
      current.map((order) =>
        order.id === updatedOrder.id
          ? updatedOrder
          : order
      )
    );
  }

  function handleDeleteOrder(id: string) {
    setOrders((current) =>
      current.filter(
        (order) => order.id !== id
      )
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-violet-600">
              Production Planning
            </p>

            <h1 className="mt-1 text-3xl font-bold text-stone-800">
              Production Orders
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-stone-500">
              Track your merch production orders, vendors,
              quantities, costs, and production status.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
          >
            + Add Production Order
          </button>
        </div>
      </section>

      {/* Add Production Order */}

      {showForm && (
        <AddProductionForm
          merchList={merchList}
          onAdd={handleAddOrder}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Production Orders */}

      <section className="rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-100 p-6">
          <h2 className="text-lg font-semibold text-stone-800">
            Production Orders
          </h2>

          <p className="mt-1 text-sm text-stone-500">
            Each row represents one order placed with a vendor.
          </p>
        </div>

        <div className="space-y-3 p-6">
          {orders.length === 0 ? (
            <div className="rounded-xl border border-dashed border-stone-200 bg-stone-50 p-8 text-center">
              <p className="text-sm text-stone-500">
                No production orders yet.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="mt-2 text-sm font-medium text-violet-600 hover:text-violet-700"
              >
                Add your first production order
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <ProductionOrderRow
                key={order.id}
                order={order}
                merchList={merchList}
                onUpdate={handleUpdateOrder}
                onDelete={handleDeleteOrder}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}