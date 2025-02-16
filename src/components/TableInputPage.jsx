import React, { useState } from "react";
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
                example: "",
                description: "",
                length: "",
                range: "",
                pattern: "",
                isPrimary: false,
                isUnique: false,
                isNull: false,
            },
        ],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleColumnChange = (index, name, value) => {
        const updatedColumns = [...formData.columns];
        updatedColumns[index] = { ...updatedColumns[index], [name]: value };
        setFormData({ ...formData, columns: updatedColumns });
    };

    const addColumn = () => {
        setFormData({
            ...formData,
            columns: [
                ...formData.columns,
                {
                    name: "",
                    type: "",
                    example: "",
                    description: "",
                    length: "",
                    range: "",
                    pattern: "",
                    isPrimary: false,
                    isUnique: false,
                    isNull: false,
                },
            ],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Table Structure</h1>
                <div className="form-group">
                    <label htmlFor="tableName">Table Name:</label>
                    <input
                        type="text"
                        id="tableName"
                        name="tableName"
                        value={formData.tableName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numRecords">No. of Records:</label>
                    <input
                        type="number"
                        id="numRecords"
                        name="numRecords"
                        value={formData.numRecords}
                        onChange={handleChange}
                        min={1}
                        required
                    />
                </div>
                <div className="form-group">
                    <div className="coloumsContainer">
                        <label>Columns:</label>
                        <span onClick={addColumn}>
                            <CiCirclePlus size="20px" color="blue" />
                        </span>
                    </div>
                    <div className="columnForm">
                    {formData.columns.map((column, index) => (
                        <ColumnInputForm
                            key={index}
                            index={index}
                            column={column}
                            handleColumnChange={handleColumnChange}
                        />
                    ))}
                    </div>
                </div>
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default TableInputPage;
