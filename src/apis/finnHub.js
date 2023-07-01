import axios from "axios";

// const TOKEN = "cc26pu2ad3icrd10orqg"
const TOKEN = "cifbabpr01qg5n3chcc0cifbabpr01qg5n3chccg"

// https://finnhub.io/api/v1/quote?symbol=AAPL&token=cifbabpr01qg5n3chcc0cifbabpr01qg5n3chccg

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
      token: TOKEN
    }
})