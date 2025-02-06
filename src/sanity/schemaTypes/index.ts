import { type SchemaTypeDefinition } from "sanity";
import { productListType } from "./productListType";
import { productApi } from "./products";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productListType, productApi],
};
