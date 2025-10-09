import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { clearColor, getProductsByColor, renderCondition, setVariable, fetchSheetsByFilter } from "../../../redux/actions/productActions";
const FilterColor = () => {
  const colors = useSelector((state) => state.sheets.colors);
  const dispatch = useDispatch();

  const filterVar = useSelector((state) => state.sheets.filterVar);

  const handleColorFilter = (event) => {
    const color = event.target.value;

    if (color !== "Todos") {
      const newFilter = {};
      if (filterVar && typeof filterVar === "object") Object.assign(newFilter, filterVar);
      else if (filterVar && typeof filterVar === "string") newFilter.category = filterVar;
      newFilter.color = color;

      dispatch(fetchSheetsByFilter(newFilter));
      dispatch(renderCondition("filteredProducts"));
      dispatch(setVariable(newFilter));
    } else {
      // If 'Todos' selected, remove color from filter. If a category exists, fetch by category only
      if (filterVar && typeof filterVar === "object" && filterVar.category) {
        const newFilter = { category: filterVar.category };
        dispatch(fetchSheetsByFilter(newFilter));
        dispatch(renderCondition("filteredProducts"));
        dispatch(setVariable(newFilter));
      } else if (filterVar && typeof filterVar === "string") {
        dispatch(fetchSheetsByFilter({ category: filterVar }));
        dispatch(renderCondition("filteredProducts"));
        dispatch(setVariable({ category: filterVar }));
      } else {
        dispatch(renderCondition("allProducts"));
        dispatch(clearColor());
        dispatch(setVariable(null));
      }
    }
  };

  return (
    <div className="flex items-center mt-5 px-1">
      <div className="p-4 rounded-md">
        <div className="grid grid-cols-2 flex-col gap-2">
          <button
            value={"Todos"}
            onClick={handleColorFilter}
            className="px-3 py-2 bg-secondary rounded-md text-white text-xs"
          >
            Todos
          </button>
          {colors.map((color, index) => (
            <button
              key={index}
              value={color}
              onClick={handleColorFilter}
              className="px-3 flex justify-center items-center py-3 bg-secondary w-max rounded-md text-white text-xs whitespace-nowrap" // Ajusta padding y font-size
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterColor;
