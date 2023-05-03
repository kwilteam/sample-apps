import { useState } from "react";
import { DeleteButton, EditButton, SubmitButton } from "../Mui-components/buttons";
import { BlogContentInput } from "../Mui-components/textFields";
import { kwil } from "../../webKwil";
import { BrowserProvider } from "ethers";

export default function PostCard({ post, editPost, setEditPost, currentBlog }) {
    const [editMode, setEditMode] = useState(false)
    const [editValue, setEditValue] = useState(post.post_content ? post.post_content : "")

    const title = post.post_title;
    const content = post.post_content;
    const timestamp = post.post_timestamp;
    const wallet = post.wallet_address;

    async function editBlog(newContent) {
        const dbid = kwil.getDBID("0xdB8C53Cd9be615934da491A7476f3f3288d98fEb", "blog_dapp");
        let action = await kwil.getAction(dbid, "update_post");
        let execution = action.newInstance();

        execution.set('$content', newContent);
        execution.set('$title', title);
        execution.set('$blog', currentBlog);

        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            let tx = await action.prepareAction(signer);
            const res = await kwil.broadcast(tx);
            console.log(res);
            setEditMode(false);
            setEditPost(editPost + 1);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteBlog() {
        const dbid = kwil.getDBID("0xdB8C53Cd9be615934da491A7476f3f3288d98fEb", "blog_dapp");
        let action = await kwil.getAction(dbid, "delete_post");
        let execution = action.newInstance();

        execution.set('$title', title);
        execution.set('$blog', currentBlog);


        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            let tx = await action.prepareAction(signer);
            const res = await kwil.broadcast(tx);
            console.log(res)
            setEditPost(editPost + 1)
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <div className="blog-post">
            <h3>{title}</h3>
            <div className="author-block">
                <p className="blog-text">By: {wallet}</p>
                <p className="blog-text" style={{ marginLeft: "15px" }}>Timestamp: {timestamp}</p>
            </div>
            {!editMode ?
                <div className="blog-body">
                    <p className="blog-text">{content}</p>
                </div> :
                <BlogContentInput
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    multiline
                    minRows={4}
                />
            }
            {!editMode ? 
                <div className="edit-buttons">
                    <EditButton
                        onClick={() => setEditMode(true)}
                    >
                        Edit
                    </EditButton>
                    <DeleteButton
                        onClick={() => deleteBlog()}
                    >
                        Delete
                    </DeleteButton>
                </div> :
                <SubmitButton
                    onClick={() => editBlog(editValue)}
                >
                    Submit
                </SubmitButton>
            }
        </div>
    )
}