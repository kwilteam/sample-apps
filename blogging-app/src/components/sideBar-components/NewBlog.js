import { useState } from "react";
import { NewBlogButton } from "../Mui-components/buttons";
import { CustomAddIcon } from "../Mui-components/icons";
import { BlogNameTextField } from "../Mui-components/textFields";
import { kwil } from "../../webKwil";
import { BrowserProvider } from "ethers";


export default function NewBlog({ menuUpdate, setMenuUpdate, blogs }) {
    const [newBlog, setNewBlog] = useState(false)
    const [blogName, setBlogName] = useState("")

    async function createBlog(name) {
        const dbid = kwil.getDBID("0xdB8C53Cd9be615934da491A7476f3f3288d98fEb", "blog_dapp");
        let action = await kwil.getAction(dbid, "add_blog");
        let execution = action.newInstance();
        execution.set('$id', blogs.length + 1);
        execution.set('$name', name);
        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            let tx = await action.prepareAction(signer);
            const res = await kwil.broadcast(tx);
            console.log(res);
            setNewBlog(false);
            setMenuUpdate(menuUpdate + 1);
        } catch (error) {
            console.log(error);
            setNewBlog(false);
        }
    };

    return(
        <div className="new-blog">
            {!newBlog ? 
                <NewBlogButton
                    endIcon={<CustomAddIcon />} 
                    onClick={() => setNewBlog(true)}
                >
                    New Blog
                </NewBlogButton> :
                <>
                    <BlogNameTextField 
                        value={blogName}
                        onChange={(e) => setBlogName(e.target.value)}
                        placeholder="Blog Name"
                    />
                    <NewBlogButton
                        onClick={() => createBlog(blogName)}
                    >
                        Create
                    </NewBlogButton>
                </>
            }
        </div>
    );
};