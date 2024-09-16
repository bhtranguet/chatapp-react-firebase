import { Avatar, Typography } from "antd";
import _ from "lodash";

interface MessageProps {
  text: string;
  displayName: string;
  createdAt: object;
  photoURL: string;
}

function formatSecondsToDateTime(seconds: string): string {
  const formatedDate = "";
  if (seconds) {
    const date = new Date(+seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Format the date to a readable string
  }
  return formatedDate;
}

export default function Message({
  text,
  displayName,
  createdAt,
  photoURL,
}: MessageProps) {
  return (
    <div className="my-2">
      <div className="flex">
        <Avatar size="small" src={photoURL} />
        <Typography.Text className="mx-2 font-bold">
          {displayName}
        </Typography.Text>
        <Typography.Text type="secondary">
          {formatSecondsToDateTime(_.get(createdAt, "seconds", ""))}
        </Typography.Text>
      </div>
      <div className="pl-8">{text}</div>
    </div>
  );
}
