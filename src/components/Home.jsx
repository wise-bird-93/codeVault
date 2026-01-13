import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import "./Home.css"
import {useDispatch, useSelector} from 'react-redux'
import { addToPastes, updateToPastes } from "../Redux/PasteSlice"
import toast from "react-hot-toast"

export default function Home() {
    const [title,setTitle] = useState("")
    const [value,setValue] = useState("")
    const [searchParams,setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch()
    const allPastes =   useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if(pasteId){
            const paste = allPastes.find((p) => p._id === pasteId);
            if(paste){
                setTitle(paste.title);
                console.log(paste.title);
                setValue(paste.content);
            }
        }
    },[pasteId,allPastes])

    function createPaste() {
        const paste = {
            title:title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        

        if(pasteId){
            dispatch(updateToPastes(paste));
        }
        else{
            dispatch(addToPastes(paste));
        }

        setTitle('')
        setValue('')
        setSearchParams({})
        toast("Paste created successfully")
    }
    
    return(
        <>
            <div className="HomePage">
                <div className="HomeContainer">
                    <div className="Hometitle">
                        <input id="titletext" type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />

                        <button onClick={createPaste}>
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