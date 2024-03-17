import "./App.css";
import Finance from "./pages/Finance";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Customers from "./pages/Customers";
import Investors from "./pages/Investors";

const App = () => {
  return (
    <div>
      <div className="flex justify-center  mb-1">
        <div className="max-w-md p-1  shadow-md">
          <p className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500 relative z-10">
            Startup Status
          </p>
        </div>
      </div>
      <Tabs defaultValue="account" className="w-[100%]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="Financial">Financial Details</TabsTrigger>
          <TabsTrigger value="Customers">Customer Details</TabsTrigger>
          <TabsTrigger value="Investors">Investors Details</TabsTrigger>
        </TabsList>
        <TabsContent value="Financial">
          <Finance />
        </TabsContent>
        <TabsContent value="Customers">
          <Customers />
        </TabsContent>
        <TabsContent value="Investors">
          <Investors />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;
