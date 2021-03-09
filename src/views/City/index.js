import React, { useState } from "react";
import { apiExecutor } from "../../api";
import { useDispatch } from "react-redux";
import { useParams, withRouter } from "react-router";
import { getNeededInfos } from "../../utils/getNeededInfos";
import { openPopup } from "../../redux/action";
import { cityOptions } from "./cityOptions";
import ItemRow from "../../components/ItemRow";
import Panel from "../../components/Panel";
import Loader from "../../components/Loader";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const City = (props) => {
    const city = useParams().city;
    const dispatcher = useDispatch();
    const { spots } = useInfiniteScroll(getMoreSpots, city);
    const [cityOption, setCityOption] = useState(cityOptions.find(currentCity => currentCity.code === city));
    const [isLoading, setIsLoading] = useState(true);

    const onSearchCity = (city) => {
        props.history.push(`/scenicSpot/${city}`);
    };

    async function getMoreSpots(count, from) {
        try {
            setIsLoading(true);
            const response = await apiExecutor.getCitySpots(city, count, from);
            return getNeededInfos(response);
        } catch (error) {
            dispatcher(openPopup({ text: error }));
            return [];
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div key={city} className="p-pt-6">
            <Panel cityOption={cityOption} setCityOption={setCityOption} cities={cityOptions} searchCity={onSearchCity}/>
            <div className="p-pt-6">
                <div className="p-d-flex p-flex-column p-align-center p-mt-3">
                    {
                        spots.map((spot) => {
                            return (
                                <div key={spot.id} className="p-mb-3">
                                    <ItemRow location={spot.location} description={spot.description}/>
                                </div>
                            )
                        })
                    }
                    <div className="p-my-3" style={{ display: isLoading ? 'block' : 'none' }}>
                        <Loader/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(City);