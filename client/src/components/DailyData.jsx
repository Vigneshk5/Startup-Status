import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DailyData = () => {
  const [dailyProfitLoss, setDailyProfitLoss] = useState([]);

  useEffect(() => {
    const fetchDailyProfitLoss = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/daily-profit-loss`);
        setDailyProfitLoss(res.data);
      } catch (error) {
        console.error("Error fetching daily profit and loss data:", error);
      }
    };

    fetchDailyProfitLoss();
  }, []);

  return (
    <div>
      <h2>Daily Profit and Loss</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={dailyProfitLoss}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis domain={[-5000, 5000]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="profit_left" fill="#FA940C" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyData;
