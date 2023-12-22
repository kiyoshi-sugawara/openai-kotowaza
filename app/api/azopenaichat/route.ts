import { NextResponse } from "next/server";
import { generateKotowazaText } from "../../../lib/generateKotowazaText";

export async function POST(request: Request) {
  console.log("enter api/azopenaichat/route.ts")
  const { message } = await request.json();
  const data = await generateKotowazaText(message);

  return NextResponse.json(data);
}
