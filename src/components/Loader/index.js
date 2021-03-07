import React from 'react';
import './style.scss';

const Loader = () => {
    return (
        <div>
            <div className="loader p-mx-auto"></div>
            <p className="p-text-center p-m-0">資料載入中...</p>
        </div>
    )
};

export default Loader;