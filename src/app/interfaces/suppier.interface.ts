import { Neighborhood } from "./neighborhood.interface";

export interface Supplier {
    cod_prov:        string;
    name:            string;
    direction:       string;
    phone:           string;
    mail:            null | string;
    id_neighborhood: Neighborhood;
}
