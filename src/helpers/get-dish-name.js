export function getDishName(dish, dishes) {
  let obj = dishes.find(item => item.id.toString() === dish.id)
  return obj.name;
}