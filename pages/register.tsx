import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Input,
  Card,
  Text,
  Container,
  Button,
  Grid,
  Spacer,
} from "@nextui-org/react";
const axios = require("axios").default;

export default function Register(props) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (event) => {
    event.preventDefault();

    const data = {
      name: name,
      username: username,
      email: email,
      password: password,
    };

    await axios.post("/api/register", data);
    signIn("credentials", {
      username,
      password,
      callbackUrl: `${window.location.origin}/home`,
      redirect: false,
    })
      .then(function (result) {
        router.push(result.url);
      })
      .catch((err) => {
        alert("Failed to register: " + err.toString());
      });
  };

  return (
    <>
      <Card variant="bordered">
        <Card.Header>
          <Text h2>Register</Text>
        </Card.Header>
        <Card.Body>
          <form onSubmit={registerUser}>
            <Grid alignItems="center">
              <Input
                bordered
                label="Your Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Spacer />

              <Input
                bordered
                label="username"
                labelLeft="audit.law/"
                placeholder="lottie"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Spacer />

              <Input
                bordered
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Spacer />
              <Input
                label="Password"
                bordered
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Spacer />

              <Button type="submit" bordered color="gradient" auto>
                Register User
              </Button>
            </Grid>
          </form>
        </Card.Body>
        <Card.Divider />

        <Card.Footer>
          <Link href="/register">New here? Sign up instead</Link>
        </Card.Footer>
      </Card>
    </>
  );
}
