# Kwil ERC20 Extension Demo

This repository provides a sample Kwil Extension that can be used with any ERC20 contract.

## Full tutorial
A full video tutorial walking through this repository can be found [here](https://www.youtube.com/watch?v=yRek7O5h7qM&t=2s).

<iframe width="560" height="315" src="https://www.youtube.com/embed/yRek7O5h7qM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## QuickStart

### Step 1 - Install

Run `npm install`.

### Step 2 - Build Docker Image

Run `docker build -t erc20extension .`.

### Step 3 - Open Extension Deployment Repository

Clone and open this [repository](https://github.com/kwilteam/extension-deployment-template).

### Step 4 - Change Docker Compose File

In the extension deployment repository, change the docker compose file to use the erc20extension docker image.

```yaml
  extension-1:
-   image: <your-extension-here>
+   image: erc20extension
    ports:
      - 50055:50051
    restart: on-failure

```

### Step 5 - Start Containers

Within the extension deployment repository, run `make downloand-and-run`.

Once the container starts, your local kwil node with the ERC20 extension will be available at `http://localhost:8080`.
