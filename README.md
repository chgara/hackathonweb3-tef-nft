# Gallery view

<img src="https://i.ibb.co/8d8fyBt/gallery.png" alt="Image of the repo">

An NFT viewer for collections or what wallet owns.\
This is the code part of the tutorial "Gallery-View" for the web3 Hackathon

**This web app lets you:**

-   View the nfts that other persons posses
-   View nfts owned by someone

## Online demo

You can view the proyect online at this site: [webapp](https://gallery-view-seven.vercel.app/) <small>(Online proyect is on Goerly Chain)</small>.\
To make it work put an address of the <strong>Goerly Chain</strong> and see the NFTs that it collects.

If you want to view a demostration of how it works or how to use it properly please refer to the\
hackathon academy video.

## Requeriments and installation

Frist of all you will need NodeJs and Yarn installed in a LTS version.

1. Clone the repo and install the dependencies:

```sh
git clone <thisrepo>
cd ./gallery-view
yarn install
```

2. Go to alchemy.com and [create an app](https://dashboard.alchemyapi.io/) to have key access.

    Then create a .env.local file at the root folder and put inside:\
    <small>(Note that the url env variable will determine the Ethereum chain that your proyect will use) </small>\
    **!!!Note!!!**: When writting the **API URL** you should remove everything to the rigth of **/v2/**.\
    The **URL** will define the chain that your proyect will use, for the demo to work please use Goerly.

```sh
ALCHEMY_API_KEY="youralchemykey"
ALCHEMY_API_URL="the url till the/v2/"
```

3. Run the app by just run

```sh
yarn dev # only for development mode
yarn build && yarn start # for production mode
```

## Tecnologies used

These are the tecnologies used in this repo:

-   NextJS <small>(TypeScript)</small>
-   React Dom
-   Alchemy NFTs APIs
-   Aprhodite <small> (For styling like react native)</small>

<strong>!! Important !! The key part on this proyect is under the file src/pages/api/nfts.ts.
<strong/>
