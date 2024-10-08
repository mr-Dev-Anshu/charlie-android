import axios from "axios";

export const uploadFilesToS3 = async (files, id = 12) => {
  try {
    for (const file of files) {
      const fileName = file.fileName + Date.now();
      // Step 1: Get the pre-signed URL for the current file
      const response = await fetch(
        "https://trakies-backend.onrender.com/api/putObject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName, contentType: file?.mimeType }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get the pre-signed URL for " + file.fileName);
      }

      const result = await response.json();
      const presignedUrl = result;
      console.log(`Pre-signed URL for ${file.fileName}: `, presignedUrl);

      // Step 2: Upload the file to the pre-signed URL
      const uploadResponse = await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file?.mimeType
        },
      });

      console.log(`File ${file.fileName} uploaded successfully, ${uploadResponse}`);

      if (uploadResponse.status === 200) {
        // Step 3: Store the file's URL in the database
        const newImage = await axios.post(
          "https://trakies-backend.onrender.com/api/image/create-image",
          {
            id,
            url:
              "https://s3.ap-south-1.amazonaws.com/sanathana.sarthi/uploads/" +
              fileName,
          }
        );
        console.log(`Image entry for ${file.fileName} created in DB: `, newImage);
      }
    }
  } catch (error) {
    console.log("Error while uploading files ", error);
  }
};
