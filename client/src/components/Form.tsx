import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import SectionTitle from "./SectionTitle";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
interface Props {
  onSubmit: (url: string) => void;
}

export default function UrlForm({ onSubmit }: Props) {
  const [url, setUrl] = useState<string>("");

  return (
    <div className="form-container">
      <SectionTitle title="header debugger" />
      <Form {...layout} layout="vertical" initialValues={{ remember: true }}>
        <Form.Item label="Url to check">
          <Input.Group compact>
            <Form.Item
              noStyle
              label="Url to check"
              name="url"
              rules={[{ type: "url", message: "Please type a correct url" }]}
            >
              <Input
                style={{ width: "50%" }}
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button
                htmlType="submit"
                onClick={() => {
                  url && onSubmit(url);
                  setUrl("");
                }}
                className="btn"
              >
                LAUNCH ANALYSIS
              </Button>
            </Form.Item>
          </Input.Group>
        </Form.Item>
      </Form>
    </div>
  );
}
