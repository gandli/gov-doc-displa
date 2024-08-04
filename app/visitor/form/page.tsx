import React from 'react';
import VisitorForm from './VisitorForm';

const FormPage: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">访客登记</h1>
            <VisitorForm />
        </div>
    );
};

export default FormPage;
