import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useContext } from "react";
import { AppContext } from "../../../../../contexts/AppProvider";
import _ from "lodash";

function RoomList() {
  const { setIsAddRoomModalOpen, setSelectedRoomId, rooms, selectedRoomId } =
    useContext(AppContext);
  return (
    <>
      <div className="text-white px-4 py-3 border-t">
        Danh sách các phòng
        <div className="pl-4 pt-4">
          {rooms.map((room, index) => (
            <>
              {selectedRoomId === _.get(room, "id") ? (
                <>
                  <Typography.Text
                    key={index}
                    onClick={() => setSelectedRoomId(_.get(room, "id", ""))}
                    className="block text-blue-600 font-bold cursor-pointer mb-2"
                  >
                    {_.get(room, "name", "")}
                  </Typography.Text>
                </>
              ) : (
                <>
                  <Typography.Text
                    key={index}
                    onClick={() => setSelectedRoomId(_.get(room, "id", ""))}
                    className="block text-white cursor-pointer mb-2"
                  >
                    {_.get(room, "name", "")}
                  </Typography.Text>
                </>
              )}
            </>
          ))}
          <Button
            type="text"
            className="text-white p-0 mt-2 hover:!text-white hover:!bg-transparent"
            icon={<PlusSquareOutlined />}
            onClick={() => {
              setIsAddRoomModalOpen(true);
            }}
          >
            Thêm phòng
          </Button>
        </div>
      </div>
    </>
  );
}

export default RoomList;
