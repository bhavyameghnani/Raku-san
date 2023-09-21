import * as React from 'react';
import { useState } from 'react';
import Box from "@mui/material/Box";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Grid from '@mui/material/Unstable_Grid2';
import { DataGrid } from '@mui/x-data-grid';
import ActionCard from './ActionCard';
import { TextField, Button, Container, Stack } from "@mui/material";
import axios from "axios";


const PersonalizedEmailCampaign = (props) => {

    const [personalizedEmail, setPersonalizedEmail] = useState([]);

    // const [sme_name, setSme_name] = useState("");
    // const [sme_business, setSme_business] = useState("");
    // const [sme_location, setSme_location] = useState("");
    // const [sme_USP, setSme_USP] = useState("");

    // const [cust_name, setCust_name] = useState("");
    // const [cust_last_visit, setCust_last_visit] = useState("");
    // const [cust_past_purchase, setCust_past_purchase] = useState("");
    // const [cust_dob, setCust_dob] = useState("");
    // const [cust_preferences, setcust_preferences] = useState("");
    // const [cust_email, setCust_email] = useState("");
    // const [cust_freq_of_visits, setCust_freq_of_visits] = useState("");
    // const [cust_preferred_time, setCust_preferred_time] = useState("");

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'cust_name', headerName: 'Name', width: 50 },
        { field: 'cust_last_visit', headerName: 'Last Visited', width: 100 },
        { field: 'cust_past_purchase', headerName: 'Past Purchase', width: 120 },
        {
            field: 'cust_dob',
            headerName: 'Date of Birth',
            type: 'number',
            width: 100,
        },
        {
            field: 'cust_preferences',
            headerName: 'Preferences',
            width: 100,
        },
        {
            field: 'cust_email',
            headerName: 'Email',
            width: 50,
        },
        {
            field: 'cust_freq_of_visits',
            headerName: 'Frequency of Visits',
            width: 150,
        },
        {
            field: 'cust_preferred_time',
            headerName: 'Preferred time',
            width: 120,
        },
    ];

    const rows = [
        { id: 1, cust_name: "Anil Kumar", cust_last_visit: '2023-08-25', cust_past_purchase: 'Americano and Croissant', cust_dob: "1988-02-12", cust_preferences:"Coffee", cust_email:"anil.kumar@email.com", cust_freq_of_visits: "Weekly", cust_preferred_time: "Morning"},
        { id: 2, cust_name: "Sneha Karthik", cust_last_visit: '2023-08-26', cust_past_purchase: 'Latte and Muffin', cust_dob: "2000-09-09", cust_preferences:"Bakery", cust_email:"snehakarthikpriv@gmail.com", cust_freq_of_visits: "Monthly", cust_preferred_time: "Afternoon"},
        { id: 3, cust_name: "Vishal Parab", cust_last_visit: '2023-08-25', cust_past_purchase: 'Espresso and Brownie', cust_dob: "1995-09-05", cust_preferences:"Coffee", cust_email:"vishalp902920@gmail.com", cust_freq_of_visits: "Monthly", cust_preferred_time: "Afternoon"},
        { id: 4, cust_name: "Seetha", cust_last_visit: '2023-08-25', cust_past_purchase: 'Veg Sandwich and Latte', cust_dob: "1985-11-22", cust_preferences:"Veg Items", cust_email:"seetha0712@gmail.com", cust_freq_of_visits: "Weekly", cust_preferred_time: "Evening"},
        { id: 5, cust_name: "Sonali Gupta", cust_last_visit: '2023-09-08', cust_past_purchase: 'Espresso', cust_dob: "2001-07-08", cust_preferences:"Coffee", cust_email:"sonali.sharma@email.com", cust_freq_of_visits: "Monthly", cust_preferred_time: "Morning"},
    ];

    function generatePersoanlizedEmail(sme_name, sme_business, sme_location, sme_USP, cust_name, cust_last_visit, cust_past_purchase, cust_dob, cust_preferences, cust_email, cust_freq_of_visits, cust_preferred_time) {

        const formData = new FormData();

        formData.append("sme_name", sme_name);
        formData.append("sme_business", sme_business);
        formData.append("sme_location", sme_location);
        formData.append("sme_USP", sme_USP);

        formData.append("cust_name", cust_name);
        formData.append("cust_last_visit", cust_last_visit);
        formData.append("cust_past_purchase", cust_past_purchase);
        formData.append("cust_dob", cust_dob);
        formData.append("cust_preferences", cust_preferences);
        formData.append("cust_email", cust_email);
        formData.append("cust_freq_of_visits", cust_freq_of_visits);
        formData.append("cust_preferred_time", cust_preferred_time);
    
        axios
          .post("http://10.196.221.178:5000/generatePersonalizedEmail", formData)
          .then((res) =>
          {
            setPersonalizedEmail(res.data.data)
            console.log(res.data.data)
          }    
          )
    
          .catch((err) => console.log(err));
      }

      const handleRowClick = (params) => {
        generatePersoanlizedEmail(props.sme_name, props.sme_business, props.sme_location, props.sme_USP, params.row["cust_name"], params.row["cust_last_visit"], params.row["cust_past_purchase"], params.row["cust_dob"], params.row["cust_preferences"], params.row["cust_email"], params.row["cust_freq_of_visits"], params.row["cust_preferred_time"])
      };

    return( 
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                <Grid xs={6}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            onRowClick={handleRowClick}
                        />
                    </div>
                </Grid>
                <Grid xs={6}>
                    <ActionCard
                    personalizedEmail={personalizedEmail}
                    />
                    <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                        style={{marginTop:'10px'}}
                        // onClick={(e) => setshowdashboard(false)}
                    >
                        Send Email
                    </Button>
                </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}

export default PersonalizedEmailCampaign;