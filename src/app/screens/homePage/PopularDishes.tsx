import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover/CardCover";
import CardContent from "@mui/joy/CardContent/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles/CssVarsProvider";
import CardOverflow from "@mui/joy/CardOverflow/CardOverflow";
import JoyStack from "@mui/joy/Stack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR **/

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);

export default function PopularDishes() {
  const { popularDishes } = useSelector(popularDishesRetriever);

  // console.log("popularDishes:", popularDishes);

  return (
    <div className={"popular-dishes-frame"}>
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Dishes</Box>
          <CssVarsProvider>
            <JoyStack direction="row" className="cards-frame">
              {popularDishes.length !== 0 ? (
                popularDishes.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Card className="card" key={product._id}>
                      <CardCover>
                        <img src={imagePath} alt={product.productName} />
                      </CardCover>
                      <CardCover className="card-cover" />
                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <JoyStack
                          direction="row"
                          sx={{ justifyContent: "space-between" }}
                        >
                          <Typography
                            level="h2"
                            fontSize="lg"
                            textColor="#fff"
                            mb={1}
                          >
                            {product.productName}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "md",
                              color: "neutral.300",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            {product.productViews}
                            <VisibilityIcon
                              style={{ fontSize: 25, marginLeft: 5 }}
                            />
                          </Typography>
                        </JoyStack>
                      </CardContent>
                      <CardOverflow
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          py: 1.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid",
                          height: "60px",
                        }}
                      >
                        <Typography
                          startDecorator={<DescriptionOutlinedIcon />}
                          textColor="neutral.300"
                        >
                          {product.productDesc}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">
                  Popular products are not available!
                </Box>
              )}
            </JoyStack>
          </CssVarsProvider>
        </Stack>
      </Container>
    </div>
  );
}
