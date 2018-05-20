import {PizzasEffects} from '@products/store/effects/pizzas.effect';
import {ToppingsEffects} from '@products/store/effects/toppings.effect';

export const effects = [PizzasEffects, ToppingsEffects];

export * from './pizzas.effect';
