import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Playing from "./Playing";
import Coming from "./Coming";

import { useDispatch, useSelector } from "react-redux";
import {Empty} from "./proto/movie_pb";
import { setMovies, setPlaying, setComing } from "../features/movie/movieSlice";
import { selectComing, selectPlaying, selectAll } from '../features/movie/movieSlice';
import {MovieServiceClient} from "./proto/movie_grpc_web_pb";
import { useEffect } from "react";

const Home = (props) => {
  const dispatch = useDispatch();

  const allMoviesRedux = useSelector(selectAll);
  const playingRedux = useSelector(selectPlaying);
  const comingRedux = useSelector(selectComing);
  const movieService = new MovieServiceClient('http://localhost:8081', null, null);


  function getAllMovies() {
    if(allMoviesRedux != null) return;
    var call = movieService.getAll(new Empty(), {}, function (err, response){
      if(err) {
        console.log(err);
        return null;
      } else {
        var allMovies = [];
        var playing = [];
        var coming = [];
        var allMoviesArray = response.array[0];
        allMoviesArray.map(function(movie) {
          var json = {"title":movie[0], 
          "cardImg":movie[1]}
          allMovies.push(json)
          if(movie[6] == "playing") playing.push(json)
          if(movie[6] == "coming") coming.push(json)
        })
        dispatch(
          setMovies({
            all: allMovies,
            playing: playing,
            coming: coming
          })
        )
      }
    });
  }

  const getPlaying = new Promise((resolve, reject) => {
    var call = movieService.getPlaying(new Empty(), {}, function (err, response){
      if(err) {
        reject(err);
      } else {
        var playing = [];
        var playingResponse = response.array[0];
        playingResponse.map(function(movie) {
          var json = {"title":movie[0], 
          "cardImg":movie[1]}
          playing.push(json)
        })
        resolve({"playing":playing})
      }
    });
  })

  const getComing = new Promise((resolve, reject) => {

    var call = movieService.getComing(new Empty(), {}, function (err, response){
      if(err) {
        reject(err);
      } else {
        var coming = [];
        var comingResponse = response.array[0];
        comingResponse.map(function(movie) {
          var json = {"title":movie[0], 
          "cardImg":movie[1]}
          coming.push(json)
        })
        resolve({"coming": coming});
      }
    });
  }) 

  async function getHomepageData(){
    const responseArray = await Promise.all([getPlaying, getComing]);
    responseArray.forEach(response=>{
      if(response.playing != null) dispatch(setPlaying(response.playing));
      else if(response.coming != null) dispatch(setComing(response.coming))
    })
  }

  useEffect(()=>{
    getHomepageData();
  }, [])

  return (
    <Container>
      <ImgSlider />
      <Playing />
      <Coming />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
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

export default Home;
