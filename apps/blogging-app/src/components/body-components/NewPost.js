import { SubmitButton } from "../../utils/Mui-components/buttons";
import { BlogContentInput, BlogTitleInput } from "../../utils/Mui-components/textFields";
import { kwil } from "../../webKwil";
import { useState } from "react";

export default function NewPost({ kwilSigner, currentBlog, newPost, setNewPost, setNewBlog, blogRecords }) {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");

    async function createPost(title, content, kSigner) {
        // get the dbid
        const dbid = kwil.getDBID(kSigner.identifier, "blog_dapp");

        try {
            // execute the transaction on the database
            const res = await kwil.execute({
                dbid,
                action: "add_post",
                inputs: [{
                    $id: blogRecords + 1,
                    $blog: currentBlog,
                    $title: title,
                    $content: content,
                    $timestamp: new Date().toString()
                }],
                description: "Sign to create new post!"
            }, kSigner, true);
          
            // log the result
            console.log(res);

            // trigger post refresh
            setNewPost(newPost + 1);
            setNewBlog(true);
        } catch (error) {
            console.log(error);
            setNewBlog(true);
        }
    };

    return (
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
                onClick={() => createPost(blogTitle, blogContent, kwilSigner)}
            >
                Submit
            </SubmitButton>
        </div>
    );
};