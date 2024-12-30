import React, { useState } from 'react';
import { socket } from '../socket';

const Option = ({ info }) => {
    const [checked, setChecked] = useState(false);

    const handleToggle = () => {
        socket.emit('poll update', info.option, checked);
        setChecked(!checked);
    };

    return (
        <div>
            <label>
                <input type="checkbox" checked={checked} onChange={handleToggle} />
                {info.option} - Votes: {info.votes}
            </label>
        </div>
    );
};

export default Option;