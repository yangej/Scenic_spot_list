import React, { useEffect, useState } from "react";
import { apiExecutor } from "../../api";
import {mockSpotInfos} from "../../dummies/mockSpotInfos";
import ItemRow from "../../components/ItemRow";

const All = () => {
    const spotCount = 5;
    const [ itemCount, setItemCount ] = useState(0);
    const [ spots, setSpots ] = useState([]);

    const setSpotsInfos = (result) => {
        return result.map((item) => {
            return {
                id: item.ID,
                location: item.Name,
                description: item.Description
            }
        });
    };

    const handleScroll = async (e) => {
        const scrollingElement = e.target.scrollingElement;

        if (scrollingElement.clientHeight + scrollingElement.scrollTop > scrollingElement.scrollHeight - 100) {
            setItemCount(itemCount => itemCount + spotCount);
        }
    };

    useEffect(() => {
        setSpots(spots.concat(setSpotsInfos(mockSpotInfos.slice(itemCount, spotCount + itemCount))));
    }, [itemCount]);

    useEffect(() => {
        setSpots(spots.concat(setSpotsInfos(mockSpotInfos.slice(0, spotCount))));

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
                        return (<div className="p-mb-3">
                            <ItemRow key={spot.ID} location={spot.location} description={spot.description}/>
                        </div>)
                    })
                }
            </div>
        </div>
    )
};

export default All;