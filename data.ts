import { Package } from "./src/app/types/types";
interface Product extends Package {
  name: string;
}

export const cartProductsWhichCanBeShipped: Product[] = [
  {
    name: "Product 1",
    weight: { value: 5, unit: "ounce" },
    dimensions: { height: 3, width: 15, length: 10, unit: "inch" },
  },
  {
    name: "Product 2",
    weight: { value: 0.5, unit: "ounce" },
    dimensions: { height: 0.5, width: 3, length: 6, unit: "inch" },
  },
  {
    name: "Product 3",
    weight: { value: 0.8, unit: "ounce" },
    dimensions: { height: 8, width: 6, length: 3, unit: "inch" },
  },
];
