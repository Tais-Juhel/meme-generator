/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import "./MemesList.scss";

const MemesList = () => {
  const [allMemesSearch, setAllMemesSearch] = useState([]);
  const [memesColumns, setMemesColumns] = useState([]);

  window.onresize = () => {
    columnSeparator(allMemesSearch);
    memesFound();
  };

  const howManyColumn = () => {
    if (window.innerWidth > 1440) {
      return 6;
    } else if (window.innerWidth > 1024) {
      return 5;
    } else if (window.innerWidth > 768) {
      return 3;
    } else {
      return 2;
    }
  };

  useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes").then((res) => {
      const result = res.data.data.memes;
      localStorage.setItem("allMemes", JSON.stringify(result));
      setAllMemesSearch(result);
      // const separator = result.length / howManyColumn();
      // const tab = [];
      // for (let i = 0; i < howManyColumn(); i++) {
      //   tab.push(result.slice(separator * i, separator * (i + 1)));
      // }
      // localStorage.setItem("memesColumns", tab);
      // setMemesColumns(tab);
      columnSeparator(result);
    });
  }, []);

  function searchByName() {
    const value = document.querySelector(".searchMeme").value;
    const newMemesList = localStorage.getItem("allMemes").filter(
      (meme) => meme.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setAllMemesSearch(newMemesList);
    // const separator = newMemesList.length / howManyColumn();
    // const tab = [];
    // for (let i = 0; i < howManyColumn(); i++) {
    //   tab.push(newMemesList.slice(separator * i, separator * (i + 1)));
    // }
    // setMemesColumns(tab);
    columnSeparator(newMemesList);
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
      if (memesColumns[0].length > 0) {
        return memesColumns.map((column, columnIndex) => {
          return (
            <div className="card-column" key={columnIndex}>
              {column.map((meme) => {
                return (
                  <Link to={"/"+meme.id} className="card" key={meme.id}>
                    <div className="frame">
                      <img src={meme.url} />
                    </div>
                    <h5>{meme.name}</h5>
                  </Link>
                );
              })}
              <div className="card" style={{ flex: 1, backgroundColor: "#F3F3F3" }}></div>
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
