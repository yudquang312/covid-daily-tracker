import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table, Typography } from "antd";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function SummaryTable() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    Axios.get("https://api.covid19api.com/summary")
      .then(({ data: { Countries } }) => {
        setCountries(
          Countries.map(
            ({
              Country,
              Slug,
              NewConfirmed,
              NewDeaths,
              NewRecovered,
              TotalConfirmed,
              TotalDeaths,
              TotalRecovered,
            }) => {
              return {
                Country,
                Slug,
                NewConfirmed,
                NewDeaths,
                NewRecovered,
                TotalConfirmed,
                TotalDeaths,
                TotalRecovered,
                key: Slug,
              };
            }
          )
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const renderContent = (value, record, index) => {
    return value ? (
      <div style={{ textAlign: "right" }}>
        <Typography.Text strong>{value}</Typography.Text>
      </div>
    ) : null;
  };

  const sortKey = (key) => (a, b) => a[key] - b[key];

  const columns = [
    {
      title: "Country",
      dataIndex: "Country",
      sorter: (a, b) => a.Country - b.Country,
      sortDirections: ["descend", "ascend"],
      render: (name, country, index) => {
        return (
          <Link to={"/countries/" + country.Slug}>
            <div style={{ textAlign: "left" }}>
              <Typography.Text strong>{country.Country}</Typography.Text>
            </div>
          </Link>
        );
      },
    },
    {
      title: "Total Cases",
      dataIndex: "TotalConfirmed",
      sorter: sortKey("TotalConfirmed"),
      sortDirections: ["descend", "ascend"],
      render: renderContent,
    },
    {
      title: "New Cases",
      dataIndex: "NewConfirmed",
      sorter: sortKey("NewConfirmed"),
      sortDirections: ["descend", "ascend"],
      render: renderContent,
    },
    {
      title: (
        <div style={{ textAlign: "center" }}>
          Total
          <br />
          Deaths
        </div>
      ),
      dataIndex: "TotalDeaths",
      sorter: sortKey("TotalDeaths"),
      sortDirections: ["descend", "ascend"],
      render: renderContent,
    },
    {
      title: (
        <div style={{ textAlign: "center" }}>
          New
          <br />
          Deaths
        </div>
      ),
      dataIndex: "NewDeaths",
      sorter: sortKey("NewDeaths"),
      sortDirections: ["descend", "ascend"],
      render: (value, record, index) => {
        return value ? (
          <div style={{ textAlign: "right" }}>
            <Typography.Text strong type="danger">
              {value}
            </Typography.Text>
          </div>
        ) : null;
      },
    },
    {
      title: (
        <div style={{ textAlign: "center" }}>
          Total
          <br />
          Recovered
        </div>
      ),
      dataIndex: "TotalRecovered",
      sorter: sortKey("TotalRecovered"),
      sortDirections: ["descend", "ascend"],
      render: renderContent,
    },
    {
      title: (
        <div style={{ textAlign: "center" }}>
          New
          <br />
          Recovered
        </div>
      ),
      dataIndex: "NewRecovered",
      sorter: sortKey("NewRecovered"),
      sortDirections: ["descend", "ascend"],
      render: renderContent,
    },
  ];
  return (
    <div style={{ marginTop: "2rem" }}>
      <Table columns={columns} dataSource={countries} bordered />
    </div>
  );
}
