import styled from "@emotion/styled";
import { TextField } from "@mui/material";


export const BlogNameTextField = styled(TextField)({
    width: "158px",
    height: "35px",
    display: "flex",
    marginBottom: "10px",
    input: {
        padding: "1px 3px",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        fontSize: "13px",
        lineHeight: "15px",
        fontFamily: "Avenir",
        color: "#000",
        borderRadius: "2px",
        height: "35px",
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: "2px",
        '&:hover fieldset': {
            borderColor: '#52537B', // change border color when hovered
        },
        '&.Mui-focused fieldset': {
            border: "none",
            borderBottom: '1px solid #09133F', // change border color when focused
        },
    },
})

export const AmountInput = styled(TextField)({
    height: "16px",
    border: "none",
    input: {
        padding: "2px 6px 2px 6px",
        backgroundColor: "rgba(124, 124, 124, 0.5)",
        fontFamily: "Avenir",
        fontSize: "14px",
        color: "#000000de",
        height: "16px"
     
    },
    "& fieldset": {
        border: "none",
        borderBottom: "1px solid rgba(255, 255, 255, 0.42)"
    },
    margin: "0px 15px 10px 15px"
})

export const BlogTitleInput = styled(TextField)({
    width: "calc(100% - 36px)",
    hieght: "45px",
    margin: "18px auto 0px 18px",
    input: {
        padding: "2px 6px 2px 6px",
        backgroundColor: "rgba(124, 124, 124, 0.5)",
        fontFamily: "Avenir",
        fontSize: "18px",
        color: "#000",
        height: "45px"
    },
})

export const BlogContentInput = styled(TextField)({
    width: "calc(100% - 36px)",
    hieght: "45px",
    margin: "11px auto 0px 18px",
    input: {
        padding: "2px 6px 2px 6px",
        backgroundColor: "rgba(124, 124, 124, 0.5)",
        fontFamily: "Avenir",
        fontSize: "14px",
        color: "#000",
        height: "45px"
    },
})