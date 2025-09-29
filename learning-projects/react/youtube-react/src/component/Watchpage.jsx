import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeMenu } from "../utils/AppSlice";

const Watchpage = () => {
  const [searchParam] = useSearchParams();

  const videoId = searchParam.get("v");

  const dispach = useDispatch();

  useEffect(() => {
    dispach(closeMenu());
  }, []);
  return (
    <div>
      <iframe
        width="1200"
        height="600"
        src={"https://www.youtube.com/embed/" + videoId}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Watchpage;
