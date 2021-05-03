import React, { useCallback } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import './style.scss';

const Panel = React.memo(({ cityOption, setCityOption, cityOptions, searchCity }) => {
    const handleSearch = useCallback(() => {
        searchCity(cityOption.code);
    }, [searchCity, cityOption]);

    const changeCity = useCallback((e) => {
        setCityOption(e.value)
    }, [setCityOption]);

    return (<div className="panel p-mx-auto">
        <h4>請選擇欲查詢的城市</h4>
        <div className="input-row">
            <Dropdown optionLabel="text" value={cityOption} options={cityOptions} onChange={changeCity} placeholder="請選擇城市"/>
            <Button label="搜尋" className="p-ml-2" onClick={handleSearch}/>
        </div>
    </div>);
});

export default Panel;