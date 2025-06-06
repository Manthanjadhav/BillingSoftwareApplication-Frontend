import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { addCategory } from "../../service/CategoryService";
import AppContext from "../../context/AppContext";

const CategoryForm = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    bgColor: "#2c2c2c",
  });

  const { setCategories, categories } = useContext(AppContext);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validation
    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    if (!data.name.trim() || data.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long");
      return;
    }

    if (!data.description.trim() || data.description.trim().length < 10) {
      toast.error("Description must be at least 10 characters long");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("category", JSON.stringify(data));
    formData.append("file", image);

    try {
      const response = await addCategory(formData);
      if (response.status == 201) {
        setCategories([...categories, response.data]);
        toast.success("Category created successfully!");
        setData({
          name: "",
          description: "",
          bgColor: "#2c2c2c",
        });
        setImage(false);
      } else {
        toast.error("Failed to create category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div
      className="category-form-conatiner"
      style={{ height: "100vh", overflow: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2">
        <div className="card col-md-12 form-container">
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
                  placeholder="Category Name"
                  onChange={onChangeHandler}
                  value={data.name}
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
                  placeholder="Category Description..."
                  onChange={onChangeHandler}
                  value={data.description}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="bgColor" className="form-label">
                  Background Color
                </label>
                <br></br>
                <input
                  type="color"
                  name="bgColor"
                  id="bgcolor"
                  placeholder="#ffffff"
                  onChange={onChangeHandler}
                  value={data.bgColor}
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
  );
};

export default CategoryForm;
