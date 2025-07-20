import axios from "axios";

const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET); // Using VITE environment variable for upload preset
    
    // Cloudinary API URL (also using VITE environment variable for cloud name)
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, 
      formData
    );

    // Return the URL of the uploaded image
    return { imageUrl: response.data.secure_url };
  } catch (error) {
    console.error("Error Uploading the image:", error);
    return { imageUrl: null };
  }
};

export default uploadImage;
