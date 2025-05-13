import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { addItems } from "../../service/ItemService";

export default function ItemsForm() {
  const [image, setImage] = useState(false);
  const { categories, setItems, items, setCategories } = useContext(AppContext);
  const [data, setData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(() => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("item", JSON.stringify(data));
    formData.append("file", image);

    try {
      if (!image) {
        toast.error("Please select item image");
        return;
      }
      const response = await addItems(formData);
      if (response.status == 201) {
        setItems([...items, response.data]);
        setCategories((prev) =>
          prev.map((category) =>
            category.categoryId === data.categoryId
              ? { ...category, items: category.items + 1 }
              : category
          )
        );
        toast.success("Item added successfully");
        setData({
          name: "",
          description: "",
          categoryId: "",
          price: "",
        });
        setImage(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to add the item");
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  return (
    <div
      className="item-form-conatiner"
      style={{ height: "100vh", overflow: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-8 form-container">
            <div className="card-body">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    <img
                      src={image ? URL.createObjectURL(image) : assets.upload}
                      alt=""
                      width={48}
                    />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
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
                    value={data.name}
                    onChange={onChangeHandler}
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
                    value={data.description}
                    onChange={onChangeHandler}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-control"
                    name="categoryId"
                    id="category"
                    onChange={onChangeHandler}
                  >
                    <option value="">--SELECT CATEGORY--</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat.categoryId}>
                        {cat.name}
                      </option>
                    ))}
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
                    value={data.price}
                    onChange={onChangeHandler}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-warning w-100"
                  disabled={loading}
                >
                  {loading ? "loading..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
