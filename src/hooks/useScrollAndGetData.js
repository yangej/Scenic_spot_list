import {useEffect, useState} from "react";
import {debounce} from "../utils/debounce";

const useScrollAndGetData = (getData, city) => {
    const spotCount = 30;
    const [ spots, setSpots ] = useState([]);
    const [ getSpotFrom, setGetSpotFrom ] = useState(0);
    const [ isDone, setIsDone ] = useState(false);

    const handleScroll = async function (e) {
        const scrollingElement = e.target.scrollingElement;
        const isAtBottom = scrollingElement.clientHeight + scrollingElement.scrollTop > scrollingElement.scrollHeight - 10;

        if (isAtBottom && !isDone) {
            setGetSpotFrom( getSpotFrom + spotCount);
        }
    };

    useEffect(() => {
        getSpotFrom && (async function getMoreSpots () {
            let data = await getData.apply(null, [spotCount, getSpotFrom]);
            data.length ? setSpots((spots) => spots.concat(data)) : setIsDone(true);
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getSpotFrom]);

    useEffect(() => {
        (async function firstGetSpots () {
            const spotsInfos = await getData.apply(null, [spotCount, getSpotFrom]);
            setSpots(spotsInfos);
        })();

        const debouncedScrollHandler = debounce(handleScroll, 500);
        window.addEventListener('scroll', debouncedScrollHandler);
        return () => {
            window.removeEventListener('scroll', debouncedScrollHandler);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city ? city : null]);

    return { spots, setSpots };
};

export default useScrollAndGetData;