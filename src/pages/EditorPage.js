import React, { useState,useRef, useEffect } from 'react';
import Logo from '../assets/CodePair_Logo.png';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTION from '../Actions';
import { useLocation } from 'react-router-dom';

const EditorPage = () => {
    const socketRef = useRef(null);
    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            // socketRef.current.emit(ACTION.JOIN, {
            //     roomId,
            //     username  : Location.state?.username,
            // });
        }
    }, []);
    const [clients, setClients] = useState([
        { socketId: 1, userName: 'Arpit Rautela' },
        { socketId: 2, userName: 'Apurva Mukherjee' },
        { socketId: 3,userName: 'Swastik Mukherjee'}
    ]);

    return (
        <div className='min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 flex'>
            <div className='bg-white flex flex-col h-screen w-1/6 p-5'>
                <div className='flex flex-col flex-grow'>
                    <div className='flex justify-center mb-4'>
                        <img src={Logo} alt="Logo" className="h-24 w-auto" />
                    </div>
                    <h3 className='text-lg font-semibold mb-4'>Connected</h3>
                    <div className='flex flex-col space-y-3'>
                        {clients.map((client) => (
                            <Client key={client.socketId} userName={client.userName} />
                        ))}
                    </div>
                </div>
                <div className='mt-auto flex flex-col space-y-3'>
                    <button className='bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                        Copy ROOM ID
                    </button>
                    <button className='bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'>
                        Leave
                    </button>
                </div>
            </div>
            <div className='flex-1'>
                <Editor />
            </div>
        </div>
    );
}

export default EditorPage;
 