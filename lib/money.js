export function formatPriceHuf(forints) {
  return (forints ?? 0).toLocaleString("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
  });
}
