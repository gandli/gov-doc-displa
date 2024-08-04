import React from 'react';
import VisitorCharts from './VisitorCharts';

const ChartPage: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">访客数据图表</h1>
            <VisitorCharts />
        </div>
    );
};

export default ChartPage;
