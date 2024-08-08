"use server";

import connectToDb from "@/database";
import { User } from "@/models/user";
import Joi from "joi";
const ValidateUser = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  mobilenumber: Joi.number(),
  address: Joi.string().required(),
});

export async function createUser(body: any) {
  try {
    await connectToDb();
    console.log(body);
    const dataToSend =body;
    console.log(dataToSend,"data");
    const { error } = ValidateUser.validate(dataToSend);
    if (error) {
      return {
        success: false,
        message: error?.details[0].message,
      };
    }
    const action = await User.create(dataToSend);
    if (action) {
      return {
        success: true,
        message: "User Created Successfully",
      };
    } else {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
export async function UpdateUser(body: any,id:any) {
    try {
      await connectToDb();
      const dataToSend =body;
      const { error } = ValidateUser.validate(dataToSend);
      if (error) {
        return {
          success: false,
          message: error?.details[0].message,
        };
      }
      console.log(dataToSend);
      const action = await User.updateOne({_id:id},{$set:{...dataToSend}});
      if (action) {
        return {
          success: true,
          message: "User Updated Successfully",
        };
      } else {
        return {
          success: false,
          message: "Something went wrong",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }
export async function fetchUser() {
  try {
    await connectToDb();
    const fetchedData = await User.find({});
    if (fetchedData) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(fetchedData)),
      };
    } else {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  } catch(error:any) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
export async function deleteUser(id:any) {
    try {
      await connectToDb();
      const action=await User.deleteOne({_id:id});
      if (action) {
        return {
          success: true,
          data:'User Deleted Successfully',
        };
      } else {
        return {
          success: false,
          message: "Something went wrong",
        };
      }
    } catch(error:any) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }
