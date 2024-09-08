import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import Logo from "../assets/CodePair_Logo.png";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import ACTION from "../Actions";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      // Error handling
      socketRef.current.on("connect_error", handleError);
      socketRef.current.on("connect_failed", handleError);

      function handleError(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }

      // Emit join event
      socketRef.current.emit(ACTION.JOIN, {
        roomId,
        userName: location.state?.userName,
      });

      // Listen for joined event
      socketRef.current.on(ACTION.JOINED, ({ clients, userName, socketId }) => {
        if (userName !== location.state?.userName) {
          toast.success(`${userName} joined the room`);
          console.log(`${userName} joined the room`);
        }
        setClients(clients);
      });
    };

    init();

    // Clean up function to remove listeners on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTION.JOINED);
        socketRef.current.off("connect_error");
        socketRef.current.off("connect_failed");
      }
    };
  }, [location.state?.userName, roomId, reactNavigator]);

  // Redirect if location state is not available
  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 flex">
      <div className="bg-white flex flex-col h-screen w-1/6 p-5">
        <div className="flex flex-col flex-grow">
          <div className="flex justify-center mb-4">
            <img src={Logo} alt="Logo" className="h-24 w-auto" />
          </div>
          <h3 className="text-lg font-semibold mb-4">Connected</h3>
          <div className="flex flex-col space-y-3">
            {clients.map((client) => (
              <Client key={client.socketId} userName={client.userName} />
            ))}
          </div>
        </div>
        <div className="mt-auto flex flex-col space-y-3">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Copy ROOM ID
          </button>
          <button className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            Leave
          </button>
        </div>
      </div>
      <div className="flex-1">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
