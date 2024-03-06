import { useEffect, useState } from "react";
import { kwil } from "../webKwil";
import ConnectMetamask from "./body-components/ConnectMetamask";
import NewPost from "./body-components/NewPost";
import PostCard from "./body-components/PostCard";
import { NewPostButton } from "../utils/Mui-components/buttons";

export default function Body({ kwilSigner, setKwilSigner, currentBlog }) {
    const [currentBlogData, setCurrentBlogData] = useState([]);
    const [blogRecords, setBlogRecords] = useState(0);
    const [newPost, setNewPost] = useState(0);
    const [editPost, setEditPost] = useState(0);
    const [newBlog, setNewBlog] = useState(true);

    async function getBlogs(identifier, blog) {
        if (!identifier || !blog) return;

        // get the dbid
        const dbid = kwil.getDBID(identifier, "blog_dapp");

        try {
            // call the view action `get_posts` to get the blog posts
            const posts = await kwil.call({
                dbid,
                action: "get_posts",
                inputs: [{
                    $current_blog: blog
                }]
            })

            // set the current blog data
            setCurrentBlogData(posts.data.result);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        if (kwilSigner && currentBlog) {
            getBlogs(kwilSigner.identifier, currentBlog);
        };
    }, [currentBlog, newPost, editPost, kwilSigner]);

    async function getBlogRecords(identifier) {
        if (!identifier) return;
        // get the dbid
        const dbid = kwil.getDBID(identifier, "blog_dapp");
        // call the select query to get the number of records in the blog
        const query = await kwil.selectQuery(dbid, "SELECT count(*) FROM posts");

        // set the number of blog records to auto increment the count
        setBlogRecords(query.data[0]["count(*)"]);
    };

    useEffect(() => {
        if(kwilSigner) {
            getBlogRecords(kwilSigner.identifier);
        }
        getBlogRecords();
    }, [newPost]);

    return (
        <div className="body-content">
            <div className="head-buttons">
                <ConnectMetamask
                    kwilSigner={kwilSigner}
                    setKwilSigner={setKwilSigner}
                />
            </div>
            {currentBlog ?
                <>
                    {currentBlogData && currentBlogData.map((post, index) => {
                        return (
                            <PostCard
                                key={index}
                                post={post}
                                editPost={editPost}
                                setEditPost={setEditPost}
                                currentBlog={currentBlog}
                                kwilSigner={kwilSigner}
                            />
                        );
                    })}
                    {!newBlog ?
                        <NewPost
                            kwilSigner={kwilSigner}
                            currentBlog={currentBlog}
                            newPost={newPost}
                            setNewPost={setNewPost}
                            setNewBlog={setNewBlog}
                            blogRecords={blogRecords}
                        /> :
                        <NewPostButton
                            onClick={() => setNewBlog(false)}
                        >
                            New Blog Post
                        </NewPostButton>
                    }
                </> : null
            }
        </div>
    );
};