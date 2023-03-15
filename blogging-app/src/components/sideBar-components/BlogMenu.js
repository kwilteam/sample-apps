import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CustomMenuItem, CustomSelect } from "../Mui-components/menus";
import { kwil } from "../../webKwil";

export default function BlogMenu({ walletAddress, setCurrentBlog, menuUpdate }) {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState("");

    async function listBlogs() {
        const dbid = (await kwil.selectDatabase("0xa23742526C48D90fD23b3D66B45C43c7a75df1c6", "blog_dapp")).DBID;
        const blogs = await kwil.graphql(`query loadBlogs {
            ${dbid}_blogs {
                blog_name
            }
        }`);
        setBlogs(blogs.data[`${dbid}_blogs`]);
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
                    <CustomMenuItem value={blog.blog_name} key={index}>{blog.blog_name}</CustomMenuItem>
                ))}
            </CustomSelect>
        </div>
    )
}