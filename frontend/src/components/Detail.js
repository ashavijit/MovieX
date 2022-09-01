import "./bootstrap.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  selectUserEmail,
  selectUserReservations,
  setDashboardReservation,
} from "../features/user/userSlice";
import {updateUserServiceClient} from './proto/updateUser_grpc_web_pb'
import { UpdateUserReservationRequest } from './proto/updateUser_pb'
import {MovieServiceClient} from "./proto/movie_grpc_web_pb";
import {MovieRequest, UpdateMovieInfoRequest} from "./proto/movie_pb";
import Select from 'react-select'
import React from "react";

const movieService = new MovieServiceClient('http://localhost:8081', null, null);
const updateUserService = new updateUserServiceClient('http://localhost:8084', null, null);


const Detail = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const userReservations = useSelector(selectUserReservations);
  const userEmail = useSelector(selectUserEmail);

  function getMovieById() {
    return new Promise((resolve, reject)=>{
      var request = new MovieRequest();
      request.setMoviename(id);
      var call = movieService.getAMovie(request, {}, function (err, response){
        if(err) reject(err);
        else {
          var movie = response.array[0][0];
          var json = {"title":movie[0], 
            "description":movie[1],
            "subTitle":movie[2],
            "titleImg":movie[3],
            "backgroundImg":movie[4],
            "theatre":movie[5],
            "type":movie[6]
          }
          resolve(json)
        }
      })
    })
  }

  async function getMovieData() {
    const response = await getMovieById();
    setDetailData(response)
    var reservations = []
    if(userReservations == null) reservations.push(response)
    else {
      userReservations.forEach(reservation=>{
        reservations.push(reservation)
      })
    }
    dispatch(setDashboardReservation(reservations))
    var backgroundField = document.getElementById("backgroundImg");
    var titleField = document.getElementById("titleImg");
    var subTitle = document.getElementById("subtitle")
    var description = document.getElementById("description")
    if(backgroundField != undefined && titleField != undefined){
      backgroundField.src = URL.createObjectURL(new Blob([response.backgroundImg[0]], {type: 'image/png'}))
      titleField.src = URL.createObjectURL(new Blob([response.titleImg[0]], {type: 'image/png'}))
      subTitle.innerHTML = `<p>${response.subTitle}</p>`;
      description.innerHTML = `<p>${response.description}</p>`;
    }
  }

  useEffect(() => {
    getMovieData()
  },[])

  var screeningOptions = []
  var newMovieInfo
  var selectedTheatre;
  var selectedTime;

  const handleAvailableList = (e) => {
    // console.log("Selected: ", e.value, e.label)
    var tmp = e.label.split("@")
    selectedTheatre = tmp[0].slice(0,-1)
    selectedTime = tmp[1].slice(1,)
  }

  const handleReserveMovie = () => {
    var lastDetailData=detailData;
    var result = document.getElementById("result");
    if (userEmail === null) {
      result.innerHTML = `<span style="color:red">Please log in to reserve a movie.</span>`
      
    } else {
      if (selectedTheatre === undefined) {
        result.innerHTML = `<span style="color:red">No schedule selected.<br\>Please select a theatre and a time.</span>`;

      } else {
        newMovieInfo.forEach(aTheatre => {
          if (aTheatre.name == selectedTheatre) {
            aTheatre.schedule.forEach(aSchedule => {
              if (aSchedule.time == selectedTime) {
                if (aSchedule.remainTicket < 1) {
                  result.innerHTML = `<span style="color:red">All seats have been researved for this screening.<br\>Please select another time.</span>`;
                } else {
                  aSchedule.remainTicket--
                  var request = new UpdateMovieInfoRequest()
                  request.setMoviename(id)
                  request.setNewscreeninginfo(JSON.stringify(newMovieInfo))

                  var call = movieService.updateReservedMovieInfo(request, {}, function(err, response) {
                    if (err) {
                      console.log(err);
                      return null;
                    } else {
                      var success = response.array[0]
                      if(!success)result.innerHTML = `<span style="color:red">All seats have been researved for this screening.<br\>Please select another time.</span>`;
                    }
                  })

                  var myReservations = []
                  userReservations.forEach(aReservation => {
                    var oneUserReservationEntry = {}
                    oneUserReservationEntry["Title"] = aReservation[0]
                    oneUserReservationEntry["Theatre"] = aReservation[1]
                    oneUserReservationEntry["Time"] = aReservation[2]
                    myReservations.push(oneUserReservationEntry)
                  })
                  
                  var newUserReservationEntry = {}
                  newUserReservationEntry["Title"] = id
                  newUserReservationEntry["Theatre"] = selectedTheatre
                  newUserReservationEntry["Time"] = selectedTime
                  myReservations.push(newUserReservationEntry)

                  var request = new UpdateUserReservationRequest()
                  request.setUseremail(userEmail)
                  request.setNewreservationlist(JSON.stringify(myReservations))

                  var call = updateUserService.updateUserReservation(request, {}, function(err, response) {
                    if (err) {
                      console.log(err);
                      return null;
                    } else {

                      if(response.array[0]) {
                        result.innerHTML = `<span style="color:rgb(127, 255, 0)">Successfully reserved!</span>`;
                        var dashboardHelper = []
                        JSON.parse(response.array[1]).forEach(oneEntry => {
                          var oneDashboardHelper = []
                          oneDashboardHelper.push(oneEntry["Title"])
                          oneDashboardHelper.push(oneEntry["Theatre"])
                          oneDashboardHelper.push(oneEntry["Time"])
                          dashboardHelper.push(oneDashboardHelper)
                        })
                        dispatch(setDashboardReservation(dashboardHelper))
                        lastDetailData["theatre"]=JSON.stringify(newMovieInfo);
                        setDetailData(lastDetailData)
                      } else {
                        result.innerHTML = `<span style="color:red">Something went wrong!</span>`;
                      }
                    }
                  })
                }
              }
            })
          }
        })
      }
    }
  }

  const fillSelect = () => {
    var theatreStr = detailData.theatre
    var theatreObj = JSON.parse(theatreStr)
    newMovieInfo = theatreObj

    var cnt = 0
    var totalScreeningNum = 0

    theatreObj.forEach(aTheatre => {
      totalScreeningNum += aTheatre.schedule.length
    })

    theatreObj.forEach(aTheatre => {
      aTheatre.schedule.forEach(aSchedule => {
        var oneEntry = {}
        oneEntry["value"] = cnt
        oneEntry["label"] = aTheatre.name + " @ " + aSchedule.time
        if (screeningOptions.length < totalScreeningNum) {
          screeningOptions.push(oneEntry)
          cnt += 1
        }
      })
    })
  }
  
  return (
    <Container>
      <Background>
        <img id="backgroundImg" />
      </Background>

      <ImageTitle>
        <img id="titleImg"/>
      </ImageTitle>
      <ContentMeta>
        <Controls>
          <Trailer>
            <img src="/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>
          <AddList onClick={()=>handleReserveMovie()}>
            <span />
            <span />
          </AddList>
          <Message id='result'></Message>
        </Controls>
        {(detailData["type"]=="playing")?(<><Select onMenuOpen={() => fillSelect()} options={screeningOptions} onChange={e => handleAvailableList(e)}></Select><br /><br /><br /></>):(<br/>)}
        <SubTitle id="subtitle"></SubTitle>
        <Description id="description"></Description>
      </ContentMeta>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh-250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb (249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

const Message = styled.div`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.2);
  border: none;
  font-weight: bold;
  color: rgb(0, 0, 0);
  :empty {
    visibility: hidden;
  }
`

const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;

  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;

    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
    }

    &:nth-child(2) {
      height: 16px;
      transform: translateX(-8px) rotate(0deg);
      width: 2px;
    }
  }
`;

const GroupWatch = styled.div`
  height: 44px;
  width: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: white;

  div {
    height: 40px;
    width: 40px;
    background: rgb(0, 0, 0);
    border-radius: 50%;

    img {
      width: 100%;
    }
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail;
