import React, { useState } from "react";
import { apiExecutor } from "../../api";
import { useDispatch } from "react-redux";
import { useParams, withRouter } from "react-router";
import { getNeededInfos } from "../../utils/getNeededInfos";
import { openPopup } from "../../redux/action";
import ItemRow from "../../components/ItemRow";
import Panel from "../../components/Panel";
import useScrollAndGetData from "../../hooks/useScrollAndGetData";

const City = (props) => {
    const dispatcher = useDispatch();
    const city = useParams().city;
    const scrollAndGetData = useScrollAndGetData(getMoreSpots, city);
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
    const [cityOption, setCityOption] = useState(cities.find(currentCity => currentCity.code === city));
    const onSearchCity = (city) => {
        props.history.push(`/scenicSpot/${city}`);
    };

    async function getMoreSpots(count, from) {
        try {
            const response = await apiExecutor.getCitySpots(city, count, from);
            return getNeededInfos(response);
        } catch (error) {
            dispatcher(openPopup({ text: error }));
            return [];
        }
    }

    return (
        <div key={city} className="p-pt-6">
            <Panel cityOption={cityOption} setCityOption={setCityOption} cities={cities} searchCity={onSearchCity}/>
            <div className="p-d-flex p-flex-column p-align-center p-mt-3">
                {
                    scrollAndGetData.spots.length ?
                        scrollAndGetData.spots.map((spot) => {
                            return (<div key={spot.id} className="p-mb-3">
                                <ItemRow location={spot.location} description={spot.description}/>
                            </div>)
                        }) : <p>該城市目前沒有景點</p>
                }
            </div>
        </div>
    );
};

export default withRouter(City);