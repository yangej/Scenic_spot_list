import React, { useEffect, useState } from "react";
import { apiExecutor } from "../../api";
import ItemRow from "../../components/ItemRow";
import {openPopup} from "../../redux/action";
import {useDispatch} from "react-redux";

const All = () => {
    const dispatcher = useDispatch();
    const spotCount = 30;
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
        try {
            const response = await apiExecutor.getAllSpots(count, from);
            return getNeededInfos(response);
        } catch (error) {
            dispatcher(openPopup({ text: error }));
            return []
        }
    };

    useEffect(() => {
        getSpotFrom && (async function() {
            const spotsInfos = await getMoreSpots(spotCount, getSpotFrom + spotCount);
            spotsInfos.length === 0 ? setIsDone(true) : setSpots(spots.concat(spotsInfos));
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-pt-6">
            <div className="p-d-flex p-flex-column p-align-center p-mt-3">
                {
                    spots.length ?
                        spots.map((spot) => {
                            return (<div key={spot.id} className="p-mb-3">
                                <ItemRow location={spot.location} description={spot.description}/>
                            </div>)
                        }) : <p>全台目前沒有景點</p>
                }
            </div>
        </div>
    )
};

export default All;