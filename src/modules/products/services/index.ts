import {PizzasService} from '@products/services/pizzas.service';
import {ToppingsService} from '@products/services/toppings.service';

export const services = [PizzasService, ToppingsService];

export * from './pizzas.service';
export * from './toppings.service';
