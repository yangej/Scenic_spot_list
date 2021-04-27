import React, { useState, useRef, useCallback, useEffect } from "react";
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

if (process.env.NODE_ENV !== 'production') {
    const {whyDidYouUpdate} = require('why-did-you-update');
    whyDidYouUpdate(React);
}

const SPOT_COUNT = 30;
const ScenicSpotList = React.memo(({ history }) => {
    console.log("renders!")
    const city = useParams().city;
    const dispatcher = useDispatch();
    const [ cityOption, setCityOption ] = useState({ text: "", code: "" });
    const [ spots, setSpots ] = useState([]);
    const isLoading = useRef(true);
    const getSpotFrom = useRef(0);
    const hasMoreSpots = useRef(true);

    const onSearchCity = useCallback((city) => {
        history.push(`/scenicSpot/${city}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showSpotName = useCallback((location) => {
        return function() {
            dispatcher(openPopup({ text: location }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getMoreSpots = useCallback((count, from) => {
        async function fetchSpots (count, from) {
            try {
                isLoading.current = true;
                const response = city ? await apiExecutor.getCitySpots(city, count, from) : await apiExecutor.getAllSpots(count, from);
                return getNeededInfos(response);
            } catch (error) {
                dispatcher(openPopup({ text: error }));
                return [];
            } finally {
                isLoading.current = false;
            }
        }

        return fetchSpots(count, from);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city ? city : null]);

    const handleScroll = async (e) => {
        const scrollingElement = e.target.scrollingElement;
        const isAtBottom = scrollingElement.clientHeight + scrollingElement.scrollTop > scrollingElement.scrollHeight - 10;

        if (isAtBottom && hasMoreSpots) {
            getSpotFrom.current += SPOT_COUNT;

            let data = await getMoreSpots(SPOT_COUNT, getSpotFrom.current);
            data.length ? setSpots(prevSpots => prevSpots.concat(data)) : hasMoreSpots.current = false;
        }
    };

    useEffect(() => {
        const firstGetSpots = async function () {
            const spotsInfos = await getMoreSpots(SPOT_COUNT, getSpotFrom.current);
            setSpots(spotsInfos);
        };
        firstGetSpots();

        setCityOption(cityOptions.find(currentCity => currentCity.code === city));

        const debouncedScrollHandler = debounce(handleScroll, 500);
        window.addEventListener('scroll', debouncedScrollHandler);
        return () => {
            window.removeEventListener('scroll', debouncedScrollHandler);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city ? city : null]);

    return (
        <div key={city} className="p-pt-6">
            {
                city && (<Panel cityOption={cityOption} setCityOption={setCityOption} cities={cityOptions} searchCity={onSearchCity}/>)
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
});

export default withRouter(ScenicSpotList);