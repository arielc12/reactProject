import { Container, Typography } from "@mui/material";
import React from "react";
import PageHeader from "../components/PageHeader";
import { useTheme } from "@emotion/react";

export default function AboutPage() {
  const theme = useTheme();
  return (
    <Container>
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />
      <Container
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Container
          sx={{
            color: theme.palette.mode === "dark" ? "white" : "black",
            flex: 1,
            mr: 2,
          }}
        >
          <Typography variant="h6">About BCard</Typography>
          <Typography variant="body1" paragraph>
            Welcome to BCard, the ultimate platform for connecting businesses and individuals through professional business cards. Our mission is to make networking seamless and efficient by providing a space where users can showcase their business information and connect with others.
          </Typography>
          <Typography variant="body1" paragraph>
            Whether you’re a business owner looking to create and manage your digital business cards, or an individual seeking to discover and engage with businesses, our platform has you covered. With BCard, you can:
          </Typography>
          <Typography variant="body1" component="ul">
            <li>Create and Manage Cards: Easily create, edit, and showcase your business cards to reach a wider audience.</li>
            <li>Discover and Connect: Explore a diverse range of business cards and connect with professionals across various industries.</li>
            <li>Like and Save: Keep track of the businesses and services you’re interested in by liking and saving your favorite cards.</li>
            <li>Secure and User-Friendly: Register, log in, and log out securely with our user-friendly interface that keeps your information safe.</li>
          </Typography>
          <Typography variant="body1" paragraph>
            Our goal is to provide a straightforward, user-centric experience that enhances how you connect and interact with others in the business world. Join our growing community and start building your professional network today!
          </Typography>
        </Container>
        <Container sx={{ flex: 1 }}>
          <img
            src="/images/card.png"
            alt="Card"
            style={{ width: "100%", maxWidth: 400 }}
          />
        </Container>
      </Container>
    </Container>
  );
}