import React, { useContext, useMemo, useState } from "react";
import { Form, Modal, Select, Spin, Avatar } from "antd";
import { debounce } from "lodash";
import { AppContext } from "../contexts/AppProvider";
import { db } from "../../../configs/firebaseSetup";
import {
  query,
  collection,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import _ from "lodash";
import { AuthContext } from "../contexts";
import { addDocument, queryDocuments } from "../../../utils";
import { Room, RoomType, User } from "../types/types";

interface UserOption {
  label: string;
  value: string;
  photoURL: string;
}

interface DebounceSelectProps {
  fetchOptions: (value: string) => Promise<UserOption[]>;
  debounceTimeout?: number;
  [key: string]: any;
}

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  ...props
}: DebounceSelectProps) {
  const [fetching, setFetching] = useState<boolean>(false);
  const [options, setOptions] = useState<UserOption[]>([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);

  React.useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);

  return (
    <Select
      labelInValue
      optionLabelProp="children"
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search: string): Promise<UserOption[]> {
  const users: UserOption[] = [];

  const q = query(
    collection(db, "users"),
    where("keywords", "array-contains", search?.toLowerCase()),
    orderBy("createdAt"),
    limit(20)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    users.push({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    });
  });

  return users;
}

export default function AddDirectMessageModal() {
  const { addDirectMessageModalOpen, setAddDirectMessageModalOpen } =
    useContext(AppContext);

  const { user } = useContext(AuthContext);

  const [selectedUserOption, setSelectedUserOption] = useState<UserOption>();
  const [form] = Form.useForm();

  const handleOk = async () => {
    const selectedUserId = selectedUserOption?.value;

    if (!selectedUserId || !user.uid) {
      return;
    }

    // get direct message of current users
    const docs = await queryDocuments<Room>("rooms", [
      where("type", "==", RoomType.DIRECT_MESSAGE),
      where("memberIds", "array-contains", user.uid),
    ]);

    // check if direct message existed
    const isDirectMessageExisted = _.some(docs, (doc: Room) =>
      _.includes(doc.memberIds, selectedUserId)
    );

    if (!isDirectMessageExisted) {
      const memberIds = [user.uid, selectedUserId];

      addDocument<Room>("rooms", {
        memberIds,
        type: RoomType.DIRECT_MESSAGE,
      });
    }

    setAddDirectMessageModalOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();
    setAddDirectMessageModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Thêm cuộc trò chuyện"
        open={addDirectMessageModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            name="search-user"
            showSearch
            label="Tên các thành viên"
            value={selectedUserOption}
            placeholder="Nhập tên thành viên"
            fetchOptions={fetchUserList}
            onChange={(newValue: any) => setSelectedUserOption(newValue)}
            style={{ width: "100%" }}
          />
        </Form>
      </Modal>
    </div>
  );
}
