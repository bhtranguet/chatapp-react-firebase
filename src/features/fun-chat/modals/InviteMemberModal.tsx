import React, { useContext, useMemo, useState } from "react";
import { Form, Modal, Select, Spin, Avatar } from "antd";
import { debounce } from "lodash";
import { AppContext } from "../contexts/AppProvider";
import { db } from "../../../configs/firebaseSetup";
import { where, orderBy, limit, doc, updateDoc } from "firebase/firestore";
import _ from "lodash";
import { queryDocuments } from "../../../utils";
import { UserEntity } from "../types/types";

interface UserOption {
  label: string;
  value: string;
  photoURL: string;
}

interface DebounceSelectProps {
  fetchOptions: (value: string, curMembers: string[]) => Promise<UserOption[]>;
  debounceTimeout?: number;
  curMembers: string[];
  [key: string]: any;
}

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}: DebounceSelectProps) {
  const [fetching, setFetching] = useState<boolean>(false);
  const [options, setOptions] = useState<UserOption[]>([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

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

async function fetchUserList(
  search: string,
  curMembers: string[]
): Promise<UserOption[]> {
  const users = await queryDocuments<UserEntity>("users", [
    where("keywords", "array-contains", search?.toLowerCase()),
    orderBy("createdAt"),
    limit(20),
  ]);

  const userOptions = users
    .filter((u) => !_.includes(curMembers, u.uid))
    .map((u) => {
      return {
        label: u.displayName || "",
        value: u.uid,
        photoURL: u.photoURL || "",
      } as UserOption;
    });

  return userOptions;
}

export default function InviteMemberModal() {
  const {
    isInviteMemberModalOpen,
    setIsInviteMemberModalOpen,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);
  const [value, setValue] = useState<UserOption[]>([]);
  const [form] = Form.useForm();

  const handleOk = async () => {
    // reset form value
    form.resetFields();
    setValue([]);

    // update members in current room
    const roomRef = doc(db, "rooms", selectedRoomId);

    await updateDoc(roomRef, {
      memberIds: [
        ..._.get(selectedRoom, "memberIds", []),
        ...value.map((val) => val.value),
      ],
    });

    setIsInviteMemberModalOpen(false);
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();
    setValue([]);

    setIsInviteMemberModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Mời thêm thành viên"
        open={isInviteMemberModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            name="search-user"
            label="Tên các thành viên"
            value={value}
            placeholder="Nhập tên thành viên"
            fetchOptions={fetchUserList}
            onChange={(newValue: any) => setValue(newValue)}
            style={{ width: "100%" }}
            curMembers={_.get(selectedRoom, "memberIds", [])}
          />
        </Form>
      </Modal>
    </div>
  );
}
