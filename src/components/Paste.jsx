import React, { useState } from "react";
import { useEffect } from "react";
import {
    getAllPastes,
    deletePaste,
} from "../services/pasteService";
import './Paste.css';

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {FaEdit,FaShareAlt,FaEye,FaTrash,FaCopy,FaCalendarAlt,FaSearch} from "react-icons/fa";

export default function Pastes() {
    const [pastes, setPastes] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchPastes();
    }, []);

    const fetchPastes = async () => {
        try {
            const res = await getAllPastes();
            setPastes(res.data.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch pastes");
        }
    };

    const filteredData = pastes.filter(
        (pastes) => pastes.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (pasteId) => {
        try {
            await deletePaste(pasteId);

            toast.success("Paste deleted");

            fetchPastes();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete");
        }
    };

    function handleShare (paste) {
        const link = `${window.location.origin}/pastes/${paste._id}`;
        navigator.clipboard.writeText(link);
        toast.success("Share link copied!");
    };

    
    return(
        <div className="pastesPage">
            <div className={`pastesearch ${open ? "open" : ""}`}>
                <FaSearch className="search-icon" onClick={() => setOpen(prev => !prev)}/>
                <input id="search" type="search" 
                    value={searchTerm}
                    placeholder="Search here.."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div>
                {
                    filteredData.length > 0 && 
                    filteredData.map(
                        (paste) => {
                            const formattedDate = new Date(paste.createdAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                            );

                            return (
                                <div className="pastelist" key={paste._id}>
                                    <div className="pasteTitle">
                                        <h2>{paste.title}</h2>

                                        
                                        <span>{paste.code}
                                            {paste.code.split(" ").slice(0, 10).join(" ")}
                                            {paste.code.split(" ").length > 10 ? "..." : ""}
                                        </span>
                                    </div>
                                    <div className="pasteactions">
                                        <div className="actionbuttons">
                                        {/* Edit */}
                                        <button>
                                            <Link to={`/?pasteId=${paste?._id}`} className="actionBtn">
                                                <FaEdit className="text-lg" />
                                                
                                            </Link>
                                        </button>
                                        {/* View */}
                                        <button>
                                            <Link to={`/pastes/${paste?._id}`}>
                                                <FaEye className="text-lg" />
                                            </Link>
                                        </button>
                                        {/* Copy */}
                                        <button 
                                            onClick={() => {
                                                navigator.clipboard.writeText(paste?.code)
                                                toast.success("Copied to clipboard")
                                        }}>
                                            <FaCopy className="text-lg" />
                                        </button>
                                        {/* Delete */}
                                        <button onClick={() => handleDelete(paste?._id)}>
                                            <FaTrash className="text-lg" />
                                        </button>
                                        {/* Share */}
                                        <button
                                            onClick={() => handleShare(paste)}>
                                            <FaShareAlt className="text-lg" />
                                        </button>
                                        </div>

                                        <div className="pasteDate">
                                            <FaCalendarAlt className="text-lg" />
                                            <span>{formattedDate}</span>
                                        </div>
                                    </div>
                                    
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}
