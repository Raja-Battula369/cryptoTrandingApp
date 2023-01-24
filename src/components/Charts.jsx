
import {Line} from "react-chartjs-2";
import {Chart as ChartJs,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from "chart.js"

ChartJs.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

const Charts = ({arr=[],currency,days}) => {
    const prices=[];
    const date=[];
    for (let index = 0; index < arr.length; index++) {
        prices.push(arr[index][1]);
        if (days==="24h") date.push(new Date(arr[index][0]).toLocaleTimeString());
        else date.push(new Date(arr[index][0]).toLocaleDateString());
        
    };
    const data={labels:date,
                datasets:[{
                    label: `Price in ${currency}`,
                    data:prices,
                    borderColor:"rgb(255,99,132)",
                    backgroundColor:"rgb(255,99,132,0.6)"
        }]};
  return (
    <Line options={{responsive:true}}
    data={data} />
  )
}

export default Charts
