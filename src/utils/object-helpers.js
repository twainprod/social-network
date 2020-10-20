export const updateObjectInArray = (
  items, // массив
  itemId, // значение для сравнения
  objPropName, // свойство объекта
  newObjProps // часть объекта, который изменяем
) => {
  return items.map((u) => {
    if (u[objPropName] === itemId) {
      return { ...u, ...newObjProps };
    }
    return u;
  });
};
// Функция вернет новый массив. Сравниваются два свойства и возвращается копия массива с измененными свойствами.
