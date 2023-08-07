import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CustomMenuItem, CustomSelect } from "../Mui-components/menus";
import { kwil } from "../../webKwil";

export default function BlogMenu({ walletAddress, setCurrentBlog, menuUpdate, blogs, setBlogs }) {
    const [selectedBlog, setSelectedBlog] = useState("");

    function organizeBlogName(input) {
        let arr = [];
        for (const i in input) {
            arr.push(...Object.values(input[i]));
        }
        return arr;
    };

    async function listBlogs() {
        const dbid = kwil.getDBID("0xdB8C53Cd9be615934da491A7476f3f3288d98fEb", "blog_dapp");
        const blogList = await kwil.selectQuery(dbid, "SELECT blog_name FROM blogs");
        setBlogs(organizeBlogName(blogList.data));
    };

    useEffect(() => {
        if(walletAddress) {
            listBlogs();
        }
        
    }, [walletAddress, menuUpdate]);

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
    );
};