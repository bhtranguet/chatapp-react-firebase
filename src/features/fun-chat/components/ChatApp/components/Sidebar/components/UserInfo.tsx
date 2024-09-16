import { Avatar, Button, Typography } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../../../../contexts";
import { auth } from "../../../../../../../configs/firebaseSetup";

function UserInfo() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="text-white flex items-start justify-between px-4 py-3">
        <div>
          <Avatar src={user?.photoURL} className="m-1" />
          <Typography.Text className="text-white">
            {user?.displayName}
          </Typography.Text>
        </div>
        <Button
          ghost
          className="rounded-none"
          onClick={() => {
            auth.signOut();
          }}
        >
          Đăng xuất
        </Button>
      </div>
    </>
  );
}

export default UserInfo;
