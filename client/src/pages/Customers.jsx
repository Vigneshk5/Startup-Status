import CustomerList from "@/components/CustomerList";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import CustomerMetadata from "@/components/CustomerMetadata";

const Customers = () => {
  return (
    <div>
      <Tabs defaultValue="account" className="w-[100%]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="CustomerList">Customer Acquiring</TabsTrigger>
          <TabsTrigger value="CustomerMetadata">Customer Metadata</TabsTrigger>
        </TabsList>
        <TabsContent value="CustomerList">
          <CustomerList />
        </TabsContent>
        <TabsContent value="CustomerMetadata">
          <CustomerMetadata />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Customers;
