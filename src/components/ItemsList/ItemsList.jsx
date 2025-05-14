import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { deleteItem } from "../../service/ItemService";
import toast from "react-hot-toast";
import "./ItemsList.css";

export default function ItemsList() {
  const { items, setItems, setCategories } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const filterItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteByItemId = async (id) => {
    try {
      const deletedItem = items.find((item) => item.itemId === id);
      await deleteItem(id);
      setItems((prev) => prev.filter((item) => item.itemId != id));
      setCategories((prev) =>
        prev.map((category) =>
          category.categoryId === deletedItem.categoryId
            ? { ...category, items: category.items - 1 }
            : category
        )
      );
      toast.success("Item Deleted Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete the item");
    }
  };

  return (
    <div
      className="item-list-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            placeholder="Search by keyword"
            className="form-control"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filterItems.map((item, index) => (
          <div key={index} className="card p-3 bg-dark">
            <div className="d-flex align-items-center">
              <div style={{ marginRight: "15px" }}>
                <img src={item.imgUrl} alt={item.name} className="item-image" />
              </div>
              <div className="flex-grow-1">
                <h5 className="mb-1 text-white">{item.name}</h5>
                <p className="mb-0 text-white">Category: {item.categoryName}</p>
                <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                  &#8377;{item.price}
                </span>
              </div>
              <div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteByItemId(item.itemId)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
