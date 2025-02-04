import { Brand } from "./brand";
import { Category } from "./category";

export interface Product {
    cod_product: string;
    description: string;
    price:       string;
    id_brand:    Brand;
    id_category: Category;
}



