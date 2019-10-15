import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import styled from 'styled-components'

import OrdersList from "./components/OrdersList";
import Menu from "./components/Menu";
import DailyMenu from "./components/DailyMenu";
import CreateMenu from "./components/CreateMenu";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";



function OwnerPage() {
  const { user } = useContext(AuthContext);

  return (
    <Tabs defaultIndex={0}>
      <TabList>
        <Tab>Orders</Tab>
        <Tab>Daily Menu</Tab>
        <Tab  >Menu</Tab>
        <Tab>Create Daily Menu</Tab>
      </TabList>

      <TabPanel>
        <OrdersList />
      </TabPanel>
      <TabPanel>
        <DailyMenu user={user} />
      </TabPanel>
      <TabPanel>
        <Menu />
      </TabPanel>
      <TabPanel>
        <CreateMenu />
      </TabPanel>
    </Tabs>
  );
}
export default OwnerPage;
