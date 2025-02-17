import React, { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import "../App.css";
import ColumnInputForm from "./ColumnInputForm";

const TableInputPage = () => {
  const [formData, setFormData] = useState({
    tableName: "",
    description: "",
    numRecords: "",
    columns: [
      {
        name: "",
        type: "",
        length: "",
        example: "",
        description: "",
        rangeMin: "",
        rangeMax: "",
        pattern: "",
        isPrimary: false,
        isUnique: false,
        isNull: false,
      },
    ],
  });

  const [errors, setErrors] = useState({
    tableName: "",
    description: "",
    numRecords: "",
    columns: [{}],
  });

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, message: "", preview: null });

  // Ensure errors.columns array matches formData.columns length
  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      columns: formData.columns.map((_, i) => prev.columns[i] || {}),
    }));
  }, [formData.columns]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleColumnChange = (index, name, value) => {
    const updatedColumns = [...formData.columns];
    updatedColumns[index] = { ...updatedColumns[index], [name]: value };
    setFormData((prev) => ({ ...prev, columns: updatedColumns }));
    const updatedColErrors = [...errors.columns];
    if (updatedColErrors[index]) {
      updatedColErrors[index][name] = "";
    }
    setErrors((prev) => ({ ...prev, columns: updatedColErrors }));
  };

  const addColumn = () => {
    setFormData((prev) => ({
      ...prev,
      columns: [
        ...prev.columns,
        {
          name: "",
          type: "",
          length: "",
          example: "",
          description: "",
          rangeMin: "",
          rangeMax: "",
          pattern: "",
          isPrimary: false,
          isUnique: false,
          isNull: false,
        },
      ],
    }));
    setErrors((prev) => ({
      ...prev,
      columns: [...prev.columns, {}],
    }));
  };

  const deleteColumn = (index) => {
    if (formData.columns.length > 1) {
      const updatedColumns = formData.columns.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, columns: updatedColumns }));
      const updatedErrors = errors.columns.filter((_, i) => i !== index);
      setErrors((prev) => ({ ...prev, columns: updatedErrors }));
    }
  };

  // Inline validation for required fields only
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      tableName: "",
      description: "",
      numRecords: "",
      columns: formData.columns.map(() => ({})),
    };

    if (!formData.tableName.trim()) {
      newErrors.tableName = "Table Name is required.";
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    }
    if (!formData.numRecords || isNaN(parseInt(formData.numRecords, 10)) || parseInt(formData.numRecords, 10) <= 0) {
      newErrors.numRecords = "Number of Records must be a positive number.";
      isValid = false;
    }
    formData.columns.forEach((col, index) => {
      if (!col.name.trim()) {
        newErrors.columns[index].name = "Column Name is required.";
        isValid = false;
      }
      if (!col.type.trim()) {
        newErrors.columns[index].type = "Column Type is required.";
        isValid = false;
      }
      if (!col.description.trim()) {
        newErrors.columns[index].description = "Column Description is required.";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Test Data for quick testing
  const fillTestData = () => {
    setFormData({
      tableName: "Test Table",
      description: "This is a test table description.",
      numRecords: "10",
      columns: [
        {
          name: "ID",
          type: "int",
          length: "10",
          example: "1",
          description: "Primary Identifier",
          rangeMin: "1",
          rangeMax: "100",
          pattern: "",
          isPrimary: true,
          isUnique: true,
          isNull: false,
        },
        {
          name: "Name",
          type: "string",
          length: "255",
          example: "John Doe",
          description: "User Name",
          rangeMin: "",
          rangeMax: "",
          pattern: "",
          isPrimary: false,
          isUnique: false,
          isNull: false,
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const transformedColumns = formData.columns.map(({ rangeMin, rangeMax, ...rest }) => ({
      ...rest,
      range: rangeMin && rangeMax ? `${rangeMin}-${rangeMax}` : ""
    }));
  
    const payload = {
      tableName: formData.tableName,
      description: formData.description,
      rows_count: parseInt(formData.numRecords, 10),
      columns: transformedColumns,
    };
  
    setLoading(true);
    try {
      const res = await fetch("http://54.162.174.246:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.text(); 
      setModal({ show: true, message: "Table generated successfully!", preview: data });
    } catch (err) {
      setModal({ show: true, message: "Failed to generate table.", preview: null });
    } finally {
      setLoading(false);
    }
  };
  

  const closeModal = () => {
    setModal({ show: false, message: "", preview: null });
  };

  return (
    <>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Table Structure</h1>
          <div className="form-section">
            <h2>Table Details</h2>
            <div className="form-group">
              <label htmlFor="tableName">
                Table Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="tableName"
                name="tableName"
                value={formData.tableName}
                onChange={handleChange}
                placeholder="Enter table name"
              />
              {errors.tableName && <div className="error">{errors.tableName}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="description">
                Description <span className="required">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter table description"
              />
              {errors.description && <div className="error">{errors.description}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="numRecords">
                No. of Records <span className="required">*</span>
              </label>
              <input
                type="number"
                id="numRecords"
                name="numRecords"
                value={formData.numRecords}
                onChange={handleChange}
                placeholder="e.g., 1000"
                min={1}
              />
              {errors.numRecords && <div className="error">{errors.numRecords}</div>}
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <h2>Columns</h2>
              <button type="button" className="add-column-button" onClick={addColumn} title="Add Column">
                <CiCirclePlus size="24px" />
              </button>
            </div>
            {formData.columns.map((column, index) => (
              <ColumnInputForm
                key={index}
                index={index}
                column={column}
                handleColumnChange={handleColumnChange}
                deleteColumn={formData.columns.length > 1 ? deleteColumn : undefined}
                errors={errors.columns[index] || {}}
              />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            <button type="button" className="submit-button" onClick={fillTestData}>
              Test
            </button>
            <button type="submit" className="submit-button">
              Submit Table
            </button>
          </div>
        </form>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div>Loading...</div>
        </div>
      )}

      {/* Modal */}
      {modal.show && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{modal.message}</h2>
            {modal.preview && (
              <>
                <h3>Preview (CSV):</h3>
                <textarea style={{ width: "100%", height: "150px", marginTop: "10px" }} readOnly value={modal.preview} />
              </>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      <br/><br/>
    </>
  );
};

export default TableInputPage;
