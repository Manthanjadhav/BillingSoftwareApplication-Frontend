import React from "react";

export default function ItemsForm() {
  return (
    <div
      className="item-form-conatiner"
      style={{ height: "100vh", overflow: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-8 form-container">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    <img src="https://placehold.co/48x44" alt="" width={48} />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    hidden
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    className="form-control"
                    placeholder="Item Name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    rows="5"
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder="Item Description..."
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-control"
                    name="category"
                    id="category"
                  >
                    <option value="">--SELECT CATEGORY--</option>
                    <option>Mouse</option>
                    <option>HeadPhones</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder="&#8377;200.0"
                  />
                </div>
                <button type="submit" className="btn btn-warning w-100">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
