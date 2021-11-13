import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';

enum View { Graph, Bar, Pie }

type ViewSelectorProps = {
    currentView: View;
    setCurrentView: (view: View) => void;
};

const ViewSelector = ({ currentView, setCurrentView }: ViewSelectorProps) => {
    const handleViewChange = (event: React.MouseEvent<HTMLElement>, newView: View) => {
        if (newView !== null)
            setCurrentView(newView);
    }

    // (Object.keys(View).filter(key => isNaN(Number(key))) as View[]).map(view => <ToggleButton value={view}>{view}</ToggleButton>)

    return (
        <ToggleButtonGroup
            value={currentView}
            exclusive
            onChange={handleViewChange}
            orientation="vertical"
        >
            <ToggleButton value={View.Graph} style={{width: "211px"}}>Graph</ToggleButton>
            <ToggleButton value={View.Bar}>Bar&nbsp;<BarChartIcon /></ToggleButton>
            <ToggleButton value={View.Pie}>Pie&nbsp;<PieChartIcon/></ToggleButton>
        </ToggleButtonGroup>
    );
}

export default ViewSelector;
