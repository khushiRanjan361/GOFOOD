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
        'Content-Type': "application/json"
      }

    });

    response = await response.json();
    setFoodItem(response[0])
    setFoodCat(response[1])


    //  console.log(response[0],response[1]);
  }

  useEffect(() => {
    loadData()

  }, [])



  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}

        >
          <div className="carousel-inner" id="carousal"    >

            {/* form search  */}
            <div className="carousel-caption" style={{ zIndex: 10 }}>
              <div className="d-flex justify-content-center"  >
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>




            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/300x300?burger"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}


              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300x300?pizza"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}

                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300x300/?sandwitch"
                style={{ filter: "brightness(30%)" }}

                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'> {/* boootstrap is mobile first */}
        {
          foodCat.length !== 0
            ? foodCat.map((data) => {
              return (
                // justify-content-center
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {foodItem.length !== 0 ? foodItem.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          { console.log(filterItems.url)}
                          <Card foodItem={filterItems} 
                            options={filterItems.options[0]}
                            ></Card>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""}
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}
