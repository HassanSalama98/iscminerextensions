import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Drawer from '@mui/material/Drawer';
import Input from '@mui/material/Input';
import Toolbar from '@mui/material/Toolbar';
import { FunctionComponent, JSXElementConstructor, ReactElement, ReactNodeArray, ReactPortal } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Redirect } from 'react-router-dom';
import React from 'react';


const UploadButton = () => {
    const [uploaded, setUploaded] = React.useState(false);

    const handleUpload = (event: any) => {
        const file = event.target.files[0];
        alert(file.name);
        setUploaded(true);
    };

    if (uploaded) {
        return <Redirect to="/" />
    }

    return (
        <label htmlFor="contained-button-file" style={{ display: 'block' }}>
            <Input inputProps={{ accept: "image/*" }} onChange={handleUpload} id="contained-button-file" type="file" hidden style={{ display: "none" }} />
            <Button variant="contained" component="span">
                Upload File <FileUploadIcon />
            </Button>
        </label>
    );
}

const DataSelector = () => {
    const style = {
        border: "1px solid",
        backgroundColor: "#f5f6fe",
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        height: 'calc(100vh - 64px)', // header height 64
    };
    
    return (
        <>
            <div style={style}>
                <div>
                    <UploadButton />
                    <Button style={{ display: 'block' }}>Sample 1</Button>
                    <Button style={{ display: 'block' }}>Sample 2</Button>
                </div>
            </div>
        </>
    );
}

export default DataSelector;
