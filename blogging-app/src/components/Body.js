import { useEffect, useState } from "react";
import { kwil } from "../webKwil";
import ConnectMetamask from "./body-components/ConnectMetamask";
import FundingInterface from "./body-components/FundingInterface";
import NewPost from "./body-components/NewPost";
import PostCard from "./body-components/PostCard";
import { NewPostButton } from "./Mui-components/buttons";


export default function Body({ walletAddress, setWalletAddress, currentBlog }) {
    const [currentBlogData, setCurrentBlogData] = useState(null)
    const [newPost, setNewPost] = useState(0)
    const [editPost, setEditPost] = useState(0)
    const [newBlog, setNewBlog] = useState(true)
    const [dbIdentifier, setDbIdentifier] = useState(null)
    
    async function getBlogs() {
        const dbi = (await kwil.selectDatabase(walletAddress, currentBlog))
        const dbid = dbi.DBID

        setDbIdentifier(dbi)

        try {
            const query = await kwil.graphql(`query loadPosts {
                ${dbid}_posts {
                    post_title,
                    post_content,
                    post_timestamp,
                    wallet_address
                }}
            `)
            const allPosts = query.data[`${dbid}_posts`]
            setCurrentBlogData(query.data[`${dbid}_posts`])
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        if(currentBlog) {
            getBlogs()
        }
    }, [currentBlog, newPost, editPost])

    console.log(currentBlogData)


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
                                dbIdentifier={dbIdentifier}
                            />
                        )
                    })}
                    {!newBlog ? 
                        <NewPost
                            walletAddress={walletAddress}
                            currentBlog={currentBlog}
                            newPost={newPost}
                            setNewPost={setNewPost}
                            setNewBlog={setNewBlog}
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
    )
}