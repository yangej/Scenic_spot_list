import React, { useEffect, useState } from "react";
import { apiExecutor } from "../../api";
import ItemRow from "../../components/ItemRow";

const All = () => {
    const spotCount = 5;
    const [ getSpotFrom, setGetSpotFrom ] = useState(0);
    const [ spots, setSpots ] = useState([]);
    const [ isDone, setIsDone ] = useState(false);

    const handleScroll = async (e) => {
        const scrollingElement = e.target.scrollingElement;
        const isAtBottom = scrollingElement.clientHeight + scrollingElement.scrollTop > scrollingElement.scrollHeight - 10;

        if (isAtBottom && !isDone) {
            setGetSpotFrom(getSpotFrom => getSpotFrom + spotCount);
        }
    };

    const getNeededInfos = (response) => {
        return response.map((item) => {
            return {
                id: item.ID,
                location: item.Name,
                description: item.Description
            }
        });
    };

    const getMoreSpots = async (count, from) => {
        const response = await apiExecutor.getAllSpots(count, from);
        return getNeededInfos(response);
    };

    useEffect(() => {
        (async function() {
            const spotsInfos = await getMoreSpots(spotCount, getSpotFrom + spotCount);
            spotsInfos.length === 0 ? setIsDone(true) : setSpots(spots.concat(spotsInfos));
        })();
    }, [getSpotFrom]);

    useEffect(() => {
        (async function() {
            const spotsInfos = await getMoreSpots(spotCount, getSpotFrom);
            setSpots(spots.concat(spotsInfos));
        })();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div className="p-pt-6">
            <div className="p-d-flex p-flex-column p-align-center p-mt-3">
                {
                    spots.map((spot) => {
                        return (<div key={spot.id} className="p-mb-3">
                            <ItemRow location={spot.location} description={spot.description}/>
                        </div>)
                    })
                }
            </div>
        </div>
    )
};

export default All;