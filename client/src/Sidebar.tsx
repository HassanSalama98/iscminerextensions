import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FunctionComponent } from 'react';
import UploadButton from './Buttons/UploadButton';


type SidebarProps = {
    open: boolean;
    selectDatasource: (uploadType: number) => void;
};

const Sidebar: FunctionComponent<SidebarProps> = ({ children, open, selectDatasource }) => {
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            id='drawer'
            style={{ position: 'relative', width: "200px"}} // 172
            className='drawer'
            classes={{
                paper: 'drawer',
            }}
        >
            <Toolbar />
            {children}
            {/* <div style={{
                    display: "flex",
                    position: "fixed",
                    bottom: 0,
                    // textAlign: "center",
                    paddingBottom: 10,
                }}> */}
            <Button onClick={() => selectDatasource(1)}>Manufacturing</Button>
            <Button onClick={() => selectDatasource(2)}>Printer</Button>
            <UploadButton displayResult={() => selectDatasource(0)} />
            {/* </div> */}
        </Drawer>
    );
}

export default Sidebar;
