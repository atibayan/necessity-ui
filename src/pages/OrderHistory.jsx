import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Stack,
  Typography,
  Button,
  styled,
  Avatar,
  Badge,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const ColorButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    cursor: "default",
  },
}));

const ColorBadge = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  lineHeight: "30px",
  textAlign: "center",
}));

const StyledStack = ({ label, value }) => {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        gap: { xs: 5, md: 0 },
        [`& > *`]: {
          "&:first-of-type": {
            fontSize: { xs: "0.9em", md: "0.9em" },
            width: { xs: "20%", md: "auto" },
          },
          fontSize: { xs: "0.9em", md: "1.1em" },
        },
      }}>
      <Typography>{label}</Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
};

const OHHeading = () => {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 0, md: 2 },
        p: 1,
        background: "rgba(215, 215, 215, 0.5)",
        justifyContent: "space-between",
        alignContent: "center",
      }}>
      <ColorButton
        variant="contained"
        size="small"
        disableElevation
        disableRipple>
        Order Received
      </ColorButton>
      <StyledStack label="Order Placed" value="Nov 23, 2022" />
      <StyledStack label="Total" value="CAD $125.00" />
      <StyledStack
        label="Shipped To"
        value="70 Ave, Surrey, British Columbia, Canada, V3S2N9"
      />
      <StyledStack label="Order Number" value="64279d2293c571fbbe1abd3e" />
    </Stack>
  );
};

const OHBody = () => {
  return (
    <Box m={1} mx={3} sx={{ flex: "1 1 300px" }}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "row" },
          gap: { xs: 2, md: 2 },
        }}>
        <Box sx={{ width: "80px", height: "80px", bgColor: "red" }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={<ColorBadge>2</ColorBadge>}>
            <Avatar
              variant="rounded"
              src="/img/1.png"
              sx={{ width: "80px", height: "80px", bgColor: "red" }}
            />
          </Badge>
        </Box>
        <Stack>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            LOREM IPSUM LOREM IPSUM
          </Typography>
          <Typography variant="body">
            Lorem ipsum lorem psum ias ajiiwhvso hvqwhgerkkia oksrea
          </Typography>
          <Typography variant="h6">CAD $ 12.99</Typography>
          {/* <Stack direction="row" gap={1} mt={1}>
            <Button variant="outlined">View Product</Button>
            <Button variant="outlined">Review</Button>
          </Stack> */}
        </Stack>
      </Stack>
    </Box>
  );
};

const OrderHistory = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) return;
    const getOrderHistory = async () => {
      const { data } = await axios.get(`${serverUrl}order/${user.sub}`);
      console.log(data);
    };
    getOrderHistory();
  }, [isAuthenticated, user]);
  return (
    <Box mt={"5vh"} mx="auto" width={"calc(200px + 50vw)"}>
      <Typography variant="h5" my={2}>
        ORDER HISTORY
      </Typography>
      <Stack direction="column">
        <OHHeading />
        <Stack sx={{ display: "flex", flexFlow: "row wrap" }}>
          <OHBody />
          <OHBody />
          <OHBody />
        </Stack>
      </Stack>
      <Stack direction="column">
        <OHHeading />
        <Stack sx={{ display: "flex", flexFlow: "row wrap" }}>
          <OHBody />
          <OHBody />
          <OHBody />
        </Stack>
      </Stack>
    </Box>
  );
};

export default OrderHistory;
