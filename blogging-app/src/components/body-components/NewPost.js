import { SubmitButton } from "../Mui-components/buttons";
import { BlogContentInput, BlogTitleInput } from "../Mui-components/textFields";
import { kwil } from "../../webKwil";
import { useState } from "react";
import { BrowserProvider } from "ethers";

export default function NewPost({ walletAddress, currentBlog, newPost, setNewPost, setNewBlog, blogRecords }) {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");

    async function createPost(title, content) {
        const dbid = kwil.getDBID("0xdB8C53Cd9be615934da491A7476f3f3288d98fEb", "blog_dapp");
        let action = await kwil.getAction(dbid, "add_post");
        let execution = action.newInstance();

        execution.set('$id', blogRecords + 1);
        execution.set('$blog', currentBlog);
        execution.set('$title', title);
        execution.set('$content', content);
        execution.set('$timestamp', new Date().toString());

        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            let tx = await action.prepareAction(signer);
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