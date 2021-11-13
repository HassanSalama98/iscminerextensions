import { Input, Button } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';


type UploadButtonProps = {
    displayResult: () => void;
};

const UploadButton = ({ displayResult }: UploadButtonProps) => {
    const handleUpload = (event: any) => {
        const data = new FormData();
        for (const file of event.target.files)
            data.append('file', file, file.name);

        fetch('/upload', {
            method: 'POST',
            body: data,
        }).then(response =>
            displayResult()
        );
    };

    return (
        <label htmlFor="contained-button-file">
            <Input inputProps={{ accept: ".xes", multiple: true }} onChange={handleUpload} id="contained-button-file" type="file" hidden style={{ display: "none" }} />
            <Button component="span">
                Upload Files <FileUploadIcon />
            </Button>
        </label>
    );
}

export default UploadButton;