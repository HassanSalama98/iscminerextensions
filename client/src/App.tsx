import './App.css';
import React, { } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import NonConcurrentGraphDisplay from './NonConcurrentGraphDisplay';
import OrderingGraphDisplay from './OrderingGraphDisplay';
import DataSelector from './DataSelector';

function App() {
    const [currentTabIndex, setCurrenTabIndex] = React.useState(1);

    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrenTabIndex(newValue);
    };

    const openSidebar = (event: React.SyntheticEvent) => {
        setSidebarOpen(!sidebarOpen);
    };

    const marginLeft = !sidebarOpen ? 0 : (document.querySelector('#drawer')?.children[0].clientWidth ?? 0);

    return (
        <>
            <AppBar position="fixed" elevation={1} style={{ backgroundColor: "white" }} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        onClick={openSidebar}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Tabs value={currentTabIndex} onChange={handleChange}  >
                        <Tab
                            value={1}
                            label="Ordering Graph"
                            component={Link}
                            to="/ordering"
                            style={{ flexGrow: 1 }}
                        />
                        <Tab
                            value={2}
                            label={"Non Concurrent Graph"}
                            component={Link}
                            to="/nonconcurrent"
                        />
                    </Tabs>
                </Toolbar>
            </AppBar>

            <Toolbar />

            <Switch>
                {/* TODO remove later */}
                <Route path="/test">
                    <DataSelector />
                </Route>
                <Route path="/nonconcurrent">
                    <NonConcurrentGraphDisplay sidebarOpen={sidebarOpen} marginLeft={marginLeft} />
                </Route>
                <Route path="/">
                    <OrderingGraphDisplay sidebarOpen={sidebarOpen} marginLeft={marginLeft}/>
                </Route>
            </Switch>
        </>
    );
}

export default App;
