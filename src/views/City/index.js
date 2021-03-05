import React, { useEffect, useState } from "react";
import ItemRow from "../../components/ItemRow";
import Panel from "../../components/Panel";
import {apiExecutor} from "../../api";

const City = () => {
    const spotCount = 30;
    const [ isDone, setIsDone ] = useState(false);
    const [ getSpotFrom, setGetSpotFrom ] = useState(0);
    const [ spots, setSpots ] = useState([]);
    const cities = [
        { text: '臺北市', code: 'Taipei' },
        { text: '新北市', code: 'NewTaipei' },
        { text: '桃園市', code: 'Taoyuan' },
        { text: '臺中市', code: 'Taichung' },
        { text: '臺南市', code: 'Tainan' },
        { text: '高雄市', code: 'Kaohsiung' },
        { text: '基隆市', code: 'Keelung' },
        { text: '新竹市', code: 'Hsinchu' },
        { text: '新竹縣', code: 'HsinchuCounty' },
        { text: '苗栗縣', code: 'MiaoliCounty' },
        { text: '彰化縣', code: 'ChanghuaCounty' },
        { text: '南投縣', code: 'NantouCounty' },
        { text: '雲林縣', code: 'YunlinCounty' },
        { text: '嘉義縣', code: 'ChiayiCounty' },
        { text: '嘉義市', code: 'Chiayi' },
        { text: '屏東縣', code: 'PingtungCounty' },
        { text: '宜蘭縣', code: 'YilanCounty' },
        { text: '花蓮縣', code: 'HualienCounty' },
        { text: '臺東縣', code: 'TaitungCounty' },
        { text: '金門縣', code: 'KinmenCounty' },
        { text: '澎湖縣', code: 'PenghuCounty' },
        { text: '連江縣', code: 'LienchiangCounty' },
    ];
    const [cityOption, setCityOption] = useState(cities[0]);

    const onSearchCity = async (city) => {
        // TODO: test if scroll to top && get correct data
        const spotsInfos = await getMoreSpots(city, spotCount, getSpotFrom + spotCount);
        setSpots(spotsInfos);
        window.scrollTo(0, 0);
    };

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
                description: item.DescriptionDetail
            }
        });
    };

    const getMoreSpots = async (city, count, from) => {
        const response = await apiExecutor.getCitySpots(city, count, from);
        return getNeededInfos(response);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        (async function() {
            const spotsInfos = await getMoreSpots(cityOption.code, spotCount, getSpotFrom);
            setSpots(spotsInfos);
        })();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        getSpotFrom && (async function() {
            const spotsInfos = await getMoreSpots(cityOption.code, spotCount, getSpotFrom + spotCount);
            spotsInfos.length === 0 ? setIsDone(true) : setSpots(spots.concat(spotsInfos));
        })();

    }, [getSpotFrom]);

    return (
        <div className="p-pt-6">
            <Panel cityOption={cityOption} setCityOption={setCityOption} cities={cities} searchCity={onSearchCity}/>
            <div className="p-d-flex p-flex-column p-align-center p-mt-3">
                {
                    spots.length ?
                        spots.map((spot) => {
                            return (<div key={spot.id} className="p-mb-3">
                                <ItemRow location={spot.location} description={spot.description}/>
                            </div>)
                        }) : <p>該地區沒有景點</p>
                }
            </div>
        </div>
    );
};

export default City;