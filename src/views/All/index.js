import React from "react";
import { useDispatch } from "react-redux";
import { apiExecutor } from "../../api";
import { openPopup } from "../../redux/action";
import { getNeededInfos } from "../../utils/getNeededInfos";
import ItemRow from "../../components/ItemRow";
import useScrollAndGetData from "../../hooks/useScrollAndGetData";

const All = () => {
    const dispatcher = useDispatch();
    const scrollAndGetData = useScrollAndGetData(getMoreSpots);

    async function getMoreSpots (count, from) {
        try {
            const response = await apiExecutor.getAllSpots(count, from);
            return getNeededInfos(response);
        } catch (error) {
            dispatcher(openPopup({ text: error }));
            return []
        }
    }

    return (
        <div className="p-pt-6">
            <div className="p-d-flex p-flex-column p-align-center p-mt-3">
                {
                    scrollAndGetData.spots.length ?
                        scrollAndGetData.spots.map((spot) => {
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