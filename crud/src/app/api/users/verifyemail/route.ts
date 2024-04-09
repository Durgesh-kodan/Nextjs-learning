import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user =  await User.findOne({verifyToken:token , verifyTokenExpiry : {$gt : Date.now()}})
    if(!user){
        return NextResponse.json({error: "user not found"} , {status:400})
    }

    console.log(user)

    user.isVerified = true;
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined

    await user.save()

    return NextResponse.json({message:"email verified sucessfully" , success : true} , {status:500})


  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
