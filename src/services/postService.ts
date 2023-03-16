// services
import * as tokenService from "./tokenService";

// types
import { Post } from "../types/models";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/posts`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    return res.json();
  } catch (error) {
    throw error;
  }
};

async function allPosts(): Promise<Post[]> {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    });
    return (await res.json()) as Post[];
  } catch (error) {
    throw error;
  }
}

export { index, allPosts };
