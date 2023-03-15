import { Web3Provider } from "@ethersproject/providers";
import { useState } from "react";
import { DeleteButton, EditButton, SubmitButton } from "../Mui-components/buttons";
import { BlogContentInput } from "../Mui-components/textFields";
import { kwil } from "../../webKwil";

export default function PostCard({ post, dbIdentifier, editPost, setEditPost, currentBlog }) {
    const [editMode, setEditMode] = useState(false)
    const [editValue, setEditValue] = useState(post.post_content ? post.post_content : "")

    const title = post.post_title
    const content = post.post_content
    const timestamp = post.post_timestamp
    const wallet = post.wallet_address

    async function editBlog(newContent) {
        let query = dbIdentifier.getQuery("update_post")
        query.setInput("post_content", newContent)
        query.setInput("where_post_title", title)
        query.setInput("where_blog", currentBlog)

        try {
            const provider = new Web3Provider(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            const signer = provider.getSigner();

            let tx = query.newTx();
            tx = await kwil.prepareTx(tx, signer);
            const res = await kwil.broadcast(tx);
            console.log(res)
            setEditMode(false)
            setEditPost(editPost + 1)
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteBlog() {
        let query = dbIdentifier.getQuery("delete_post")
        query.setInput("where_post_title", title)
        query.setInput("where_blog", currentBlog)

        try {
            const provider = new Web3Provider(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            const signer = provider.getSigner();

            let tx = query.newTx();
            tx = await kwil.prepareTx(tx, signer);
            const res = await kwil.broadcast(tx);
            console.log(res)
            setEditMode(false)
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