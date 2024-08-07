import { notification, NotificationArgsProps } from "antd";
import {
  ExclamationCircleTwoTone,
  CloseCircleTwoTone,
  CheckCircleTwoTone,
  InfoCircleTwoTone,
} from "@ant-design/icons";

type NotificationType = "success" | "info" | "warning" | "error";

type PropTypes = {
  type: NotificationType;
  title: React.ReactNode;
  message: React.ReactNode;
};

export const openNotification = ({
  type,
  title,
  message,
  ...extendProp
}: NotificationArgsProps & PropTypes) => {
  const Icon = () => {
    switch (type) {
      case "error":
        return <CloseCircleTwoTone twoToneColor="#f5222d" />;
      case "warning":
        return <ExclamationCircleTwoTone twoToneColor="#faad14" />;
      case "success":
        return <CheckCircleTwoTone twoToneColor="#52c41a" />;
      default:
        return <InfoCircleTwoTone twoToneColor="#13c2c2" />;
    }
  };

  notification.open({
    type: type,
    message: title,
    description: message,
    onClick: () => {
      // console.log("Notification Clicked!");
    },
    icon: <>{Icon()}</>,
    duration: 3,
    ...extendProp,
  });
};
