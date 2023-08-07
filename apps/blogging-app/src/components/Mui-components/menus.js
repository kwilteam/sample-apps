import styled from "@emotion/styled";
import { MenuItem, Select } from "@mui/material";

export const CustomSelect = styled(Select)({
    color: "#E0E0E0",
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: "14px",
    background: "rgba(51, 51, 51, 0.5)",
    border: "0.5px solid #FCFCFC",
    width: "167px",
    height: "36px",
});

export const CustomMenuItem = styled(MenuItem)({
    color: "#000",
    fontFamily: "Avenir"
});
