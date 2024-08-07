import { setCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/common/contants/auth.constant";

const authenticateEnpoint = `${process.env.NEXT_PUBLIC_DEFAULT_PROXY}/api/authenticate`;
const appJwtEnpoint = `${process.env.NEXT_PUBLIC_DEFAULT_PROXY}/${process.env.NEXT_PUBLIC_APP_API_MSCSM}/api/authorization/get-app-jwt`;

const getMessage = (code) => {
  if (code === 200) {
    return {
      message: {
        vn: "Đăng nhập thành công!",
        en: "Logged in successfully!",
      },
      description: {
        vn: "Đã thành công đăng nhập vào hệ thống",
        en: "Successfully logged into the system",
      },
    };
  }

  if (code === 400 || code === 403 || code === 401) {
    return {
      message: {
        vn: "Đăng nhập thất bại!",
        en: "Login failed!",
      },
      description: {
        vn: "Tên đăng nhập hoặc mật khẩu của bạn không hợp lệ.",
        en: "Your username or password is invalid",
      },
    };
  }

  if (code === 404 || code === 500) {
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
  }

  return;
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const responseAuth = await axios({
      url: authenticateEnpoint,
      method: "post",
      data: req.body.form,
    });

    if (responseAuth.status === 200) {
      const id_token = responseAuth.data.id_token;

      const responseGetToken = await axios({
        url: appJwtEnpoint,
        method: "post",
        data: {
          appCode: process.env.NEXT_PUBLIC_APP_CODE || "",
          isAzure: false,
          metadata: req.body.metadata,
        },
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      });

      if (responseGetToken.status === 200) {
        const accessToken = responseGetToken.data.accessToken;
        const refeshToken = responseGetToken.data.refreshToken;
        const cookieConfig = {
          req,
          res,
          httpOnly: true,
          // secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7, // One week
          path: "/",
        };

        setCookie(ACCESS_TOKEN, accessToken, cookieConfig);
        setCookie(REFRESH_TOKEN, refeshToken, cookieConfig);

        res.status(200).json(getMessage(200));
      } else {
        res
          .status(responseGetToken.data?.status)
          .json(getMessage(responseGetToken.data?.status));
      }
    } else {
      res
        .status(responseAuth.data?.status)
        .json(getMessage(responseAuth.data?.status));
    }
  } catch (error) {
    res.status(error.response?.status).json(getMessage(error.response?.status));
  }
}
