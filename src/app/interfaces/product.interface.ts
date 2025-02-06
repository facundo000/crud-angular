import { Brand } from "./brand.interface";
import { Category } from "./category.interface";

export interface Product {
    cod_product: string;
    description: string;
    price:       string;
    id_brand:    Brand;
    id_category: Category;
}



