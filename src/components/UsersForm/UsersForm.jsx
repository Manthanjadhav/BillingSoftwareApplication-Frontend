import React from "react";

export default function UsersForm() {
  return (
    <div className="mx-2 mt-2">
      <div className="card col-md-8 form-container">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                name="name"
                id="name"
                type="text"
                className="form-control"
                placeholder="Category Name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Email
              </label>
              <input
                name="password"
                id="password"
                type="password"
                className="form-control"
                placeholder="************"
              />
            </div>

            <button type="submit" className="btn btn-warning w-100">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
