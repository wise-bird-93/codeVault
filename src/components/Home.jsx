import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import "./Home.css"
import { createPaste, updatePaste, getPasteById } from "../services/pasteService";
import toast from "react-hot-toast"

export default function Home() {
    const [title,setTitle] = useState("")
    const [value,setValue] = useState("")
    const [searchParams,setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    

    useEffect(() => {
        const fetchPaste = async () => {
            if (!pasteId) return;

            try {
                const res = await getPasteById(pasteId);

                setTitle(res.data.data.title);
                setValue(res.data.data.code);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load paste");
            }
        };

        fetchPaste();
    }, [pasteId]);

    const handleSubmit = async () => {
        try {
            if (pasteId) {
                await updatePaste(pasteId, {
                    title,
                    code: value,
                    language: "text",
                });

                toast.success("Paste updated successfully");
            } else {
                await createPaste({
                    title,
                    code: value,
                    language: "text",
                });

                toast.success("Paste created successfully");
            }

            setTitle("");
            setValue("");
            setSearchParams({});
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };
    
    return(
        <>
            <div className="HomePage">
                <div className="HomeContainer">
                    <div className="Hometitle">
                        <input id="titletext" type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />

                        <button onClick={handleSubmit}>
                            {
                                pasteId ? "Update" : "Create"
                            }
                        </button>
                    </div>
                    <div className="Hometext">
                        <textarea 
                        value={value}
                        placeholder="Code here..."
                        onChange={(e) => setValue(e.target.value)}></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}