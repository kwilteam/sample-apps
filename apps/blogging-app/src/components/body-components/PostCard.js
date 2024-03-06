import { useState } from "react";
import { DeleteButton, EditButton, SubmitButton } from "../../utils/Mui-components/buttons";
import { BlogContentInput } from "../../utils/Mui-components/textFields";
import { kwil } from "../../webKwil";

export default function PostCard({ post, editPost, setEditPost, currentBlog, kwilSigner }) {
    const [editMode, setEditMode] = useState(false);
    const [editValue, setEditValue] = useState(post.post_content ? post.post_content : "");

    const title = post.post_title;
    const content = post.post_content;
    const timestamp = post.post_timestamp;
    const wallet = post.wallet_address;

    async function editBlog(newContent, currentBlog, title, kSigner) {
        if (!newContent) {
            window.alert("Please text into the post");
            return;
        }

        if (!kSigner) {
            window.alert("Please connect your wallet");
            return;
        }

        // get the dbid
        const dbid = kwil.getDBID(kSigner.identifier, "blog_dapp");

        try {
            // execute the transaction on the database
            const res = await kwil.execute({
                dbid,
                action: "update_post",
                inputs: [{
                    $content: newContent,
                    $title: title,
                    $blog: currentBlog
                }],
                description: "Sign to update post!"
            }, kSigner, true);

            // log the result
            console.log(res);

            // reset the edit mode and set the edit post to refresh
            setEditMode(false);
            setEditPost(editPost + 1);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteBlog(title, currentBlog, kSigner) {
        // get the dbid
        const dbid = kwil.getDBID(kSigner.identifier, "blog_dapp");

        try {
            // execute the transaction on the database
            const res = await kwil.execute({
                dbid,
                action: "delete_post",
                inputs: [{
                    $title: title,
                    $blog: currentBlog
                }],
                description: "Sign to delete post!"
            }, kSigner, true);

            // log the result
            console.log(res);

            // set the edit post to refresh
            setEditPost(editPost + 1);
        } catch (error) {
            console.log(error);
        }
    }

    return (
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
                        onClick={() => deleteBlog(title, currentBlog, kwilSigner)}
                    >
                        Delete
                    </DeleteButton>
                </div> :
                <SubmitButton
                    onClick={() => editBlog(editValue, currentBlog, title, kwilSigner)}
                >
                    Submit
                </SubmitButton>
            }
        </div>
    )
}