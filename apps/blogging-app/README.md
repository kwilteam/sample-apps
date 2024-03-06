# Kwil Blogging App

A sample blogging application built with Kwil!

## How to use this tutorial

This tutorial shows how to use the `@kwilteam/kwil-js` package through a simple blogging application.

### Pre-requisites

This tutorial assumes you have a basic understanding of:

-   [How to run a Kwil node](https://docs.kwil.com/docs/node/quickstart)
-   [How to use the Kwil CLI](https://docs.kwil.com/docs/kwil-cli/installation)
-   [How to use Kuneiform](https://docs.kwil.com/docs/kuneiform/introduction)

### Step 1: Start node and deploy database

Start kwil node:

```bash
kwild --autogen
```

Then deploy the kuneiform file [`blog_dapp.kf`](./blog_dapp.kf). Make sure to replace `YOUR_NODE_URL`, `YOUR_CHAIN_ID`, and `YOUR_PRIVATE_KEY` with your own values.

```bash
kwil-cli database deploy -p ./blog_dapp.kf --kwil-provider YOUR_NODE_URL --chain-id YOUR_CHAIN_ID --private-key YOUR_PRIVATE_KEY --sync
```

### Step 2: Start the app

```bash
npm install
npm start
```

### Step 3: Interact with the app

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

#### Set up WebKwil

Go to [`src/webKwil.js`](./src/webKwil.js) and replace `YOUR_NODE_URL` and `YOUR_CHAIN_ID` with your own values. This will allow the app to connect to your Kwil node.

#### Set up KwilSigner

Next, click the `Connect Wallet` button. This will create a `KwilSigner` to sign for transactions in the class. You can see the implementation for the `KwilSigner` in the file [`src/components/body-components/ConnectMetamask.js`](./src/components/body-components/ConnectMetamask.js).

#### Create a blog

Click the `Create Blog` button to create a blog. This will create a new blog category in the database.

You can see how the SDK executes the `add_blog` action in the file [`src/components/sideBar-components/NewBlog.js`](./src/components/sideBar-components/NewBlog.js).

#### Retrieve all blog categories

Click on the dropdown in the sidebar to see the blog category. Click on the blog category to see the posts.

This data is gathered by executing an adhoc select query on the database. You can see the implementation for this in the file [`src/components/sideBar-components/BlogMenu.js`](./src/components/sideBar-components/BlogMenu.js).

#### Create a post

Click the `Create Post` button to create a post. This will create a new post in the database.

You can see how the SDK executes the `add_post` action in the file [`src/components/body-components/NewPost.js`](./src/components/body-components/NewPost.js).

#### Retrieve all posts for a blog category

After the post is created, you will notice that the post is displayed in the main body. This data is gathered by calling the `get_posts` action on the database. You can see the implementation for this in the file [`src/components/Body.js`](./src/components/Body.js).

### Step 4: Other

You can see implementations for how to execute and delete posts in the file [`src/components/body-components/PostCard.js`](./src/components/body-components/PostCard.js).

## Learn More

You can learn about the `@kwilteam/kwil-js` package by visiting the [Kwil documentation](https://docs.kwil.com/docs/sdks/js-ts/overview).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
