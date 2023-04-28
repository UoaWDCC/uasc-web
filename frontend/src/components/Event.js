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
    user ? navigate(`/events/${props.id}/signup`) : navigate("/login");
  };

  return (
    <Card style={{ boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.2)" }}>
      <CardHeader title={props.title} subheader={props.date} />
      <CardContent>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
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
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ padding: "0 1rem 1rem 1rem" }}
          >
            {props.desc}
          </Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignUp}
          sx={{
            ":hover": {
              transform: "scale(1.1)",
              transition: "0.2s",
            },
          }}
        >
          Sign Up
        </Button>
      </CardContent>
    </Card>
  );
};

export default Event;
