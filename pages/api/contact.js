import axios from "axios";
export default async function hanlder(req, res) {
  if (req.method === "POST") {
    try {
      const apiToken = process.env.MAILSENDER_SCRIPT_TOKEN;
      const apiId = process.env.GS_API_DEPLOYMENT_ID;
      const apiUrl =
        "https://script.google.com/macros/s/" +
        apiId +
        "/exec?token=" +
        apiToken;
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://script.google.com",
        },
      };
      const postData = req.body;
      const dataFetch = await axios.post(apiUrl, postData, axiosConfig);
      res.status(201).json(dataFetch.data);
    } catch (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
  }
}
