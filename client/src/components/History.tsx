import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { useAsync } from "../hooks/query";
import { fetchApi } from "../utils/index";
import { CloudFilled } from "@ant-design/icons";

const Th = ({ text }: { text: string }) => (
  <div className="table-head">{text}</div>
);
interface Item {
  date: Date;
  plugged: boolean;
  statusCode: number;
  fstrzFlags?: string[];
  cloudfrontStatus?: string;
  cloudfrontPOP?: string;
}

const columns = [
  {
    title: <Th text="Date" />,
    align: "center" as "center",
    dataIndex: "date",
    key: "name",
    render: (text: string) => (
      <span className="row-text">
        {new Date(text).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    title: <Th text="URL" />,
    dataIndex: "url",
    key: "url",
    render: (text: string) => <span className="row-text bold">{text}</span>,
  },
  {
    title: <Th text="Status" />,
    dataIndex: "statusCode",
    key: "statuscode",
    align: "center" as "center",
    render: (status: number, record: Item) => {
      if (!record.plugged) {
        return <CloudFilled className="icon" style={{ color: "red" }} />;
      } else {
        if (record?.fstrzFlags?.includes("optimisée")) {
          return <CloudFilled className="icon" style={{ color: "green" }} />;
        } else {
          return <CloudFilled className="icon" style={{ color: "orange" }} />;
        }
      }
    },
  },
  {
    title: <Th text="Flags" />,
    key: "fstrzFlags",
    dataIndex: "fstrzFlags",
    render: (tags: string[]) => (
      <>
        {tags
          ? tags.map((tag) => (
              <Tag color="#108ee9" key={tag} className="tag">
                {tag}
              </Tag>
            ))
          : "-"}
      </>
    ),
  },
  {
    title: <Th text="Cloudfront status" />,
    key: "cloudfrontStatus",
    dataIndex: "cloudfrontStatus",
    align: "center" as "center",
    render: (text: string) =>
      text ? <span className="c-status">{text}</span> : "-",
  },
  {
    title: <Th text="Cloudfront pop" />,
    key: "cloudfrontPOP",
    align: "center" as "center",
    dataIndex: "cloudfrontPOP",
    render: (text: string) =>
      text ? <span className="row-text">{text}</span> : "-",
  },
];

export default function History({ url }: { url: string }) {
  const grabHistory = () => {
    const sessions = localStorage.getItem("FSTRZ");
    if (sessions) {
      return JSON.parse(sessions);
    }
    return [];
  };
  const [list, setList] = useState(grabHistory);
  const { data, status, error, run } = useAsync({ status: "idle" });

  useEffect(() => {
    if (url) {
      run(fetchApi(`http://localhost:${process.env.SERVER_PORT || 3000}?url=${url}`));
    }
  }, [url, run]);

  useEffect(() => {
    if (status === "resolved") {
      const newList = [
        ...list,
        {
          key: url + Date(),
          date: new Date(),
          url,
          ...data,
        },
      ];
      setList(newList);
      localStorage.setItem("FSTRZ", JSON.stringify(newList));
    }
  }, [status]);

  if (status === "idle") {
    console.log("No response");
  } else if (status === "pending") {
    console.log("loading site");
  } else if (status === "rejected") {
    console.log("error", error);
  } else if (status === "resolved") {
    console.log("ok", error);
  }

  return <Table columns={columns} dataSource={list} />;
}
