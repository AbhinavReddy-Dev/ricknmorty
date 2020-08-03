import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import EpiSearch from "../src/components/EpiSearch.js";

export default function App() {
  var [active, setActive] = useState(1);
  var [epi, setEpi] = useState([]);
  var pages = [];
  const numOfEpisPerPage = 8;
  const totalEpis = [];
  for (let number = 1; number <= 36; number++) {
    totalEpis.push(number);
  }
  var indOfLastEpi = active * numOfEpisPerPage;
  var indOfFirstEpi = indOfLastEpi - numOfEpisPerPage;

  console.log("first", totalEpis.slice(indOfFirstEpi, indOfLastEpi));

  for (let number = 1; number <= 5; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => pagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    if (active === 1) {
      axios
        .get(
          "https://rickandmortyapi.com/api/episode/" +
            totalEpis.slice(indOfFirstEpi, indOfLastEpi)
        )
        .then(data => {
          setEpi(data.data);
        });
    }
  }, [active]);

  function pagination(number) {
    indOfLastEpi = number * numOfEpisPerPage;
    indOfFirstEpi = indOfLastEpi - numOfEpisPerPage;
    setActive(number);
    axios
      .get(
        "https://rickandmortyapi.com/api/episode/" +
          totalEpis.slice(indOfFirstEpi, indOfLastEpi)
      )
      .then(data => {
        setEpi(data.data);
      });
  }

  return (
    <div
      className="App"
      style={{
        margin: "4rem auto"
      }}
    >
      <h1>Rick and Morty Episodes</h1>
      <h3>Search or surf through the space for the episodes!</h3>
      <EpiSearch />
      <hr />
      <br />
      <h3>Episodes</h3>
      <div className="container d-flex flex-wrap justify-content-center">
        {epi.map(ep => (
          <Card
            key={ep.id}
            style={{ width: "25rem", margin: "2rem", textAlign: "center" }}
          >
            <Card.Body>
              <Card.Title>
                {" "}
                <span style={{ fontWeight: "bold" }}>Episode:</span> {ep.name}
              </Card.Title>
              <Card.Text>
                <span style={{ fontWeight: "bold" }}>Ep. Code:</span>{" "}
                {ep.episode}
              </Card.Text>
              <Card.Text>
                <span style={{ fontWeight: "bold" }}>Date:</span> {ep.air_date}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="container d-flex justify-content-center">
        <Pagination size="sm">
          <Pagination.Prev
            onClick={() => {
              if (active > 1) {
                pagination(active - 1);
              }
            }}
          />
          {pages}
          <Pagination.Next
            onClick={() => {
              if (active < 5) {
                pagination(active + 1);
              }
            }}
          />
        </Pagination>
      </div>
    </div>
  );
}
