import axios from 'axios';
import Loading from 'components/Loading/Loading';
import usePageViews from 'hooks/usePageViews';
import React, { useEffect, useState } from 'react'
import useMenuStore from 'store/MenuStore';
import PosterSwiper from './PosterSwiper';

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
            }
        }

        const getPosters = async () => {
            setPosterLoading(true);
            const posters = await axios.get(`/api/page/common/poster`, config);
            setposterState(posters.data);
            console.log(`posters object -> ${posters}`);
            console.log(posters);
            posterState.forEach((poster) => (
                console.log(`result -> ${poster.id}`) // 확인이 안되는 이유 알아보기
            ));
            setPosterLoading(false);
        };

        getPosters();
    }, []);


    if (posterLoading) {
        return <Loading />;
    }

    return <PosterSwiper posterState={posterState}/>;
}

export default PosterHall;