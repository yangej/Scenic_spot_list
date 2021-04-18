import React from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import './style.scss';

const Panel = React.memo(({ cityOption, cities, setCityOption, searchCity }) => {
    const handleSearch = () => {
        searchCity(cityOption.code);
    };

    return (<div className="panel p-mx-auto">
        <h4>請選擇欲查詢的城市</h4>
        <div className="input-row">
            <Dropdown optionLabel="text" value={cityOption} options={cities} onChange={(e) => setCityOption(e.value)} placeholder="請選擇城市"/>
            <Button label="搜尋" className="p-ml-2" onClick={handleSearch}/>
        </div>
    </div>);
});

export default Panel;