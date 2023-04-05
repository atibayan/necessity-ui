// import { useShoppingCart } from "../context/ShoppingCartContext";
// import { Box, Typography, Stack } from "@mui/material";
// import styled from "styled-components";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import { useParams } from "react-router-dom";

// const ProductScreen = () => {
//   const { products } = useShoppingCart();

//   const routeParams = useParams();
//   const selected = products.find((item) => item._id === routeParams.id);
//   console.log(selected);
//   return (
//     <Box sx={{ width: "70%", mx: "auto", mt: "5vh" }}>
//       {selected ? (
//         <Stack
//           gap={5}
//           sx={{
//             display: "flex",
//             flexDirection: {
//               xs: "column",
//               md: "row",
//             },
//           }}>
//           <Box sx={{ flexGrow: 1, width: 1 }}>
//             <img
//               src={selected.images[0]?.signedImage}
//               alt={selected.images[0]?.signedImage}
//               style={{
//                 width: "100%",
//                 aspectRatio: 1 / 1,
//                 objectFit: "cover",
//               }}
//             />
//           </Box>

//           <Box sx={{ flexGrow: 1, width: 1 }}>
//             <Typography variant="h3" p={1}>
//               {selected.name}
//             </Typography>
//             <Typography p={1}>
//               Product Description: {selected.description}
//             </Typography>
//             <Typography p={1}>Product ID: {selected._id}</Typography>
//             <Typography variant="h6" p={1}>
//               Price: CAD ${(selected.price * 1).toFixed(2)}
//             </Typography>
//             <AddContainer>
//               <AmountContainer>
//                 <RemoveIcon />
//                 <Amount>1</Amount>
//                 <AddIcon />
//               </AmountContainer>
//               <Button>ADD TO CART</Button>
//             </AddContainer>
//           </Box>
//         </Stack>
//       ) : null}
//     </Box>
//   );
// };

// const AddContainer = styled.div`
//   display: flex;
//   align-items: center;
//   width: 50%;
//   justify-content: space-between;
//   margin-top: 20px;
// `;
// const AmountContainer = styled.div`
//   display: flex;
//   align-items: center;
//   font-weight: 700;
// `;

// const Amount = styled.option`
//   width: 30px;
//   height: 30px;
//   border-radius: 10px;
//   border: 1px solid teal;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0px 2px;
// `;
// const Button = styled.button`
//   padding: 15px;
//   border: 2px solid teal;
//   background-color: white;
//   pointer: cursor;
//   font-weight: 500;
// `;

// export default ProductScreen;


import { useShoppingCart } from "../context/ShoppingCartContext";
import { Box, Typography, Stack } from "@mui/material";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductScreen = () => {
  const { products } = useShoppingCart();

  const routeParams = useParams();
  const selected = products.find((item) => item._id === routeParams.id);
  console.log(selected);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };
  

  return (
    <Box sx={{ width: "70%", mx: "auto", mt: "5vh" }}>
      {selected ? (
        <Stack
          gap={5}
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          <Box sx={{ flexGrow: 1, width: 0.4, padding: '30px'}}>
            <Slider {...settings}>
              {selected.images.map((image, index) => (
                <img
                  key={index}
                  src={image.signedImage}
                  alt={image.signedImage}
                  style={{
                    width: "30% !important",
                    aspectRatio: 1 / 1,
                    objectFit: "cover",
                  }}
                />
              ))}
            </Slider>
          </Box>

          <Box sx={{ flexGrow: 1, width: 1 }}>
            <Typography variant="h3" p={1}>
              {selected.name}
            </Typography>
            <Typography p={1}>
              Product Description: {selected.description}
            </Typography>
            <Typography p={1}>Product ID: {selected._id}</Typography>
            <Typography variant="h6" p={1}>
              Price: CAD ${(selected.price * 1).toFixed(2)}
            </Typography>
            <AddContainer>
              <AmountContainer>
                <RemoveIcon />
                <Amount>1</Amount>
                <AddIcon />
              </AmountContainer>
              <Button>ADD TO CART</Button>
            </AddContainer>
          </Box>
        </Stack>
      ) : null}
    </Box>
  );
};

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  margin-top: 20px;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.option`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 2px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  pointer: cursor;
  font-weight: 500;
`;

export default ProductScreen;
