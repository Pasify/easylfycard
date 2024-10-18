import axios from "axios";

export default async function handler() {
  try {
    const res = await axios.get("/api/hello");
    console.log(res.data);
  } catch (error) {}
}
