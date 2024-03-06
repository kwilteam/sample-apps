import { useState } from "react";
import Body from "./components/Body";
import SideBar from "./components/SideBar";

export default function App() {
    const [kwilSigner, setKwilSigner] = useState(null);
    const [currentBlog, setCurrentBlog] = useState('');

    return(
        <div className="content-container">
            <SideBar
                kwilSigner={kwilSigner}
                setCurrentBlog={setCurrentBlog}
            />
            <Body
                kwilSigner={kwilSigner}
                setKwilSigner={setKwilSigner}
                currentBlog={currentBlog}
            />
        </div>
    );
};