import { Ingredient } from '../shared/ingredient.model';

export interface Recipe {
  id: number;
  name: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
}
