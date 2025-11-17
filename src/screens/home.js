import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Carousel */}
      <Carousal />

      {/* Search bar OUTSIDE carousel (visible always) */}
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
        {foodCat.length !== 0 &&
          foodCat.map((data) => (
            <div key={data._id} className="row mb-3">
              <div className="fs-3 m-3">{data.CategoryName}</div>

              <hr
                id="hr-success"
                style={{
                  height: "4px",
                  backgroundImage:
                    "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                }}
              />

              {foodItem.length !== 0 ? (
                foodItem
                  .filter(
                    (items) =>
                      items.CategoryName === data.CategoryName &&
                      items.name
                        .toLowerCase()
                        .includes(search.toLowerCase())
                  )
                  .map((filteredItems) => (
                    <div
                      key={filteredItems._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        foodItem={filteredItems}
                        options={filteredItems.options[0]}
                      />
                    </div>
                  ))
              ) : (
                <div>No Such Data</div>
              )}
            </div>
          ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

