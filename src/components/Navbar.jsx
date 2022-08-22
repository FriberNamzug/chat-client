import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Collapse } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from '@mui/icons-material/Chat';

import { toast } from "react-toastify";
import Socket from '../components/Socket'

export const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const style = {
        activate: "block py-2 pr-4 pl-3 text-white bg-gray-700 rounded-lg",
        disable:
            "block py-2 pr-4 pl-3 text-white hover:text-gray-200 hover:bg-gray-700 rounded-lg text-center "
    };

    const handleSignOut = () => {
        localStorage.removeItem("token");
        toast.success("Sesión cerrada");
        Socket.emit('desconectado', "Adios desde cliente")
        navigate("/");
    }


    const Lista = () => {
        return (
            <ul className="flex flex-col items-center p-2 w-28">
                <li className="my-2">
                    <NavLink
                        to="./"
                        className={({ isActive }) =>
                            isActive ? style.activate : style.disable
                        }
                    >
                        <span className="">Inicio</span>
                    </NavLink>
                </li>
                <li className="my-2">
                    <NavLink
                        to="./chat"
                        className={({ isActive }) =>
                            isActive ? style.activate : style.disable
                        }
                    >
                        <span className="">Chat</span>
                    </NavLink>
                </li>

                <li className="my-2 cursor-pointer" onClick={handleSignOut}>
                    <div className={style.disable}>
                        <span >Cerrar Sesión</span>
                    </div>
                </li>
            </ul>
        );
    };
    const ListaIcons = () => {
        return (
            <ul className="flex flex-col items-center p-2">
                <li className="my-2">
                    <NavLink
                        to="./"
                        className={({ isActive }) =>
                            isActive ? style.activate : style.disable
                        }
                    >
                        <HomeIcon />
                    </NavLink>
                </li>
                <li className="my-2">
                    <NavLink
                        to="./chat"
                        className={({ isActive }) =>
                            isActive ? style.activate : style.disable
                        }
                    >
                        <ChatIcon />
                    </NavLink>
                </li>

                <li className="my-2 cursor-pointer" onClick={handleSignOut}>
                    <span className={style.disable}>
                        <ExitToAppIcon />
                    </span>
                </li>
            </ul>
        );
    };


    return (
        <div className="flex flex-col">
            <div className="flex justify-center p-2">
                <MenuIcon onClick={() => setOpen(!open)} className="cursor-pointer text-white" />
            </div>
            <div className="flex flex-row">
                <div>
                    <Collapse in={open} orientation="horizontal">
                        <Lista />
                    </Collapse>
                </div>
                <div className="text-white">
                    <Collapse in={!open} orientation="horizontal">
                        <ListaIcons />
                    </Collapse>
                </div>
            </div>
        </div>
    );
};