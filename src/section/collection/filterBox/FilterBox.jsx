import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi"; // Add FiPlus for collapsed state
import FilterBoxStyleWrapper from "./FilterBox.style";

const FilterBox = ({ category, handleFilterChange }) => {
  const [collapse, setCollapse] = useState(true); // Start as collapsed by default
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleCollapse = () => {
    setCollapse(!collapse); // Toggle collapse state
  };

  const handleCheckboxChange = (title) => {
    let updatedFilters = [...selectedFilters];
    if (updatedFilters.includes(title)) {
      // Remove filter if it's already selected
      updatedFilters = updatedFilters.filter((item) => item !== title);
    } else {
      // Add filter
      updatedFilters.push(title);
    }
    setSelectedFilters(updatedFilters);
    handleFilterChange(category.widgetTitle, updatedFilters); // Pass selected filters back to parent
  };

  return (
    <FilterBoxStyleWrapper
      className={`filter_box_wrapper ${collapse ? "filter_box_collapse" : ""}`} // Add collapse class based on state
    >
      <div className="box_header">
        <button onClick={handleCollapse}>
          {category.widgetTitle} {collapse ? <FiPlus /> : <FiMinus />}
        </button>
      </div>
      {!collapse && (
        <div className="box_items">
          {category?.items?.map((item, idx) => (
            <div key={idx} className="filter_checkbox">
              <label className="checkbox_container">
                {item.title} <span>({item.products})</span>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(item.title)}
                  onChange={() => handleCheckboxChange(item.title)}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          ))}
        </div>
      )}
    </FilterBoxStyleWrapper>
  );
};

export default FilterBox;
