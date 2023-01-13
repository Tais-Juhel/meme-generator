import "./MemeGenerate.scss";
import React from "react";

const MemeGenerate = () => {
    const meme = window.location.search.replace("?meme=","")

    return (
        <div className="meme-generate">
            <img src={meme} alt="meme" />
            <a href="https://i.imgflip.com/77blho.jpg" download>Telecharger</a>
        </div>
    )
}

export default MemeGenerate;