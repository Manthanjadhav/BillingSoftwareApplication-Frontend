import React from "react";
import "./DisplayCategory.css";
import Category from "../Category/Category";
import { assets } from "../../assets/assets";
export default function DisplayCategory({
  categories,
  setSelectedCategory,
  selectedCategory,
}) {
  return (
    <div className="row g-3" style={{ width: "100%", margin: 0 }}>
      <div
        key="all"
        className="col-md-3 col-sm-6"
        style={{ padding: "0 10px" }}
      >
        <Category
          categoryName="All Items"
          imgUrl={assets.all}
          numberOfItems={categories.reduce((acc, cat) => acc + cat.items, 0)}
          bgColor="#6c757d"
          isSelected={selectedCategory === ""}
          onClick={() => setSelectedCategory("")}
        />
      </div>
      {categories.map((category) => (
        <div
          key={category.categoryId}
          className="col-md-3 col-sm-6"
          style={{ padding: "0 10px" }}
        >
          <Category
            categoryName={category.name}
            imgUrl={category.imageUrl}
            numberOfItems={category.items}
            bgColor={category.bgColor}
            isSelected={selectedCategory === category.categoryId}
            onClick={() => setSelectedCategory(category.categoryId)}
          />
        </div>
      ))}
    </div>
  );
}
