"use client";
import { useState } from "react";
import { CallGPT } from "../api/get";

export default function Food() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAPIcall = async (input: string) => {
    try {
      setIsLoading(true);
      const message = await CallGPT({ prompt: input });
      setData(JSON.parse(message));
      console.log(message);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    console.log("음식 추천해줘");
    handleClickAPIcall("음식을 추천해줘");
  };

  return (
    <>
      <h1>Food</h1>
      <button onClick={handleClick}>음식을 추천해줘</button>
    </>
  );
}
