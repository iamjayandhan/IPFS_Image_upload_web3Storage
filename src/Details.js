import React from 'react';
import './Details.css';

function Details({ imageDetails, cid }) {
  const redirectToIPFS = () => {
    if (cid && imageDetails.imageName) {
      const url = `https://ipfs.io/ipfs/${cid}/${imageDetails.imageName}`;
      window.open(url, '_blank'); // Open the URL in a new tab/window
    }
  };

  return (
    <div className='your-details-class'>
      {cid ? (
        <div>
          <h2>Image Details:</h2>
          <p>Image Name: {imageDetails.imageName}</p>
          <p>Description: {imageDetails.description}</p>
          <p>Rarity: {imageDetails.rarity}</p>
          <p>File CID: {cid}</p>
          <button onClick={redirectToIPFS}>
            View {imageDetails.imageName} on IPFS
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Details;
