import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const ColumnInputForm = ({ column, index, handleColumnChange }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleColumnChange(index, name, value);
    };

    return (
        <div className="column-input-form">
              <div className="coloumsName">
                <label htmlFor={`column-name-${index}`}>Name:</label>
                <input
                    type="text"
                    id={`column-name-${index}`}
                    name="name"
                    value={column.name}
                    onChange={handleInputChange}
                    required
                />
                <span className="expand-icon" onClick={handleExpand}>
                    {isExpanded ? <FiChevronUp size='20px' color="blue" /> : <FiChevronDown size='20px' color="blue" />}
                </span>
            </div>
            {isExpanded && (
                <div className="expanded-fields">
                  <div className="fields">
                    <div className="">
                        <label htmlFor={`column-type-${index}`}>Type:</label>
                        <input
                            type="text"
                            id={`column-type-${index}`}
                            name="type"
                            value={column.type}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <label htmlFor={`column-example-${index}`}>Example:</label>
                        <input
                            type="text"
                            id={`column-example-${index}`}
                            name="example"
                            value={column.example}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <label htmlFor={`column-description-${index}`}>Description:</label>
                        <input
                            type="text"
                            id={`column-description-${index}`}
                            name="description"
                            value={column.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <label htmlFor={`column-length-${index}`}>Length:</label>
                        <input
                            type="text"
                            id={`column-length-${index}`}
                            name="length"
                            value={column.length}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <label htmlFor={`column-isPrimary-${index}`}>Is Primary:</label>
                        <input
                            type="checkbox"
                            id={`column-isPrimary-${index}`}
                            name="isPrimary"
                            checked={column.isPrimary}
                            onChange={(e) =>
                                handleColumnChange(index, "isPrimary", e.target.checked)
                            }
                        />
                    </div>
                </div>
                </div>
            )}
        </div>
    );
};

export default ColumnInputForm;
