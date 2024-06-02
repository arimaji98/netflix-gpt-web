import React from "react";

const VideoTitle = (props) => {
  const { title, overview } = props;
  return (
    <div className="pt-36 px-12 absolute w-screen aspect-video text-white bg-gradient-to-r from-black">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="py-6 text-sm w-1/4">{overview}</p>
      <div>
        <button className=" bg-gray-400 px-5 py-1 rounded bg-opacity-50">
          ▶ Play
        </button>
        <button className="mx-2 bg-gray-400 px-5 py-1 rounded bg-opacity-50">
          More Info.
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
