import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import { CircularProgress } from '@mui/material';

export const CustomAddIcon = styled(AddIcon)({
    color: "white",
});

export const CustomLoader = styled(CircularProgress)({
    maxHeight: "20px",
    maxWidth: "20px",
    margin: "0 6px"
});
