import React, { useState, useEffect } from 'react';
import { Web3Storage } from 'web3.storage';
import Details from './Details';
import './App.css';


function App() {
  const [file, setFile] = useState(null);
  const [web3Storage, setWeb3Storage] = useState(null);
  const [cid, setCid] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageDetails, setImageDetails] = useState({
    imageName: '', // Initialize imageName as an empty string
    description: '',
    rarity: '',
  });

  // Initialize web3.storage when the component mounts
  useEffect(() => {
    const client = new Web3Storage({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGY4YzYwMkM5MGEwMzA1Y2Y1YjEzMkZBMjRjMjFENTUxNkI5YTNFMTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTY0ODg1NjkwMTAsIm5hbWUiOiJ0ZXN0In0.U9l4dBkqxYFimSK_PGZNKRXL_uvFYGG8SDw8Z6Ekdpg', // Replace with your Web3.Storage API key
    });
    setWeb3Storage(client);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check if a file is selected
    if (selectedFile) {
      // Access the file name from the File object
      const imageName = selectedFile.name;

      // Update the imageDetails state with the extracted image name
      setImageDetails({
        ...imageDetails,
        imageName: imageName,
      });

      setFile(selectedFile); // Set the selected file in the state
    }
  };

  const handleImageDetailsChange = (e) => {
    const { name, value } = e.target;
    setImageDetails({
      ...imageDetails,
      [name]: value,
    });
  };

  const uploadToWeb3Storage = async () => {
    if (!web3Storage || !file) {
      return;
    }

    try {
      setUploading(true);

      const  cid = await web3Storage.put([file]);
      console.log(cid);
      setCid(cid);
    } catch (error) {
      console.error('Error uploading to web3.storage:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='App'>
      <h1>Image Metadata Generation</h1>
      
      <div>
        <label htmlFor="imageName">Image Name:</label>
        <input
          type="text"
          id="imageName"
          name="imageName"
          value={imageDetails.imageName}
          onChange={handleImageDetailsChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={imageDetails.description}
          onChange={handleImageDetailsChange}
        />
      </div>
      <div>
        <label htmlFor="rarity">Rarity:</label>
        <input
          type="text"
          id="rarity"
          name="rarity"
          value={imageDetails.rarity}
          onChange={handleImageDetailsChange}
        />
      </div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadToWeb3Storage} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload to Web3.Storage'}
      </button>
      {cid && (
        <Details
          imageDetails={imageDetails}
          cid={cid}
        />
      )}
    </div>
  );
}

export default App;
