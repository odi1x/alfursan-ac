import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "YOUR_PRIVATE_KEY",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "YOUR_URL_ENDPOINT"
});

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error("Error generating ImageKit auth parameters:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
