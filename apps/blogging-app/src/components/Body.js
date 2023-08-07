import { useEffect, useState } from "react";
import { kwil } from "../webKwil";
import ConnectMetamask from "./body-components/ConnectMetamask";
import FundingInterface from "./body-components/FundingInterface";
import NewPost from "./body-components/NewPost";
import PostCard from "./body-components/PostCard";
import { NewPostButton } from "./Mui-components/buttons";


export default function Body({ walletAddress, setWalletAddress, currentBlog }) {
    const [currentBlogData, setCurrentBlogData] = useState([]);
    const [blogRecords, setBlogRecords] = useState(0);
    const [newPost, setNewPost] = useState(0);
    const [editPost, setEditPost] = useState(0);
    const [newBlog, setNewBlog] = useState(true);
    
    async function getBlogs() {
        const dbid = kwil.getDBID("0xdB8C53Cd9be615934da491A7476f3f3288d98fEb", "blog_dapp");

        try {
            const query = await kwil.selectQuery(dbid, 
                `SELECT post_title, post_content, post_timestamp, wallet_address
                    FROM posts
                    WHERE blog = '${currentBlog}' 
                `);
            setCurrentBlogData(query.data);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        if(currentBlog) {
            getBlogs();
        };
    }, [currentBlog, newPost, editPost]);

    useEffect(() => {
        async function getBlogRecords() {
            const dbid = kwil.getDBID("0xdB8C53Cd9be615934da491A7476f3f3288d98fEb", "blog_dapp");
            const query = await kwil.selectQuery(dbid, "SELECT count(*) FROM posts");
            setBlogRecords(query.data[0]["count(*)"]);
        }
        getBlogRecords();
    }, [newPost]);

    return(
        <div className="body-content">
            <div className="head-buttons">
                <FundingInterface
                    walletAddress={walletAddress}
                />
                <ConnectMetamask
                    walletAddress={walletAddress}
                    setWalletAddress={setWalletAddress}
                />
            </div>
            {currentBlog ?
                <>
                    {currentBlogData && currentBlogData.map((post, index) => {
                        return(
                            <PostCard
                                key={index}
                                post={post}
                                editPost={editPost}
                                setEditPost={setEditPost}
                                currentBlog={currentBlog}
                            />
                        );
                    })}
                    {!newBlog ? 
                        <NewPost
                            walletAddress={walletAddress}
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