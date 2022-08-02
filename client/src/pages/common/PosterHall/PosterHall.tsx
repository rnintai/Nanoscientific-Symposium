import axios from "axios";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, useState } from "react";
import useMenuStore from "store/MenuStore";

const PosterHall = () => {
  const [posterLoading, setPosterLoading] = useState<boolean>(false);
  const [posterState, setposterState] = useState<Poster.posterType[]>([]);
  const pathname = usePageViews();
  const { currentMenu } = useMenuStore();

  console.log(`currentMenu: ${currentMenu}`);

  useEffect(() => {
    const config = {
      params: {
        nation: pathname,
      },
    };

    const getPosters = async () => {
      setPosterLoading(true);
      const posters = await axios.get(`/api/page/common/poster`, config);
      setposterState(posters.data);
      console.log(posters);
      posterState.forEach((poster) => console.log(`result -> ${poster}`));
      setPosterLoading(false);
    };

    getPosters();
  }, []);

  if (posterLoading) {
    return <Loading />;
  }

  return (
    // <div>hhhhhhhhhhhhhhhhhhhhh</div>
    <div>
      {posterState.map((poster) => (
        <div>{poster.id}</div>
      ))}
    </div>
  );
};

export default PosterHall;
