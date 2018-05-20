import {PizzasGuard} from '@products/guards/pizzas.guard';
import {PizzaExistsGuards} from '@products/guards/pizza-exists.guard';
import {ToppingsGuard} from '@products/guards/toppings.guard';

export const guards = [PizzasGuard, PizzaExistsGuards, ToppingsGuard];

export * from '@products/guards/pizzas.guard';
export * from '@products/guards/pizza-exists.guard';
export * from '@products/guards/toppings.guard';
