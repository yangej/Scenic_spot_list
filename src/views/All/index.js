import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { apiExecutor } from "../../api";
import { openPopup } from "../../redux/action";
import { getNeededInfos } from "../../utils/getNeededInfos";
import ItemRow from "../../components/ItemRow";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Loader from "../../components/Loader";

const All = () => {
    const dispatcher = useDispatch();
    const { spots } = useInfiniteScroll(getMoreSpots);
    const [isLoading, setIsLoading] = useState(true);

    async function getMoreSpots (count, from) {
        try {
            setIsLoading(true);
            const response = await apiExecutor.getAllSpots(count, from);
            return getNeededInfos(response);
        } catch (error) {
            dispatcher(openPopup({ text: error }));
            return []
        } finally {
            setIsLoading(false);
        }
    }

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
                <div className="p-my-3" style={{ display: isLoading ? 'block' : 'none' }}>
                    <Loader/>
                </div>
            </div>
        </div>
    )
};

export default All;