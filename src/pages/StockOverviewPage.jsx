import { AutoComplete } from "../components/AutoComplete"
import { Rehan } from "../components/Rehan";
import tradeking from "../images/tradeking.png"


export const StockOverviewPage = () => {
    return <div>
        <div className="text-center">
            <img src={tradeking} alt="" />
        </div>
        <AutoComplete />
        <Rehan />

    </div>
}