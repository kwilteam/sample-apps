import { useState } from "react";
import Body from "./components/Body";
import SideBar from "./components/SideBar";


export default function App() {
    const [walletAddress, setWalletAddress] = useState(null)
    const [currentBlog, setCurrentBlog] = useState('test')

    return(
        <div className="content-container">
            <SideBar
                walletAddress={walletAddress}
                setCurrentBlog={setCurrentBlog}
            />
            <Body
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
                currentBlog={currentBlog}
            />
        </div>
    )
}