import { SubmitButton } from "../Mui-components/buttons";
import { BlogContentInput, BlogTitleInput } from "../Mui-components/textFields";
import { kwil } from "../../webKwil";
import { Utils } from "kwil";
import { Web3Provider } from "@ethersproject/providers";
import { useState } from "react";

export default function NewPost({ walletAddress, currentBlog, newPost, setNewPost, setNewBlog }) {
    const [blogTitle, setBlogTitle] = useState("")
    const [blogContent, setBlogContent] = useState("")

    async function createPost(title, content) {
        const dbi = await kwil.selectDatabase("0xa23742526C48D90fD23b3D66B45C43c7a75df1c6", "blog_dapp");
        let query = dbi.getQuery("add_post");
        query.setInput("id", Utils.UUID.v4());
        query.setInput("blog", currentBlog);
        query.setInput("post_title", title);
        query.setInput("post_content", content);
        query.setInput("post_timestamp", new Date().toString());
        
        const provider = new Web3Provider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const signer = provider.getSigner();

        try {
            let tx = query.newTx();
            tx = await kwil.prepareTx(tx, signer);
            const res = await kwil.broadcast(tx);
            console.log(res)
            setNewPost(newPost + 1)
            setNewBlog(true)
        } catch (error) {
            console.log(error)
            setNewBlog(true)
        }
    }

    return(
        <div className="blog-post">
            <BlogTitleInput
                placeholder="Title"
                onChange={(e) => setBlogTitle(e.target.value)}
                value={blogTitle}
            />
            <BlogContentInput 
                multiline
                minRows={4}
                placeholder="Write your blog post here..."
                onChange={(e) => setBlogContent(e.target.value)}
                value={blogContent}
            />
            <SubmitButton
                onClick={() => createPost(blogTitle, blogContent)}
            >
                Submit
            </SubmitButton>
        </div>
    )
}