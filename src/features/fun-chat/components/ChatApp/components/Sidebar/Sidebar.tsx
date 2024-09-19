import DirectMessageList from "./components/DirectMessageList";
import RoomList from "./components/RoomList";
import UserInfo from "./components/UserInfo";

function Sidebar() {
  return (
    <>
      <div className="bg-fuchsia-950 h-full">
        <div>
          <UserInfo />
        </div>
        <div>
          <RoomList />
          <DirectMessageList />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
