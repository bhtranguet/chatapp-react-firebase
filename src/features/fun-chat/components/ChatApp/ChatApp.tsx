import { Col, Row } from "antd";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import Sidebar from "./components/Sidebar/Sidebar";

export function ChatApp() {
  return (
    <>
      <Row className="h-screen">
        <Col span={6}>
          <Sidebar />
        </Col>
        <Col span={18}>
          <ChatWindow />
        </Col>
      </Row>
    </>
  );
}
