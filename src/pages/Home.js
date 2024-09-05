import React, { useState } from 'react';
import Logo from '../assets/CodePair_Logo.png';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidv4;
        setRoomId(id);
        toast.success('Created a New Room');
    };
    const joinRoom = (e) => {
        if(!userName || !roomId){
            toast.error('UserName and RoomID Required');
            return;
        }
        navigate(`/editor/${roomId}`,{
            state : {
                userName,
            },
        });
    }
    const handleInputEnter = (e) => {
        if(e.code === 'Enter'){
            joinRoom();
        }
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
                <div className="flex justify-center">
                    <img src={Logo} alt="Logo" className="h-24 w-auto" />
                </div>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="roomid" className="block text-sm font-medium text-gray-700">
                            Room ID
                        </label>
                        <input
                            id="roomid"
                            name="roomid"
                            type="text"
                            onChange={(e) => setRoomId(e.target.value)}
                            value={roomId}
                            onKeyUp={handleInputEnter}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            onKeyUp={handleInputEnter}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            onClick={joinRoom}
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Join
                        </button>
                    </div>
                    <div className="mt-6">
                        <p className="text-center">
                            If you don't have an invite, create a{' '}
                            <button onClick={createNewRoom} className="text-green-500 underline">
                                New Room
                            </button>.
                        </p>
                    </div>
                </form>
            </div>
            <footer className="mt-4 text-white">
                <h4>Built By
                    <a href="https://porfolio-inky-eight.vercel.app/" className="text-purple-300 underline ml-1">
                        Arpit Rautela
                    </a>
                </h4>
            </footer>
        </div>
    );
}

export default Home;
