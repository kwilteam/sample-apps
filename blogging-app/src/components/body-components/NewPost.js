import { SubmitButton } from "../Mui-components/buttons";
import { BlogContentInput, BlogTitleInput } from "../Mui-components/textFields";
import { kwil } from "../../webKwil";
import { useState } from "react";
import { BrowserProvider } from "ethers";
import { Utils } from "luke-dev";

export default function NewPost({ walletAddress, currentBlog, newPost, setNewPost, setNewBlog, blogRecords }) {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");

    async function createPost(title, content) {
        // create the action input
        const input = new Utils.ActionInput()
            .put('$id', blogRecords + 1)
            .put('$blog', currentBlog)
            .put('$title', title)
            .put('$content', content)
            .put('$timestamp', new Date().toString());
        
        // get the dbid
        const dbid = kwil.getDBID("0xdB8C53Cd9be615934da491A7476f3f3288d98fEb", "blog_dapp");

        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
           
            // build the action tx
            const tx = await kwil
                .actionBuilder()
                .dbid(dbid)
                .name("add_post")
                .concat(input)
                .signer(signer)
                .buildTx();

            const res = await kwil.broadcast(tx);
            console.log(res);
            setNewPost(newPost + 1);
            setNewBlog(true);
        } catch (error) {
            console.log(error);
            setNewBlog(true);
        }
    };

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
    );
};