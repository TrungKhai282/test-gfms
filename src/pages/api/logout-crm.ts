import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/common/contants/auth.constant";
import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";

const getMessage = (code) => {
  if (code === 200) {
    return {
      message: {
        vn: "Đăng xuất thành công!",
        en: "Logged out successfully!",
      },
      description: {
        vn: "Đã thành công đăng xuất hệ thống",
        en: "Successfully logged out of the system",
      },
    };
  }

  return {
    message: {
      vn: "Đã có lỗi xảy ra!",
      en: "An error has occurred!",
    },
    description: {
      vn: "Xin lỗi vì sự bất tiện, không thể đăng nhập vào lúc này. Xin vui lòng thử lại sau",
      en: "Sorry for the inconvenience, unable to log in at this time. Something went wrong. Please try again later",
    },
  };
};
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookieConfig = {
      req,
      res,
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    };
    deleteCookie(ACCESS_TOKEN, cookieConfig);
    deleteCookie(REFRESH_TOKEN, cookieConfig);

    res.status(200).json(getMessage(200));
  } catch (error) {
    res.status(500).json(getMessage(500));
  }
}
