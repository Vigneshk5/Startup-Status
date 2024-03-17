import React from "react";
import ExpenseList from "../components/ExpenseList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import Profit from "../components/Profit";
import AnnualReport from "../components/AnnualReport";
import DailyData from "../components/DailyData";

const Finance = () => {
  return (
    <div>
      <DailyData />
      <Tabs defaultValue="account" className="w-[100%]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="Expense">Expense Description</TabsTrigger>
          <TabsTrigger value="Profit">Earning Description</TabsTrigger>
          <TabsTrigger value="Annual">Annual Report</TabsTrigger>
        </TabsList>
        <TabsContent value="Expense">
          <ExpenseList />
        </TabsContent>
        <TabsContent value="Profit">
          <Profit />
        </TabsContent>
        <TabsContent value="Annual">
          <AnnualReport />
        </TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
    </div>
  );
};

export default Finance;
