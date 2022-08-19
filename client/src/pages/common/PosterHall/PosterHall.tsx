import axios from "axios";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, useState } from "react";
import useMenuStore from "store/MenuStore";
import PosterSwiper from "./PosterSwiper";

const PosterHall = () => {
  const [posterLoading, setPosterLoading] = useState<boolean>(false);
  const [posterState, setPosterState] = useState<Poster.posterType[]>([]);
  const pathname = usePageViews();
  const { currentMenu } = useMenuStore();

  useEffect(() => {
    const config = {
      params: {
        nation: pathname,
      },
    };

    const getPosters = async () => {
      setPosterLoading(true);
      const posters = await axios.get(`/api/page/common/poster`, config);
      setPosterState(posters.data);

      setPosterLoading(false);
    };

    getPosters();
  }, []);

  if (posterLoading) {
    return <Loading />;
  }

  return <PosterSwiper posterState={posterState} />;
};

export default PosterHall;
