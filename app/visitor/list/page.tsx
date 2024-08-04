import React from 'react';
import VisitorList from './VisitorList';

const ListPage: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">访客列表</h1>
            <VisitorList />
        </div>
    );
};

export default ListPage;
