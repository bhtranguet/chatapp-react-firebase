import { UserAddOutlined } from "@ant-design/icons";
import { useContext, useMemo, useRef, useState } from "react";
import { AppContext } from "../../../../contexts/AppProvider";
import _ from "lodash";
import { Alert, Avatar, Button, Form, Input, InputRef, Tooltip } from "antd";
import Message from "./components/Message";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { addDocument } from "../../../../../../utils";
import useFirestore, {
  QueryCondition,
} from "../../../../../../hooks/firebase/useFirestore";

function ChatWindow() {
  const { selectedRoom, members, setIsInviteMemberModalOpen } =
    useContext(AppContext);

  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);

  const [messageText, setMessageText] = useState<string>("");

  const inputRef = useRef<InputRef>(null);

  const condition = useMemo(
    () =>
      ({
        fieldName: "roomId",
        operator: "==",
        compareValue: _.get(selectedRoom, "id"),
      } as QueryCondition),
    [_.get(selectedRoom, "id")]
  );

  const messages = useFirestore("messages", useMemo(() => [], selectedRoom.id));

  const handleSendMessage = async () => {
    addDocument("messages", {
      text: messageText,
      uid,
      photoURL,
      roomId: _.get(selectedRoom, "id"),
      displayName,
    });
    setMessageText("");
    // focus to input again after submit
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      });
    }
  };

  return (
    <>
      <div className="px-1 h-full">
        {_.get(selectedRoom, "id") ? (
          <div className="flex flex-col h-full">
            <div className="flex justify-between border-b px-4 py-3">
              <div>
                <div className="font-bold">{_.get(selectedRoom, "name")}</div>
                <div>{_.get(selectedRoom, "description")}</div>
              </div>
              <div className="flex items-center">
                <Button
                  type="dashed"
                  icon={<UserAddOutlined />}
                  iconPosition="end"
                  onClick={() => {
                    setIsInviteMemberModalOpen(true);
                  }}
                >
                  Mời
                </Button>
                <Avatar.Group className="pl-1" size="small" maxCount={2}>
                  {members.map((member, index) => (
                    <Tooltip title={_.get(member, "displayName")} key={index}>
                      <Avatar src={_.get(member, "photoURL")} />
                    </Tooltip>
                  ))}
                </Avatar.Group>
              </div>
            </div>
            <div className="grow flex flex-col py-2">
              <div className="grow flex flex-col justify-end">
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    text={_.get(message, "text", "")}
                    createdAt={_.get(message, "createdAt", {})}
                    displayName={_.get(message, "displayName", "")}
                    photoURL={_.get(message, "photoURL", "")}
                  />
                ))}
              </div>
              <div className="flex">
                <div className="grow mr-1">
                  <Input
                    ref={inputRef}
                    value={messageText}
                    onChange={(event) => {
                      const value = event.target.value;
                      setMessageText(value);
                    }}
                  />
                </div>
                <Button type="primary" onClick={handleSendMessage}>
                  Gửi
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Alert message="Hãy chọn phòng" type="info" showIcon closable />
          </>
        )}
      </div>
    </>
  );
}

export default ChatWindow;
