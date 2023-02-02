/**
 * TODO: Remove API Key
 */

import { useState, useEffect } from "react";
import axios from "axios";
import { ErrorBody, ErrorWrapper } from "./ErrorStyles";
import { Text } from "../typography/Text";
import { Button } from "../button/Button";
import useMode from "../../hooks/useMode";

const GIPHY_API_KEY = "3ZQfiWhWQr3PD6ZCmXYmkNyqEV2EI8Yg";

const ErrorComponent = () => {
  const { mode } = useMode();
  const [gif, setGif] = useState<string>();

  useEffect(() => {
    const controller = new AbortController();
    const fetchGif = async () => {
      const { data } = await axios.get(
        `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=oops&rating=g`,
      );
      setGif(data.data.images.original.url);
    };
    fetchGif();
    return () => controller.abort();
  }, []);
  return (
    <ErrorWrapper mode={mode}>
      <ErrorBody>
        <img src={gif} alt="Error Occurred" />
        <Text as="h1" variant="h2">
          Oops!
        </Text>
        <Text variant="h3">Looks like something went wrong...</Text>
        <Button>Let&apos;s go home instead!</Button>
      </ErrorBody>
    </ErrorWrapper>
  );
};

export default ErrorComponent;
