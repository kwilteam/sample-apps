import { useState } from "react";
import { DeleteButton, EditButton, SubmitButton } from "../Mui-components/buttons";
import { BlogContentInput } from "../Mui-components/textFields";
import { kwil } from "../../webKwil";
import { BrowserProvider } from "ethers";
import { Utils } from "kwil";

export default function PostCard({ post, editPost, setEditPost, currentBlog }) {
    const [editMode, setEditMode] = useState(false);
    const [editValue, setEditValue] = useState(post.post_content ? post.post_content : "");

    const title = post.post_title;
    const content = post.post_content;
    const timestamp = post.post_timestamp;
    const wallet = post.wallet_address;

    async function editBlog(newContent) {
        // get the dbid
        const dbid = kwil.getDBID("0xdB8C53Cd9be615934da491A7476f3f3288d98fEb", "blog_dapp");

        // create the action input
        const input = new Utils.ActionInput()
            .put('$content', newContent)
            .put('$title', title)
            .put('$blog', currentBlog);

        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            
            // build the action tx
            const tx = await kwil
                .actionBuilder()
                .dbid(dbid)
                .name("update_post")
                .concat(input)
                .signer(signer)
                .buildTx();

            const res = await kwil.broadcast(tx);
            console.log(res);
            setEditMode(false);
            setEditPost(editPost + 1);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteBlog() {
        // get the dbid
        const dbid = kwil.getDBID("0xdB8C53Cd9be615934da491A7476f3f3288d98fEb", "blog_dapp");

        // create the action input
        const input = Utils.ActionInput.of()
            .put('$title', title)
            .put('$blog', currentBlog);

        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // build the action tx
            const tx = await kwil
                .actionBuilder()
                .dbid(dbid)
                .name("delete_post")
                .concat(input)
                .signer(signer)
                .buildTx();

            const res = await kwil.broadcast(tx);
            console.log(res);
            setEditPost(editPost + 1);
        } catch (error) {
            console.log(error);
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