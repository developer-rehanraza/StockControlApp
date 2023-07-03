
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import finnHub from "../apis/finnHub"
import { StockChart } from "../components/StockChart"
import { StockData } from "../components/StockData"
// import { wait } from "@testing-library/user-event/dist/utils"

const formatData = (data) => {
    return data.t.map((el, index)=> {
        return {
            x: el * 1000, 
            // y: data.c[index]
            y: Math.floor(data.c[index])
     }
    })
}


export const StockDetailPage = () => {
    const [chartData, setChartData] = useState()
    const { symbol } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            const date = new Date()
            const currentTime = Math.floor(date.getTime()/1000)
            // console.log(currentTime)

            let oneDay;

            if (date.getDay() === 6) {
                oneDay = currentTime - 2 * 24 * 60 * 60;
                
            }
            
            else if (date.getDay() === 0) {
                oneDay = currentTime - 3 * 24 * 60 * 60;
                
            } else {
                oneDay = currentTime - 24 * 60 * 60;
            }

            const oneWeek = currentTime - 7 * 24 * 60 * 60;
            const oneYear = currentTime - 365 * 24 * 60 * 60;
             
 
            try {
                
                const responces = await Promise.all([
                    finnHub.get("/stock/candle", {
                        params: {
                            symbol,
                            from: oneDay,
                            to: currentTime,
                            resolution: 30
                        }
                    }), finnHub.get("/stock/candle", {
                        params: {
                            symbol,
                            from: oneWeek,
                            to: currentTime,
                            resolution: 60
                        }
                    }), finnHub.get("/stock/candle", {
                        params: {
                            symbol,
                            from: oneYear,
                            to: currentTime,
                            resolution: "W"
                        }
                    })
    
                ])
                console.log(responces)
    
                setChartData({
                    day: formatData(responces[0].data),
                    week: formatData(responces[1].data),
                    year: formatData(responces[2].data)
                    
                })
                
            } catch (err) {
                console.log(err)
            }

            
        }
        fetchData()
    }, [symbol])


    return <div>
        {chartData && (
        <div>
                <StockChart chartData={chartData} symbol={symbol} />
                <StockData symbol={symbol}/>
                
        </div>
        )}
    </div>
 


} 