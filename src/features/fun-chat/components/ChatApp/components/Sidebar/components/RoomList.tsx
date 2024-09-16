import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useContext } from "react";
import { AppContext } from "../../../../../contexts/AppProvider";

function RoomList() {
  const { setIsAddRoomModalOpen } = useContext(AppContext);
  return (
    <>
      <div className="text-white px-4 py-3 border-t">
        Danh sách các phòng
        <div className="pl-4 pt-4">
          <Typography.Link className="block">Room 1</Typography.Link>
          <Typography.Link className="block">Room 2</Typography.Link>
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
