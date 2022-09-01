import React, {useState} from 'react';
import "./styles.css";
import MvCard from './movieCard.js';
import { SearchServiceClient } from './proto/search_grpc_web_pb';
import {SearchMovieRequest} from './proto/search_pb'
import { Link } from "react-router-dom";
import styled from "styled-components";
export default function MVSearch() {
    
    const [query, setQuery]=useState('');
    const [movies, setMovies]=useState([]);

    function search(e) {
        console.log(query);
        e.preventDefault();
        const searchService = new SearchServiceClient('http://localhost:8083', null, null);
        var request = new SearchMovieRequest();
        request.setMoviename(query);
        var call = searchService.search(request, {}, function(err, response) {
            if (err) {
                console.log(err);
                return null;
            } else {
                setMovies([]);
                var found = response.array[0];
                if(!found) console.log("Not Found.")
                else {
                    response.array[1].forEach(function(movie){
                        setMovies(oldData => [...oldData, {"title":movie[0], 
                        "cardImg":movie[1]}])
                    });
                }
            }
        })
    }

    return (
        <Limiter>
            <form  onSubmit={search}>
                <br></br>
                <input className="input" value={query} placeholder="eg. Iron Man" onChange={evt => setQuery(evt.target.value)}/><br/>
                <button className="button" type="submit" >Search</button>
            </form>
            {movies.length != 0? (
                
                <Container>
                <h4>Search Results</h4>
                    <Content>
                    {movies &&
                        movies.map((movie, key) => (
                        <Wrap key={key}>
                            <Link to={`/detail/` + movie.title}>
                            <img alt={movie.title} id={movie["title"]} src={URL.createObjectURL(new Blob([movie.cardImg[0]], {type: 'image/png'}))} />
                            </Link>
                        </Wrap>
                        ))}
                    </Content>
                </Container>
               
            ):<></> }
         </Limiter>
    );
};
const Limiter=styled.main`
position: relative;
min-height: calc(100vh - 250px);
overflow-x: hidden;
display: block;
padding: 0 calc(3.5vw + 5px);

&:after {
  background: url("/images/home-background.png") center center / cover
    no-repeat fixed;
  content: "";
  position: absolute;
  inset: 0px;
  opacity: 1;
  z-index: -1;
}
`;
const Container = styled.div`
  padding: 0 0 26px;
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;