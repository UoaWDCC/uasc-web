import logo from "../assets/2023_logo1-768x262-uasc.png";
import { Typography } from "@mui/material";

const Home = () => {
	return (
		<div>
			<img src={logo} alt="uasc-logo-large" />
			<Typography
				variant="h1"
				sx={{
					textTransform: "uppercase",
					fontWeight: "bold	",
					color: "white",
				}}
			>
				University of Auckland Snowsports Club
			</Typography>
		</div>
	);
};

export default Home;
