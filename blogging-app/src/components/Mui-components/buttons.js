import styled from "@emotion/styled";
import { Button } from "@mui/material";


export const NewBlogButton = styled(Button)({
    background: "transparent",
    color: "white",
    border: "none",
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: "16px",
    width: "128px",
    height: "35px",
    textTransform: "none",
    margin: "0px auto",
});

export const FundingButton = styled(Button)({
    minHeight: "40px",
    width: "145px",
    background: "#D9D9D9",
    margin: "14px 22px 0 auto",
    "&:hover" : {
        background: "#c2c2c2"
    },
    padding: "0",
    '& .MuiTouchRipple-root': {
        color: "#fff"
    },
    '& .MuiButton-endIcon': {
        marginLeft: 0
    },
    zIndex: 999,
    borderRadius: "5px",
    fontFamily: "Avenir",
    fontWeight: "500",
    fontSize: "14px",
    color: "#000",
    textTransform: "none",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
});

export const AddFundsButton = styled(Button)({
    background: "transparent",
    color: "black",
    border: "none",
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: "13px",
    width: "128px",
    height: "20px",
    textTransform: "none",
    margin: "0px auto",
});

export const ConnectButton = styled(Button)({
    height: "40px",
    width: "145px",
    background: "#C0E4C2",
    borderRadius: "5px",
    margin: "14px 21px 0 0",
    "&:hover" : {
        background: "#ACC9AD"
    },
    padding: "0",
    '& .MuiTouchRipple-root': {
        color: "#fff"
    },
    borderRadius: "5px",
    fontFamily: "Avenir",
    fontWeight: "500",
    fontSize: "14px",
    color: "#000",
    textTransform: "none",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    textOverflow: "ellipsis",
    overflow: "hidden",
});

export const NewPostButton = styled(Button)({
    height: "36px",
    width: "523px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    fontFamily: "Avenir",
    fontWeight: "500",
    fontSize: "16px",
    color: "#000",
    textTransform: "none",
    margin: "17px auto 33px auto",
    '&:hover' : {
        background: "#e6e6e6"
    },
})

export const EditButton = styled(Button)({
    width: "64px",
    height: "30px",
    padding: "0px",
    background: "#FFA726",
    borderRadius: "4px",
    boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
    fontFamily: "Avenir",
    fontWeight: "500",
    fontSize: "13px",
    color: "#000",
    '&:hover' : {
        background: "#ED9D28"
    },
    margin: "15px 18px 10px auto"
});

export const SubmitButton = styled(Button)({
    width: "64px",
    height: "30px",
    padding: "0px",
    background: "#66BB6A",
    borderRadius: "4px",
    boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
    fontFamily: "Avenir",
    fontWeight: "500",
    fontSize: "13px",
    color: "#000",
    '&:hover' : {
        background: "#60AA64"
    },
    margin: "15px 18px 10px auto"
});

export const DeleteButton = styled(Button)({
    width: "64px",
    height: "30px",
    padding: "0px",
    background: "#EE6055",
    borderRadius: "4px",
    boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
    fontFamily: "Avenir",
    fontWeight: "500",
    fontSize: "13px",
    color: "#000",
    '&:hover' : {
        background: "#DB584E"
    },
    margin: "15px 18px 10px auto"
});