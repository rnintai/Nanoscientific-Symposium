import React from "react";

interface YoutubeEmbedProps {
  embedId: string;
}

const YoutubeEmbed = ({ embedId }: YoutubeEmbedProps) => {
  return (
    <div className="video-responsive">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YoutubeEmbed;
