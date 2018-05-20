import {ITopping} from '@products/models/topping.model';

export interface IPizza {
    id?: number;
    name?: string;
    toppings?: ITopping[];
}
