import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/common/contants/auth.constant";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getCookie, setCookie } from "cookies-next";

const getMessage = (code) => {
  if (code === 200) {
    return {
      message: {
        vn: "Làm mới thành công!",
        en: "Refresh successfully!",
      },
      description: {
        vn: "Đã thành công làm mới phiên làm việc",
        en: "Successfully refresh session",
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

const refeshEnpoint = `${process.env.NEXT_PUBLIC_DEFAULT_PROXY}/${process.env.NEXT_PUBLIC_APP_API_MSCSM}/user/refresh-token`;
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const refeshToken = getCookie(REFRESH_TOKEN);

    const responseGetToken = await axios({
      url: refeshEnpoint,
      method: "post",
      headers: {
        Authorization: `Bearer ${refeshToken}`,
      },
    });

    if (responseGetToken.status === 200) {
      const accessToken = responseGetToken.data.accessToken;
      const refeshToken = responseGetToken.data.refreshToken;
      const cookieConfig = {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // One week
        path: "/",
      };

      setCookie(ACCESS_TOKEN, accessToken, cookieConfig);
      setCookie(REFRESH_TOKEN, refeshToken, cookieConfig);

      res.status(200).json({
        ...getMessage(200),
        token: accessToken,
      });
    } else {
      res
        .status(responseGetToken.data?.status)
        .json(getMessage(responseGetToken.data?.status));
    }
  } catch (error) {
    res.status(500).json(getMessage(500));
  }
}
