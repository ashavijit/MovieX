import styled from "styled-components";
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import "./styles.css";
import { useNavigate } from "react-router-dom";
import MVSearch from "./MVSearch"

const Search = (props) => {
  return (
    // ######## TODO: Search Frontend  ########
    <div className="center">
      <br />
      <br />
      <br />
      <br />
      <h1 className="title">Movie Search</h1>
      <MVSearch />
    </div>
    // ######## TODO: Search Frontend  ########
  )
}

export default Search;
