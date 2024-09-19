import { CaretDownFilled, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useContext } from "react";
import { AppContext } from "../../../../../contexts/AppProvider";
import _ from "lodash";

function DirectMessageList() {
  const {
    setAddDirectMessageModalOpen,
    setSelectedRoomId,
    selectedRoomId,
    directMessages,
  } = useContext(AppContext);

  return (
    <>
      <div className="text-white px-4 py-3">
        <CaretDownFilled className="mr-2" />
        Danh sách cuộc trò chuyện
        <div className="pl-4 pt-4">
          {directMessages.map((room, index) => {
            return (
              <div key={index}>
                {selectedRoomId === _.get(room, "id") ? (
                  <>
                    <Typography.Text
                      onClick={() => {
                        setSelectedRoomId(_.get(room, "id", ""));
                      }}
                      className="block text-blue-600 font-bold cursor-pointer mb-2"
                    >
                      {room.name}
                    </Typography.Text>
                  </>
                ) : (
                  <>
                    <Typography.Text
                      onClick={() => {
                        setSelectedRoomId(_.get(room, "id", ""));
                      }}
                      className="block text-white cursor-pointer mb-2"
                    >
                      {room.name}
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
            Thêm cuộc trò chuyện
          </Button>
        </div>
      </div>
    </>
  );
}

export default DirectMessageList;
