import { DBBuilder, Types } from "kwil";
import { useState } from "react";
import { NewBlogButton } from "../Mui-components/buttons";
import { CustomAddIcon } from "../Mui-components/icons";
import { BlogNameTextField } from "../Mui-components/textFields";
import { kwil } from "../../webKwil";
import { Web3Provider } from "@ethersproject/providers";

export default function NewBlog({ walletAddress, menuUpdate, setMenuUpdate }) {
    const [newBlog, setNewBlog] = useState(false)
    const [blogName, setBlogName] = useState("")

    async function createDatabase(name, address) {
        let db = new DBBuilder(name, address);

        let postsTable = db.newTable("posts");
        
        // Create columns
        let idColumn = postsTable.newColumn("id", Types.DataType.UUID);
        let titleColumn = postsTable.newColumn("post_title", Types.DataType.STRING);
        let contentColumn = postsTable.newColumn("post_content", Types.DataType.STRING);
        let timestampColumn = postsTable.newColumn("post_timestamp", Types.DataType.STRING);
        let walletColumn = postsTable.newColumn("wallet_address", Types.DataType.STRING);

        idColumn.addAttribute(Types.AttributeType.PRIMARY_KEY);
        titleColumn.addAttribute(Types.AttributeType.MIN_LENGTH, 7);
        titleColumn.addAttribute(Types.AttributeType.NOT_NULL);
        contentColumn.addAttribute(Types.AttributeType.NOT_NULL);
        timestampColumn.addAttribute(Types.AttributeType.NOT_NULL);
        walletColumn.addAttribute(Types.AttributeType.NOT_NULL);

        postsTable.addColumn(idColumn);
        postsTable.addColumn(titleColumn);
        postsTable.addColumn(contentColumn);
        postsTable.addColumn(timestampColumn);
        postsTable.addColumn(walletColumn);

        db.addTable(postsTable);

        //create queries
        let insertQuery = db.newQuery("add_post", postsTable.name, Types.QueryType.INSERT);

        let idParameter = insertQuery.newParameter("id", idColumn.name);
        let titleParameter = insertQuery.newParameter("post_title", titleColumn.name);
        let contentParameter = insertQuery.newParameter("post_content", contentColumn.name);
        let timestampParameter = insertQuery.newParameter("post_timestamp", timestampColumn.name);
        let walletParameter = insertQuery.newParameter("wallet_address", walletColumn.name);

        walletParameter.setStatic("");
        walletParameter.setModifier(Types.ModifierType.CALLER);

        insertQuery.addParameter(idParameter);
        insertQuery.addParameter(titleParameter);
        insertQuery.addParameter(contentParameter);
        insertQuery.addParameter(timestampParameter);
        insertQuery.addParameter(walletParameter);

        db.addQuery(insertQuery);

        let updateQuery = db.newQuery("update_post", postsTable.name, Types.QueryType.UPDATE);
        
        let contentParam = updateQuery.newParameter("posts_content", contentColumn.name);
        let updateTitleWhere = updateQuery.newWhere("where_post_title", titleColumn.name, Types.OperatorType.EQUAL);
        let updateWalletWhere = updateQuery.newWhere("where_wallet_address", walletColumn.name, Types.OperatorType.EQUAL);

        updateWalletWhere.setStatic("");
        updateWalletWhere.setModifier(Types.ModifierType.CALLER);

        updateQuery.addParameter(contentParam);
        updateQuery.addWhere(updateTitleWhere);
        updateQuery.addWhere(updateWalletWhere);

        db.addQuery(updateQuery);

        let deleteQuery = db.newQuery("delete_post", postsTable.name, Types.QueryType.DELETE);
        
        let deleteTitleWhere = deleteQuery.newWhere("where_post_title", titleColumn.name, Types.OperatorType.EQUAL);
        let deleteWalletWhere = deleteQuery.newWhere("where_wallet_address", walletColumn.name, Types.OperatorType.EQUAL);

        deleteWalletWhere.setStatic("");
        deleteWalletWhere.setModifier(Types.ModifierType.CALLER);

        deleteQuery.addWhere(deleteTitleWhere);
        deleteQuery.addWhere(deleteWalletWhere);

        db.addQuery(deleteQuery);

        //create roles
        let userRole = db.newRole("user_role");
        userRole.setDefault(true);
        userRole.addPermission(insertQuery.name);
        userRole.addPermission(updateQuery.name);
        userRole.addPermission(deleteQuery.name);

        db.addRole(userRole);

        //create index
        let titleIndex = db.newIndex("title_index", postsTable.name, Types.IndexType.BTREE);
        titleIndex.addColumn(titleColumn.name);
        db.addIndex(titleIndex);

        //get signer
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //deploy database
        let tx = db.newTx();
        tx = await kwil.prepareTx(tx, signer);
        const res = await kwil.broadcast(tx);

        console.log(res)
        setNewBlog(false)
        setMenuUpdate(menuUpdate + 1)
    }

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
                        onClick={() => createDatabase(blogName, walletAddress)}
                    >
                        Create
                    </NewBlogButton>
                </>
            }
        </div>
    )
}