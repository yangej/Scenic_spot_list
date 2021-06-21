import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, withRouter } from "react-router";
import { openPopup } from "../../redux/action";
import { cityOptions } from "./cityOptions";
import ItemRow from "../../components/ItemRow";
import Panel from "../../components/Panel";
import Loader from "../../components/Loader";
import {apiExecutor} from "../../api";
import {getNeededInfos} from "../../utils/getNeededInfos";
import {debounce} from "../../utils/debounce";

const SPOT_COUNT = 30;
const ScenicSpotList = ({ history }) => {
    const city = useParams().city;
    const dispatcher = useDispatch();
    const [ spots, setSpots ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ cityOption, setCityOption ] = useState({ text: "", code: "" });
    let getSpotFrom = 0;
    let hasMoreSpots = true;

    const onSearchCity = useCallback((city) => {
        history.push(`/scenicSpot/${city}`);
    }, [history]);

    const showSpotName = useCallback((location) => {
        return function() {
            dispatcher(openPopup({ text: location }));
        }
    }, [dispatcher]);

    const getMoreSpots = (city, count, from) => {
        async function fetchSpots (count, from) {
            try {
                setIsLoading(true);
                const response = city ? await apiExecutor.getCitySpots(city, count, from) : await apiExecutor.getAllSpots(count, from);
                const data = getNeededInfos(response)
                spots.length ? setSpots(prevSpots => prevSpots.concat(data)) : setSpots(data);
            } catch (error) {
                dispatcher(openPopup({ text: error }));
                return [];
            } finally {
                setTimeout(() => setIsLoading(false), 1000);
            }
        }
        fetchSpots(count, from);
    };

    const handleScroll = async (e) => {
        const scrollingElement = e.target.scrollingElement;
        const isAtBottom = scrollingElement.clientHeight + scrollingElement.scrollTop > scrollingElement.scrollHeight - 10;

        if (isAtBottom && hasMoreSpots) {
            getSpotFrom += SPOT_COUNT;
            let data = await getMoreSpots(city, SPOT_COUNT, getSpotFrom);
            if (!data.length)  hasMoreSpots = false;
        }
    };

    useEffect(() => {
        const firstGetSpots = async function () {
             await getMoreSpots(city, SPOT_COUNT, getSpotFrom);
        };
        firstGetSpots();
        setCityOption(cityOptions.find(currentCity => currentCity.code === city));

        const debouncedScrollHandler = debounce(handleScroll, 500);
        window.addEventListener('scroll', debouncedScrollHandler);
        return () => {
            window.removeEventListener('scroll', debouncedScrollHandler);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city]);

    return (
        <div key={city} className="p-pt-6">
            {
                city && (<Panel cityOption={cityOption} setCityOption={setCityOption} cityOptions={cityOptions} searchCity={onSearchCity}/>)
            }
            <div className="p-pt-6">
                <div className="p-d-flex p-flex-column p-align-center p-mt-3">
                    {
                        spots.map((spot) => {
                            return (
                                <div key={spot.id} className="p-mb-3" onClick={showSpotName(spot.location)}>
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

export default withRouter(ScenicSpotList);