import React, { useState, useEffect } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import rentalService from "../../../service/baseSevice/rentalService";

interface MonthlyIncomeData {
  name: string;
  mileStats: number;
}

const MileChart: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<MonthlyIncomeData[]>([]);
  const today = new Date();
  const year = today.getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await rentalService.getYearlyIncome(year);
        const monthlyData: MonthlyIncomeData[] = [];
        const monthNames = [
          "Oca", "Şub", "Mar", "Nis", "May", "Haz",
          "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara",
        ];

        // Default data for all months
        for (let i = 1; i <= 12; i++) {
          const monthName = monthNames[i - 1];
          monthlyData.push({ name: monthName, mileStats: 0 });
        }

        // Fill the fetched data
        response.data.forEach(([month, income]: [number, number]) => {
          const monthName = monthNames[month - 1];
          monthlyData[month - 1] = { name: monthName, mileStats: income };
        });

        setMonthlyIncome(monthlyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [year]);

  return (
    <ResponsiveContainer  width="100%">
      <BarChart data={monthlyIncome}>
        <XAxis dataKey="name" stroke="#2884ff" />
        <Bar dataKey="mileStats" stroke="#2884ff" fill="#2884ff" barSize={30} />
        <Tooltip wrapperClassName="tooltip__style" cursor={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MileChart;
