import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FunctionComponent } from 'react';
import UploadButton from './Buttons/UploadButton';
import React from 'react';


type SidebarProps = {
    open: boolean;
    selectDatasource: (uploadType: number) => void;
};

const Sidebar: FunctionComponent<SidebarProps> = ({ children, open, selectDatasource }) => {
    const [uploadType, setUploadType] = React.useState(-1);

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            id='drawer'
            style={{ position: 'relative' }} // 172, 200
            className='drawer'
            classes={{
                paper: 'drawer',
            }}
        >
            <Toolbar />
            {children}
            <Button variant={uploadType === 1 ? "contained" : "text"} onClick={() => {selectDatasource(1); setUploadType(1);}}>Manufacturing</Button>
            <Button variant={uploadType === 2 ? "contained" : "text"} onClick={() => { selectDatasource(2); setUploadType(2);}}>Printer</Button>
            <UploadButton displayResult={() => selectDatasource(0)} />
        </Drawer>
    );
}

export default Sidebar;

