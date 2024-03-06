import { useState } from "react";
import { NewBlogButton } from "../../utils/Mui-components/buttons";
import { CustomAddIcon } from "../../utils/Mui-components/icons";
import { BlogNameTextField } from "../../utils/Mui-components/textFields";
import { kwil } from "../../webKwil";

export default function NewBlog({ kwilSigner, menuUpdate, setMenuUpdate, blogs }) {
    const [newBlog, setNewBlog] = useState(false)
    const [blogName, setBlogName] = useState("")

    async function createBlog(name, blogs, kSigner) {
        if (!name) {
            window.alert("Please enter a blog name");
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
                action: "add_blog",
                inputs: [{
                    $id: blogs.length + 1,
                    $name: name
                }],
                description: "Sign to create new blog!"
            }, kSigner, true);
            
            // log the result
            console.log(res);

            // reset the blog name and set new blog to false
            setNewBlog(false);
            setMenuUpdate(menuUpdate + 1);
        } catch (error) {
            console.log(error);
            setNewBlog(false);
        }
    };

    return(
        <div className="new-blog">
            {!newBlog ? 
                <NewBlogButton
                    endIcon={<CustomAddIcon />} 
                    onClick={() => setNewBlog(true)}
                >
                    New Blog
                </NewBlogButton> :
                <>
                    <BlogNameTextField 
                        value={blogName}
                        onChange={(e) => setBlogName(e.target.value)}
                        placeholder="Blog Name"
                    />
                    <NewBlogButton
                        onClick={() => createBlog(blogName, blogs, kwilSigner)}
                    >
                        Create
                    </NewBlogButton>
                </>
            }
        </div>
    );
};