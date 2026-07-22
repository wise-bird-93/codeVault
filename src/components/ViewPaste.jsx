import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewPaste.css";
import { getPasteById } from "../services/pasteService";
import toast from "react-hot-toast";

export default function ViewPaste() {
    const { id } = useParams();

    const [paste, setPaste] = useState(null);

    useEffect(() => {
        const fetchPaste = async () => {
            try {
                const res = await getPasteById(id);
                setPaste(res.data.data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load paste");
            }
        };

        fetchPaste();
    }, [id]);

    return (
        <div className="viewPage">
            <div className="ViewContainer">
                <div className="Viewtitle">
                    <input
                        id="titletext"
                        type="text"
                        value={paste?.title || ""}
                        disabled
                    />
                </div>

                <div className="Viewtext">
                    <textarea
                        value={paste?.code || ""}
                        disabled
                    />
                </div>
            </div>
        </div>
    );
}