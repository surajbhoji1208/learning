import React, { useState, useEffect } from "react";
import Vediocard from "./Vediocard";
import videoData from "../utils/getVidosList.json";
import { Link } from "react-router-dom";

const Vediocontainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(videoData);
  }, []);

  return (
    videos?.items?.length > 0 && (
      <div className="flex flex-wrap gap-4">
        {videos.items.map((video) => (
          <Link to={`/watch?v=${video.id}`} ><Vediocard key={video.id} vidInfo={video} /></Link>
        ))}
      </div>
    )
  );
};

export default Vediocontainer;
