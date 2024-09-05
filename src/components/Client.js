import React from 'react';
import Avatar from 'react-avatar';

const Client = ({ userName }) => {
    return (
        <div className="flex items-center space-x-2">
            <Avatar name={userName} size={40} round={true} />
            <span>{userName}</span>
        </div>
    );
};

export default Client;