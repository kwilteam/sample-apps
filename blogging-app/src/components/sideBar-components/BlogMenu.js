import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CustomMenuItem, CustomSelect } from "../Mui-components/menus";
import { kwil } from "../../webKwil";

export default function BlogMenu({ walletAddress, setCurrentBlog, menuUpdate }) {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState("");

    async function listBlogs() {
        const allBlogs = await kwil.listDatabases(walletAddress)
        setBlogs(allBlogs.data)
    }

    useEffect(() => {
        if(walletAddress) {
            listBlogs()
        }
        
    }, [walletAddress, menuUpdate])


    return(
        <div className="blog-menu">
            <CustomSelect
                displayEmpty
                value={selectedBlog}
                onChange={(e) => {
                    setSelectedBlog(e.target.value)
                    setCurrentBlog(e.target.value)
                }}
                IconComponent={ExpandMoreIcon}
                sx={{
                    "& .MuiSelect-icon": { color: "#fff" }
                }}
            >
                <CustomMenuItem disabled value="">
                    <em>Select</em>
                </CustomMenuItem>
                {blogs.length > 0 && blogs.map((blog, index) => (
                    <CustomMenuItem value={blog} key={index}>{blog}</CustomMenuItem>
                ))}
            </CustomSelect>
        </div>
    )
}