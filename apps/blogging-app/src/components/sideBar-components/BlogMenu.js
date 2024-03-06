import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CustomMenuItem, CustomSelect } from "../../utils/Mui-components/menus";
import { kwil } from "../../webKwil";

export default function BlogMenu({ kwilSigner, setCurrentBlog, menuUpdate, blogs, setBlogs }) {
    const [selectedBlog, setSelectedBlog] = useState("");

    function organizeBlogName(input) {
        let arr = [];
        for (const i in input) {
            arr.push(...Object.values(input[i]));
        }
        return arr;
    };

    async function listBlogs() {
        // get the dbid
        const dbid = kwil.getDBID(kwilSigner.identifier, "blog_dapp");

        // get the list of blogs with a select query
        const blogList = await kwil.selectQuery(dbid, "SELECT blog_name FROM blogs");

        // set the blogs state
        setBlogs(organizeBlogName(blogList.data));
    };

    useEffect(() => {
        if(kwilSigner) {
            listBlogs();
        }
        
    }, [kwilSigner, menuUpdate]);

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