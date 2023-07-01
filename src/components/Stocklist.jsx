import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

const Stocklist = () => {
    const [stock, setStock] = useState([]);

    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"])


    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            
            const responces =[]
            try {
                          const responces = await Promise.all(watchList.map((stock) => {
                    return finnHub.get("/quote"), {
                        params: {
                          symbol: stock
                      }
                  }
              }))
        
            
                console.log(responces)
                const data = responces.map((response) => {
                   return {

                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                    
                })
                console.log(data)
                if (isMounted) {
                    
                    setStock(data)
                }
            } catch (err) {
               console.log( "data not found")
                 
            }

        }
        fetchData();


        return()=>(isMounted= false)
    }, [])
    






    return <div>
        <table className="table hover mt-5">
            <thead style={{ color: "rgba(79,89,102" }}>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">Chg</th>
                    <th scope="col">Chg%</th>
                    <th scope="col">Low</th>
                    <th scope="col">Open</th>
                    <th scope="col">Close</th>
                </tr>
            </thead>
            <tbody>
                {stock.map((stockData) => {
                    return (
                        <tr className="table-row" key={stockData.symbol}>
                            <th scope="row">{stockData.symbol}</th>
                            <td>{ stockData.data.c}</td>
                            <td>{ stockData.data.d}</td>
                            <td>{ stockData.data.dp}</td>
                            <td>{ stockData.data.h}</td>
                            <td>{ stockData.data.l}</td>
                            <td>{ stockData.data.o}</td>
                            <td>{ stockData.data.pc}</td>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
    </div>


    
    
    


}

 
export default Stocklist;