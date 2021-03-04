import React, { useEffect, useState } from "react";
import { withRouter, useParams } from "react-router";
import { mockSpotInfos } from "../../dummies/mockSpotInfos";
import ItemRow from "../../components/ItemRow";
import Panel from "../../components/Panel";

const City = () => {
    const spotCount = 5;
    const { city } = useParams();
    const [ itemCount, setItemCount ] = useState(0);
    const [ spots, setSpots ] = useState([]);
    const cities = [
        { text: '臺北市', code: 'TPE' },
        { text: '新北市', code: 'TPH' },
        { text: '桃園市', code: 'TYC' },
        { text: '臺中市', code: 'TXG' },
        { text: '臺南市', code: 'TNN' },
        { text: '高雄市', code: 'KHH' },
        { text: '基隆市', code: 'KLU' },
        { text: '新竹市', code: 'HSC' },
        { text: '新竹縣', code: 'HSH' },
        { text: '苗栗縣', code: 'MAL' },
        { text: '彰化縣', code: 'CWH' },
        { text: '南投縣', code: 'NTO' },
        { text: '雲林縣', code: 'YLH' },
        { text: '嘉義縣', code: 'CHY' },
        { text: '嘉義市', code: 'CYI' },
        { text: '屏東縣', code: 'PTS' },
        { text: '宜蘭縣', code: 'ILN' },
        { text: '花蓮縣', code: 'HWA' },
        { text: '臺東縣', code: 'TTT' },
        { text: '金門縣', code: 'KMN' },
        { text: '澎湖縣', code: 'PEH' },
        { text: '連江縣', code: 'LNN' },
    ];
    const [cityOption, setCityOption] = useState(cities[0]);

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
        setCityOption(cities.find(cityOption => cityOption.text === city));
        setSpots(spots.concat(setSpotsInfos(mockSpotInfos.slice(0, spotCount))));

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div className="p-pt-6">
            <Panel cityOption={cityOption} setCityOption={setCityOption} cities={cities}/>
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
    );
};

export default withRouter(City);