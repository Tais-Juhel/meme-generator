import "./MemeEdit.scss";
import React from "react";
import { redirect, useParams } from "react-router-dom";
import axios from "axios";

const MemeEdit = () => {
  const params = useParams();
  const meme = JSON.parse(localStorage.getItem("allMemes")).find(
    (meme) => meme.id === params.id
  );

  const generateMeme = () => {
    let boxes = "";
    const texts = document.querySelectorAll(".text");
    texts.forEach((text) => {
      // const x = text.getAttribute("data-x") || 0
      // const y = text.getAttribute("data-y") || 0
      let content;
      if(text.className === 'text text-1') {
        content = text.value || 'Text';
      } else {
        content = text.value;
      }
      boxes += "&boxes[" + text.id.slice(-1) + "][text]=" + content;
      // +"&boxes["+text.id.slice(-1)+"][x]="+x+"&boxes["+text.id.slice(-1)+"][y]="+y
    });
    axios
      .post(
        "https://api.imgflip.com/caption_image?template_id=" +
          meme.id +
          "&username=TasJUHEL&password=Mot2Passe&text0=&text1=" +
          boxes
      )
      .then((res) => {
        console.log(res.data.data.url);
        window.location = ("/generate?meme="+res.data.data.url);
      })
      .catch((e) => console.log(e));
  };

  const setBoxes = () => {
    const tab = [];
    for (let i = 1; i <= meme.box_count; i++) {
      tab.push(
        <input
          key={i}
          id={"drag-input-" + i}
          className={"text text-" + i}
          type="text"
          placeholder={i}
        />
      );
    }
    return tab.map((el) => el);
  };

  return (
    <div className="meme-edit">
      <h1>Meme Editor</h1>
      <div className="make-meme">
        <div className="frame">
          <img src={meme.url} alt={meme.name} />
        </div>
        <div className="content-meme">{setBoxes()}</div>
      </div>
      <button onClick={generateMeme}>Generate</button>
    </div>
  );
};

export default MemeEdit;
