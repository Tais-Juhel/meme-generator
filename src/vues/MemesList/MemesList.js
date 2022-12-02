/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MemesList.scss";

const MemesList = () => {
  const [allMemes, setAllMemes] = useState(
    localStorage.getItem("allMemes") ? localStorage.getItem("allMemes") : []
  );
  const [allMemesSearch, setAllMemesSearch] = useState([]);
  const [memesColumns, setMemesColumns] = useState([]);

  window.onresize = () => {
    console.log(howManyColumn())
    columnSeparator(allMemesSearch)
    memesFound();
  };

  const howManyColumn = () => {
    if (window.innerWidth > 1440) {
      return 5;
    } else if (window.innerWidth > 1024) {
      return 4;
    } else if (window.innerWidth > 768) {
      return 3;
    } else {
      return 1;
    }
  };

  useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes").then((res) => {
      const result = res.data.data.memes;
      localStorage.setItem("allMemes", result);
      setAllMemes(result);
      setAllMemesSearch(result)
      // const separator = result.length / howManyColumn();
      // const tab = [];
      // for (let i = 0; i < howManyColumn(); i++) {
      //   tab.push(result.slice(separator * i, separator * (i + 1)));
      // }
      // localStorage.setItem("memesColumns", tab);
      // setMemesColumns(tab);
      columnSeparator(result)
    });
  }, []);

  function searchByName() {
    const value = document.querySelector(".searchMeme").value;
    const newMemesList = allMemes.filter(
      (meme) => meme.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setAllMemesSearch(newMemesList);
    // const separator = newMemesList.length / howManyColumn();
    // const tab = [];
    // for (let i = 0; i < howManyColumn(); i++) {
    //   tab.push(newMemesList.slice(separator * i, separator * (i + 1)));
    // }
    // setMemesColumns(tab);
    columnSeparator(newMemesList)
    memesFound();
  }

  function columnSeparator(memesList) {
    const separator = memesList.length / howManyColumn();
    const tab = [];
    for (let i = 0; i < howManyColumn(); i++) {
      tab.push(memesList.slice(separator * i, separator * (i + 1)));
    }
    localStorage.setItem("memesColumns", tab);
    setMemesColumns(tab);
  }

  const memesFound = () => {
    if (memesColumns[0]) {
      if (memesColumns[howManyColumn() - 1].length > 0) {
        return memesColumns.map((column, columnIndex) => {
          return (
            <div className="card-column" key={columnIndex}>
              {column.map((meme) => {
                return (
                  <div className="card" key={meme.id}>
                    <div className="frame">
                      <img src={meme.url} />
                    </div>
                    <h5>{meme.name}</h5>
                  </div>
                );
              })}
            </div>
          );
        });
      } else {
        return (
          <div>
            <p>Aucun même trouvé</p>
          </div>
        );
      }
    } else {
      return (
        <div>
          <p>Aucun même trouvé</p>
        </div>
      );
    }
  };

  return (
    <div className="memes-list">
      <div className="search-bar">
        <input
          className="searchMeme"
          type="text"
          placeholder="Recherche un meme"
          onKeyPress={(e) => (e.key === "Enter" ? searchByName() : null)}
        />
        <button>🔍</button>
      </div>
      <div className="cards">
        {memesFound()}
        {/* {memesColumns.map((column, columnIndex) => {
          return (
            <div className="card-column" key={columnIndex}>
              {column.map((meme) => {
                return (
                  <div className="card" key={meme.id}>
                    <div className="frame">
                      <img src={meme.url} />
                    </div>
                    <h5>{meme.name}</h5>
                  </div>
                );
              })}
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default MemesList;
