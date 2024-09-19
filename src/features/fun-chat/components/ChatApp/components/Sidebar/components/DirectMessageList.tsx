import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useContext } from "react";
import { AppContext } from "../../../../../contexts/AppProvider";
import _ from "lodash";
import { AuthContext } from "../../../../../contexts";

function DirectMessageList() {
  const {
    setAddDirectMessageModalOpen,
    setSelectedRoomId,
    selectedRoomId,
    directMessages,
  } = useContext(AppContext);

  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="text-white px-4 py-3">
        Danh sách cuộc trò chuyện
        <div className="pl-4 pt-4">
          {directMessages.map((directMessages, index) => {
            const otherUserId = _.find(
              directMessages.memberIds,
              (memberId) => memberId !== user.id
            );

            const otherUser = _.find(
              directMessages.members,
              (member) => member.id === otherUserId
            );

            console.log(otherUserId, otherUser);

            return (
              <div key={index}>
                {selectedRoomId === _.get(directMessages, "id") ? (
                  <>
                    <Typography.Text
                      onClick={() => {
                        setSelectedRoomId(_.get(directMessages, "id", ""));
                      }}
                      className="block text-blue-600 font-bold cursor-pointer mb-2"
                    >
                      {otherUser?.displayName}
                    </Typography.Text>
                  </>
                ) : (
                  <>
                    <Typography.Text
                      onClick={() => {
                        setSelectedRoomId(_.get(directMessages, "id", ""));
                      }}
                      className="block text-white cursor-pointer mb-2"
                    >
                      {otherUser?.displayName}
                    </Typography.Text>
                  </>
                )}
              </div>
            );
          })}
          <Button
            type="text"
            className="text-white p-0 mt-2 hover:!text-white hover:!bg-transparent"
            icon={<PlusSquareOutlined />}
            onClick={() => {
              setAddDirectMessageModalOpen(true);
            }}
          >
            Thêm
          </Button>
        </div>
      </div>
    </>
  );
}

export default DirectMessageList;
