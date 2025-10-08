import React from 'react';

const CustomContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="max-w-[1540px] mx-auto px-2">
            {children}
        </div>
    );
};

export default CustomContainer;