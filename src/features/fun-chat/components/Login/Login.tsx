import { Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "../../../../configs/firebaseSetup";
import { addDocument, generateKeywords } from "../../../../utils";

const provider = new GoogleAuthProvider();

export default function Login() {
  async function handleLogin() {
    const userCredential = await signInWithPopup(auth, provider);
    const { user, providerId } = userCredential;
    const additionalUserInfo = getAdditionalUserInfo(userCredential);

    if (additionalUserInfo?.isNewUser) {
      await addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: providerId,
        keywords: generateKeywords(user.displayName?.toLowerCase() || ""),
      });
    }
  }
  return (
    <>
      <Row justify="center">
        <Col span={8}>
          <Title className="text-center">Fun Chat</Title>
          <Button onClick={() => handleLogin()} className="block w-full">
            Đăng nhập bằng Google
          </Button>
        </Col>
      </Row>
    </>
  );
}
