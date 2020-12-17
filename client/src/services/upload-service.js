import axios from "axios";

class UploadService {
  constructor() {
    this.service = axios.create({
      baseURL: "https://pet-adopt-ironhack.herokuapp.com/api",
      withCredentials: true,
    });
  }

  // Method to use for uploading an image
  upload = (theFile) => {
    console.log("file in service", theFile);
    return this.service
      .post("/upload", theFile)
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };
}

export default UploadService;
