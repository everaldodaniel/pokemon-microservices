export function formatEnumLabel(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatMeasure(value: number, unit: string) {
  return `${Number(value).toLocaleString("pt-BR", {
    maximumFractionDigits: 2,
  })} ${unit}`;
}
