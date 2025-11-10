import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";

export default function Home() {
  const [search, setSearch] = useState("");

  // 💡 Dummy data for now, to test without backend calls
  const foodCat = [
    { _id: 1, CategoryName: "Fast Food" },
    { _id: 2, CategoryName: "Desserts" },
  ];

  const foodItem = [
    {
      _id: 101,
      name: "Cheese Burger",
      CategoryName: "Fast Food",
      url: "https://source.unsplash.com/random/300x300?burger",
      options: [{ regular: "₹120", large: "₹180" }],
    },
    {
      _id: 102,
      name: "Veg Pizza",
      CategoryName: "Fast Food",
      url: "https://source.unsplash.com/random/300x300?pizza",
      options: [{ medium: "₹200", large: "₹280" }],
    },
    {
      _id: 103,
      name: "French Fries",
      CategoryName: "Fast Food",
      url: "https://source.unsplash.com/random/300x300?fries",
      options: [{ small: "₹70", large: "₹120" }],
    },
    {
      _id: 104,
      name: "Chocolate Cake",
      CategoryName: "Desserts",
      url: "https://source.unsplash.com/random/300x300?cake",
      options: [{ slice: "₹80", full: "₹500" }],
    },
    {
      _id: 105,
      name: "Ice Cream Sundae",
      CategoryName: "Desserts",
      url: "https://source.unsplash.com/random/300x300?icecream",
      options: [{ single: "₹60", double: "₹100" }],
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Carousel */}
      <Carousal />

      {/* Search Bar */}
      <div className="container mt-4 mb-4">
        <div className="d-flex justify-content-center">
          <input
            className="form-control me-2 w-50"
            type="search"
            placeholder="Search for food..."
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Food Items Section */}
      <div className="container">
        {foodCat.map((data) => (
          <div key={data._id} className="row mb-4">
            <div className="fs-3 m-3">{data.CategoryName}</div>
            <hr
              style={{
                height: "4px",
                backgroundImage:
                  "-webkit-linear-gradient(left, rgb(0, 255, 137), rgb(0, 0, 0))",
              }}
            />

            {foodItem
              .filter(
                (items) =>
                  items.CategoryName === data.CategoryName &&
                  items.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((filteredItems) => (
                <div
                  key={filteredItems._id}
                  className="col-12 col-md-6 col-lg-3 mb-3"
                >
                  <Card
                    foodItem={filteredItems}
                    options={filteredItems.options[0]}
                  />
                </div>
              ))}

            {foodItem.filter(
              (items) =>
                items.CategoryName === data.CategoryName &&
                items.name.toLowerCase().includes(search.toLowerCase())
            ).length === 0 && (
              <p className="text-center text-muted">
                No items found for this category.
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
