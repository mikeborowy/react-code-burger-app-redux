import { capitalize } from '../helpers/index';
import { INGREDIENTS } from './ingredients';

export const BUILD_CONTROLS = [
    { label: capitalize(INGREDIENTS.BACON), type: INGREDIENTS.BACON},
    { label: capitalize(INGREDIENTS.CHEESE), type: INGREDIENTS.CHEESE},
    { label: capitalize(INGREDIENTS.MEAT), type: INGREDIENTS.MEAT},
    { label: capitalize(INGREDIENTS.SALAD), type: INGREDIENTS.SALAD}
]