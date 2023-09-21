import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionCard(props) {

  return (
    <Card style={{ width: '100%', height:'100%'}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            
          </Typography>
          {console.log("props.personalizedEmail ",props.personalizedEmail )}
          <Typography variant="body2" color="text.secondary">
            {props.personalizedEmail && props.personalizedEmail.map((row,index)=>
            
            (
              <div>
              <div>{"Subject: "+row.Subject}</div>
              <br></br>
              <div>{"To: "+row.To}</div>
              <br></br>
              <div>{"Body: "+row.Body}</div>
              </div>
            )
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

}
