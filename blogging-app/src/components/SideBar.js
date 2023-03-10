import { useState } from "react"
import kwilLogo from "../assets/kwil-white.png"
import BlogMenu from "./sideBar-components/BlogMenu"
import NewBlog from "./sideBar-components/NewBlog"

export default function SideBar({ walletAddress, setCurrentBlog }) {
    const [menuUpdate, setMenuUpdate] = useState(0)

    return(
        <div className="side-bar">
            <img src={kwilLogo} alt="KWIL Logo" className="logo" />
            <h2>Current Blogs</h2>
            <BlogMenu
                walletAddress={walletAddress}
                setCurrentBlog={setCurrentBlog}
                menuUpdate={menuUpdate}
            />
            <NewBlog
                walletAddress={walletAddress}
                menuUpdate={menuUpdate}
                setMenuUpdate={setMenuUpdate}
            />
        </div>
    )
}