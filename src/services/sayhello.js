import axios from "axios";

export default function handler() {
  try {
    const res = axios.get("/api/hello");
    console.log(res.data);
  } catch (error) {}
}
