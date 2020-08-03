import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export default function EpiSearch() {
  var [episer, setEpiSearch] = useState();
  var [epiname, setEpiName] = useState("");
  function epiSearch() {
    axios
      .get("https://rickandmortyapi.com/api/episode/?name=" + epiname)
      .then(data => {
        // console.log(data.data.results[0]);
        setEpiSearch(data.data.results[0]);
      });
  }

  return (
    <>
      <br />
      <input
        placeholder="Enter episode name"
        onChange={e => setEpiName(e.target.value)}
      />{" "}
      <button onClick={epiSearch}>Search</button>
      <Container
        style={{
          margin: "0 auto",
          padding: "3rem 7.5%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly"
        }}
      >
        {episer ? (
          <Card
            key={episer.id}
            style={{ width: "25rem", margin: "1rem", textAlign: "center" }}
          >
            <Card.Body>
              <Card.Title>
                {" "}
                <span style={{ fontWeight: "bold" }}>Episode:</span>{" "}
                {episer.name}
              </Card.Title>
              <Card.Text>
                <span style={{ fontWeight: "bold" }}>Ep. Code:</span>{" "}
                {episer.episode}
              </Card.Text>
              <Card.Text>
                <span style={{ fontWeight: "bold" }}>Date:</span>{" "}
                {episer.air_date}
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          ""
        )}
      </Container>
    </>
  );
}
