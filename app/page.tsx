import {
  currentArtcon,
  merchList,
  productionOrders,
} from "@/data/mock-data";

export default function Home() {
  const totalProducts = merchList.length;

  const totalVariants = merchList.reduce(
    (total, merch) => total + merch.variants.length,
    0
  );

  const totalPlannedQuantity = merchList.reduce(
    (total, merch) =>
      total +
      merch.variants.reduce(
        (variantTotal, variant) =>
          variantTotal + variant.plannedQuantity,
        0
      ),
    0
  );

  const totalProductionCost = merchList.reduce(
    (total, merch) =>
      total +
      merch.variants.reduce(
        (variantTotal, variant) =>
          variantTotal +
          variant.plannedQuantity * variant.unitCost,
        0
      ),
    0
  );

  const expectedRevenue = merchList.reduce(
    (total, merch) =>
      total +
      merch.variants.reduce(
        (variantTotal, variant) =>
          variantTotal +
          variant.plannedQuantity * variant.sellingPrice,
        0
      ),
    0
  );

  const expectedProfit =
    expectedRevenue - totalProductionCost;

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm text-gray-500">
          Current Artcon
        </p>

        <h1 className="text-3xl font-bold">
          {currentArtcon.name}
        </h1>

        <p className="mt-2 text-gray-500">
          {currentArtcon.date} · {currentArtcon.location}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard
          label="Merch"
          value={totalProducts}
        />

        <StatCard
          label="Variants"
          value={totalVariants}
        />

        <StatCard
          label="Planned Units"
          value={totalPlannedQuantity}
        />

        <StatCard
          label="Expected Profit"
          value={`Rp ${expectedProfit.toLocaleString("id-ID")}`}
        />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold">
            Production
          </h2>

          <div className="mt-4 space-y-3">
            {productionOrders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between border-b pb-3"
              >
                <div>
                  <p className="font-medium">
                    {getVariantName(
                      order.merchVariantId
                    )}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.vendor}
                  </p>
                </div>

                <p className="text-sm">
                  {order.orderedQuantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold">
            Financial Overview
          </h2>

          <div className="mt-4 space-y-4">
            <SummaryRow
              label="Production Cost"
              value={totalProductionCost}
            />

            <SummaryRow
              label="Expected Revenue"
              value={expectedRevenue}
            />

            <SummaryRow
              label="Expected Profit"
              value={expectedProfit}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span className="text-gray-500">
        {label}
      </span>

      <span className="font-semibold">
        Rp {value.toLocaleString("id-ID")}
      </span>
    </div>
  );
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