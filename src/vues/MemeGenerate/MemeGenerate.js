import "./MemeGenerate.scss";
import React from "react";

const MemeGenerate = () => {
    const meme = window.location.search.replace("?meme=","")

    return (
        <div className="meme-generate">
            <img src={meme} alt="meme" />
        </div>
    )
}

export default MemeGenerate;