import {
  merchList,
  productionBatches,
} from "@/data/mock-data";

export default function ProductionPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold">
          Production Planning
        </h1>

        <p className="mt-2 text-gray-500">
          Track production requirements and vendor
          orders.
        </p>
      </section>

      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                Product
              </th>

              <th className="px-6 py-4 text-left">
                Vendor
              </th>

              <th className="px-6 py-4 text-right">
                Required
              </th>

              <th className="px-6 py-4 text-right">
                Ordered
              </th>

              <th className="px-6 py-4 text-right">
                Received
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {productionBatches.map((batch) => {
              const required =
                getRequiredQuantity(
                  batch.merchVariantId
                );

              return (
                <tr
                  key={batch.id}
                  className="border-b last:border-0"
                >
                  <td className="px-6 py-4 font-medium">
                    {getVariantName(
                      batch.merchVariantId
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {batch.vendor}
                  </td>

                  <td className="px-6 py-4 text-right">
                    {required}
                  </td>

                  <td className="px-6 py-4 text-right">
                    {batch.orderedQuantity}
                  </td>

                  <td className="px-6 py-4 text-right">
                    {batch.receivedQuantity}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge
                      status={batch.status}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getRequiredQuantity(
  variantId: string
) {
  for (const merch of merchList) {
    const variant = merch.variants.find(
      (variant) => variant.id === variantId
    );

    if (variant) {
      return variant.plannedQuantity;
    }
  }

  return 0;
}

function getVariantName(id: string) {
  for (const merch of merchList) {
    const variant = merch.variants.find(
      (variant) => variant.id === id
    );

    if (variant) {
      return `${merch.name} — ${variant.name}`;
    }
  }

  return "Unknown";
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const labels: Record<string, string> = {
    "not-ordered": "Not Ordered",
    ordered: "Ordered",
    "in-production": "In Production",
    shipped: "Shipped",
    arrived: "Arrived",
  };

  return (
    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
      {labels[status] ?? status}
    </span>
  );
}