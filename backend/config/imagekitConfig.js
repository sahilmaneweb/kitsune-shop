import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,     // from ImageKit dashboard
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,   // from ImageKit dashboard
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT  // from ImageKit dashboard
});

export default imagekit;
