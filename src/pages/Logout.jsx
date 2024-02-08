import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button as MuiButton,
  TextField,
  Icon,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "../styles/GESTOGESTORREGISTRO.css";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('accessToken');

    

    
    onLogout();

    
    navigate('/inicio');
  };

 
    
    const [datePickerDateTimePickerValue, setDatePickerDateTimePickerValue] =
    useState(null);
 

return (
  <div>
    <h1>Log out</h1>
    <button onClick={handleLogout}>Cerrar Sesión</button>
  </div>
);
};
 

export default Logout;

