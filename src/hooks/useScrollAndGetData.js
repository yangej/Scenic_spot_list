import {useEffect, useState} from "react";
import {debounce} from "../utils/debounce";

const useScrollAndGetData = (getData, city) => {
    const spotCount = 30;
    let getSpotFrom = 0;
    let isDone = false;
    const [ spots, setSpots ] = useState([]);

    const handleScroll = async function (e) {
        const scrollingElement = e.target.scrollingElement;
        const isAtBottom = scrollingElement.clientHeight + scrollingElement.scrollTop > scrollingElement.scrollHeight - 10;

        if (isAtBottom && !isDone) {
            getSpotFrom += spotCount;

            let data = await getData.apply(null, [spotCount, getSpotFrom]);
            data.length ? setSpots((spots) => spots.concat(data)) : isDone = true;
        }
    };

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