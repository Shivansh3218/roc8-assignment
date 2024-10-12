// src/api.js
import axios from "axios";

const API_URL =
  "https://script.googleusercontent.com/macros/echo?user_content_key=Ln3mLlPOopijQCVR6yi7l73S4-vlaUI91Y7KymlN94s3Gr0fA6PtuGssiq9IhjzTJ3lEc1txc7Fs6wqpVwRw1xOK-_WGBPU9m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDDBqh4RKwIKS3Y-MRAS0CAYGsVL2MLEezu_eatmKncqTwtesZyNg1Km_rgNnLCRMQN0ylXlaVY-qiS6LnmzYZHgjk6xxxoOCQ";

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
