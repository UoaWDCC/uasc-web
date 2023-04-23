import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import app from "../firebase";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const Event = (props) => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    const user = app.auth().currentUser;
    if (user) {
      navigate(`/events/${props.id}/signup`);
    } else {
      navigate("/login");
    }
  };

  return (
    <Card>
      <CardHeader title={props.title} subheader={props.date} />
      {props.img && (
        <CardMedia
          component="img"
          image={props.img}
          alt={props.title}
          style={{
            height: "200px",
            width: "200px",
          }}
        />
      )}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.desc}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleSignUp}>
          Sign Up
        </Button>
      </CardContent>
    </Card>
  );
};

export default Event;
