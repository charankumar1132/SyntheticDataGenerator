import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import "../App.css";

const ColumnInputForm = ({ column, index, handleColumnChange, deleteColumn, errors }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === "checkbox" ? checked : value;
    handleColumnChange(index, name, newVal);
  };

  return (
    <div className="column-card">
      <div className="column-header">
        <div className="column-title">
          <label htmlFor={`col-name-${index}`}>
            Column Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id={`col-name-${index}`}
            name="name"
            value={column.name}
            onChange={handleInputChange}
            placeholder="Enter column name"
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="column-actions">
          <button type="button" className="toggle-button" onClick={toggleExpand} title={isExpanded ? "Collapse" : "Expand"}>
            {isExpanded ? <FiChevronUp size="24px" /> : <FiChevronDown size="24px" />}
          </button>
          {deleteColumn && (
            <button type="button" className="delete-button" onClick={() => deleteColumn(index)} title="Delete Column">
              <FaTrash size="20px" />
            </button>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="column-body">
          <div className="field-group">
            <label htmlFor={`col-type-${index}`}>
              Type <span className="required">*</span>
            </label>
            <select id={`col-type-${index}`} name="type" value={column.type} onChange={handleInputChange}>
              <option value="">Select type</option>
              <option value="int">int</option>
              <option value="float">float</option>
              <option value="string">string</option>
              <option value="double">double</option>
              <option value="datetime">datetime</option>
              <option value="bool">bool</option>
            </select>
            {errors.type && <div className="error">{errors.type}</div>}
          </div>
          
          <div className="field-group">
            <label htmlFor={`col-length-${index}`}>Length</label>
            <input
              type="number"
              id={`col-length-${index}`}
              name="length"
              value={column.length}
              onChange={handleInputChange}
              min={1}
              placeholder="Enter length"
            />
          </div>
          <div className="field-group">
            <label htmlFor={`col-example-${index}`}>Example</label>
            <input
              type="text"
              id={`col-example-${index}`}
              name="example"
              value={column.example}
              onChange={handleInputChange}
              placeholder="e.g., sample value"
            />
          </div>
          <div className="field-group">
            <label htmlFor={`col-description-${index}`}>
              Description <span className="required">*</span>
            </label>
            <textarea
              id={`col-description-${index}`}
              name="description"
              value={column.description}
              onChange={handleInputChange}
              placeholder="Describe this column"
            />
            {errors.description && <div className="error">{errors.description}</div>}
          </div>
          <div className="field-group">
            <label htmlFor={`col-range-min-${index}`}>Range Min</label>
            <input
              type="number"
              id={`col-range-min-${index}`}
              name="rangeMin"
              value={column.rangeMin}
              onChange={handleInputChange}
              placeholder="Min value"
            />
          </div>
          <div className="field-group">
            <label htmlFor={`col-range-max-${index}`}>Range Max</label>
            <input
              type="number"
              id={`col-range-max-${index}`}
              name="rangeMax"
              value={column.rangeMax}
              onChange={handleInputChange}
              placeholder="Max value"
            />
          </div>
          <div className="field-group">
            <label htmlFor={`col-pattern-${index}`}>Pattern</label>
            <input
              type="text"
              id={`col-pattern-${index}`}
              name="pattern"
              value={column.pattern}
              onChange={handleInputChange}
              placeholder="Regex pattern"
            />
          </div>
          <div className="checkboxes">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id={`col-primary-${index}`}
                name="isPrimary"
                checked={column.isPrimary}
                onChange={handleInputChange}
              />
              <label htmlFor={`col-primary-${index}`}>Primary</label>
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id={`col-unique-${index}`}
                name="isUnique"
                checked={column.isUnique}
                onChange={handleInputChange}
              />
              <label htmlFor={`col-unique-${index}`}>Unique</label>
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id={`col-nullable-${index}`}
                name="isNull"
                checked={column.isNull}
                onChange={handleInputChange}
              />
              <label htmlFor={`col-nullable-${index}`}>Nullable</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnInputForm;
