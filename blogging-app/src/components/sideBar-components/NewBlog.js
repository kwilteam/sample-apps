import { Utils } from "kwil";
import { useState } from "react";
import { NewBlogButton } from "../Mui-components/buttons";
import { CustomAddIcon } from "../Mui-components/icons";
import { BlogNameTextField } from "../Mui-components/textFields";
import { kwil } from "../../webKwil";
import { Web3Provider } from "@ethersproject/providers";

export default function NewBlog({ menuUpdate, setMenuUpdate }) {
    const [newBlog, setNewBlog] = useState(false)
    const [blogName, setBlogName] = useState("")

    async function createBlog(name) {
        const dbi = await kwil.selectDatabase("0xa23742526C48D90fD23b3D66B45C43c7a75df1c6", "blog_dapp");
        const query = dbi.getQuery('add_blog');
        query.setInput('id', Utils.UUID.v4());
        query.setInput('blog_name', name);
        const provider = new Web3Provider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const signer = provider.getSigner();
        try {
            let tx = query.newTx();
            tx = await kwil.prepareTx(tx, signer);
            const res = await kwil.broadcast(tx);
            console.log(res)
            setNewBlog(false)
            setMenuUpdate(menuUpdate + 1)
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