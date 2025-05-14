import React from "react";
import "./CustomerForm.css";
export default function CustomerForm({
  customerName,
  mobileNumber,
  setMobileNumber,
  setCustomerName,
}) {
  return (
    <div className="p-2">
      <div className="mb-1">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customerName" className="col-4">
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            className="form-control"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-1">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customerNumber" className="col-4">
            Mobile Number
          </label>
          <input
            type="text"
            id="customerNumber"
            className="form-control"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
