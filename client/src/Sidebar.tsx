import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FunctionComponent } from 'react';


type SidebarProps = {
    open: boolean;
};

const Sidebar: FunctionComponent<SidebarProps> = ({ children, open }) => {
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            id='drawer'
            style={{ position: 'relative'}} // 172
            className='drawer'
            classes={{
                paper: 'drawer',
            }}
        >
            <Toolbar />
            {children}
        </Drawer>
    );
}

export default Sidebar;
