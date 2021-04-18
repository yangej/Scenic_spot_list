import React from 'react';
import './style.scss';

const Loader = React.memo(() => {
    return (
        <div>
            <div className="loader p-mx-auto"></div>
            <p className="p-text-center p-m-0 p-mt-2">資料載入中...</p>
        </div>
    )
});

export default Loader;