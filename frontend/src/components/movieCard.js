import React from "react";
import "./styles.css";

export default function MvCard({movie}) {
    return(
        <div className="mvcard">
            <img className="card--image" src={URL.createObjectURL(new Blob([movie.cardImg[0]], {type: 'image/png'}))}
                alt={movie.title+' poster'} />
            <br/>
            <div className="card--content">
            <h3 className="card--title">{movie["title"]}</h3>
            <p><small>Year: {movie["subTitle"]}</small></p>
            </div>
        </div>
    )
}