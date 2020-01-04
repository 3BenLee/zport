export function getDishName(dish, dishes) {
  if (!dish.id) return;
  let obj = dishes.find(item => item.id.toString() === dish.id);
  return obj.name;
}
