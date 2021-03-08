import {useEffect, useState } from "react";
import {debounce} from "../utils/debounce";

const SPOT_COUNT = 30;
const useScrollAndGetData = (getData, dependency) => {
    const [ spots, setSpots ] = useState([]);
    let getSpotFrom = 0;
    let isDone = false;

    const handleScroll = async (e) => {
        const scrollingElement = e.target.scrollingElement;
        const isAtBottom = scrollingElement.clientHeight + scrollingElement.scrollTop > scrollingElement.scrollHeight - 10;

        if (isAtBottom && !isDone) {
            getSpotFrom += SPOT_COUNT;

            let data = await getData.apply(null, [SPOT_COUNT, getSpotFrom]);
            data.length ? setSpots(spots => spots.concat(data)) : isDone = true;
        }
    };

    useEffect(() => {
        (async function firstGetSpots () {
            const spotsInfos = await getData.apply(null, [SPOT_COUNT, getSpotFrom]);
            setSpots(spotsInfos);
        })();

        const debouncedScrollHandler = debounce(handleScroll, 500);
        window.addEventListener('scroll', debouncedScrollHandler);
        return () => {
            window.removeEventListener('scroll', debouncedScrollHandler);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dependency ? dependency : null]);

    return { spots };
};

export default useScrollAndGetData;