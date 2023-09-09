import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from "react";

function createData(
  id: string,
  age: number,
  gender: string,
  data_usage: string,
  voice_usage: string,
  roaming_usage: string,
  smart_phone: string,
  operating: string,
  geographic: string,
  billing_type: string,
  
  plan_tier: string,
  usage_price: string,
  customer_type: string,
  accessibility_needs: string,
  

) {
  return { id, age, gender, data_usage, voice_usage,id, roaming_usage, smart_phone, operating, geographic, billing_type, plan_tier, usage_price, customer_type, accessibility_needs};
}


const rows = [
  createData('001', 25,"Male","Moderate Data User","Frequent Caller","Domestic Traveler","iPhone 12","iOS","Urban","Postpaid","Premium Plan","Balanced Data & Calls","Long-Term","Sports Enthusiast",  ),
  createData('002', 29,"FeMale","Heavy Data User","Text-Heavy User","International Traveler","iPhone 14","iOS","Suburban","Prepain","Basic Plan","Balanced Data & Calls","Short-Term","Movie Streamer",  ),

  createData('003', 35,"Female","Moderate Data User","Frequent Caller","International Traveler","Android","16.1","Urban","Postpaid","Premium Plan","Balanced Data & Calls","Long-Term","News Reader",  ),
  createData('004', 39,"FeMale","Moderate Data User","Text-Heavy User","International Traveler","Android","15.","Suburban","Prepain","Basic Plan","Balanced Data & Calls","Short-Term","TV Shows and Dramas",  ),

  createData('005', 45,"Male","Heavy Data User","Frequent Caller","Domestic Traveler","iPhone 13","iOS","Urban","Postpaid","Premium Plan","Balanced Data & Calls","Long-Term","YouTube and Streaming",  ),
  createData('006', 49,"Male","Heavy Data User","Text-Heavy User","Domestic Traveler","iPhone 14","iOS","Suburban","Prepain","Basic Plan","Balanced Data & Calls","Short-Term","Gaming",  ),

];


export default function Analytics() {

  const [showAnalytics, setshowAnalytics] = React.useState(false);
  const [userportfolio,setuserport]=React.useState({
    chart: {
        plotBackgroundColor: 'white',
        backgroundColor: 'white',

        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Top shares of user by holding',
        style: {
            color: 'white',
            fontWeight: 'bold'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'User Analytics',
        colorByPoint: true,
        data: [
        {
            name: 'Video Streaming and Vlogs',
            y: 34.77
        },  {
            name: 'Email and Text Messaging',
            y: 14.86
        }, {
            name: 'Music Streaming and Podcasts',
            y: 22.63
        }, {
            name: 'Mobile Gaming and Streaming',
            y: 11.53
        },  {
            name: 'Social Media and Video Clips',
            y: 22.6
        }]
    }]
})

  return (
    
    <TableContainer component={Paper}>
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square style={{paddingTop:'7%',paddingBottom:'3%',overflowY:'hidden'}}>
      <img  style={{width:'20%'}}src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Rakuten_Global_Brand_Logo.svg/2560px-Rakuten_Global_Brand_Logo.svg.png"></img>
      </Grid>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Data Usage</TableCell>
            <TableCell align="right">Voice Usage</TableCell>

            <TableCell align="right">Roaming Usage</TableCell>
            {/* <TableCell align="right">Smartphone Model</TableCell>
            <TableCell align="right">Operating System</TableCell> */}
            <TableCell align="right">Geographic Location</TableCell>

            <TableCell align="right">Billing Type</TableCell>
            <TableCell align="right">Plan Tier</TableCell>
            {/* <TableCell align="right">Usage Preferences</TableCell> */}
            <TableCell align="right">Content</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.data_usage}</TableCell>
              <TableCell align="right">{row.voice_usage}</TableCell>


              <TableCell align="right">{row.roaming_usage}</TableCell>
              {/* <TableCell align="right">{row.smart_phone}</TableCell>
              <TableCell align="right">{row.operating}</TableCell> */}
              <TableCell align="right">{row.geographic}</TableCell>

              <TableCell align="right">{row.billing_type}</TableCell>
              <TableCell align="right">{row.plan_tier}</TableCell>
              {/* <TableCell align="right">{row.usage_price}</TableCell> */}

              <TableCell align="right">{row.accessibility_needs}</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid item container lg={4} sm={4} md={4} style={{padding:'10px'}}>

<Button
      type="submit"
      variant="contained"
      color="primary"
      onClick={(e)=>setshowAnalytics(true)}
    >
      <b>Perform Analytics</b>

    </Button>

</Grid>
{showAnalytics && <Grid lg={12} md={12} sm={12}>
              <Grid item container lg={12} md={12} sm={12} style={{marginLeft:'30%'}}>
              <HighchartsReact highcharts={Highcharts} options={userportfolio} />
              </Grid>
            
                </Grid>}

    </TableContainer>
   
  );
}