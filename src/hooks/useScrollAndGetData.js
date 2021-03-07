
import {useEffect, useState} from "react";
import {debounce} from "../utils/debounce";

const useScrollAndGetData = (getData) => {
    const spotCount = 30;
    let getSpotFrom = 0;
    let isDone = false;
    const [ spots, setSpots ] = useState([]);

    const handleScroll = async (e) => {
        const scrollingElement = e.target.scrollingElement;
        const isAtBottom = scrollingElement.clientHeight + scrollingElement.scrollTop > scrollingElement.scrollHeight - 10;

        if (isAtBottom && !isDone) {
            getSpotFrom += spotCount;

            let data = await getData.apply(null, [spotCount, getSpotFrom, ...arguments]);
            data ? setSpots((spots) => spots.concat(data)) : isDone = true;
        }
    };

    useEffect(() => {
        (async function() {
            const spotsInfos = await getData.apply(null, [spotCount, getSpotFrom, ...arguments]);
            setSpots(spots.concat(spotsInfos));
        })();

        window.addEventListener('scroll', debounce(handleScroll, 500));

        return () => {
            window.removeEventListener('scroll', debounce(handleScroll, 500));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { spots, setSpots };
};

export default useScrollAndGetData;