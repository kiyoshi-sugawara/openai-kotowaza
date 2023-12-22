import { NextResponse } from "next/server";
import { generateKotowazaImage } from "../../../lib/generateKotowazaImage";

export async function POST(request: Request) {
  console.log("enter api/azopenaidalle/route.ts")
  const { message } = await request.json();
  console.log("message: " + message)
  const data = await generateKotowazaImage(message);

  console.log("api/azopenaidalle/route.ts data")
  console.log("data.url: " + data?.data[0].url)
  return NextResponse.json(data);
}
