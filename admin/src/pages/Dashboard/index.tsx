import React from 'react'
import { PageContainer } from '@ant-design/pro-components'
import { commonConstants } from '@/constants/common'
import { Typography, Statistic, Divider } from "antd";
import DemoCharts from '@/components/charts/DemoCharts';
import MyCharts from '@/components/charts/MyCharts';
import "./index.less"
export default function Dashboard() {
  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <div className='dashboard-head-box'>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem"
        }}>
          <div style={{ borderRadius: "10rem", backgroundColor: "#d14e96" }}>
            <img src={commonConstants.DEFAULT_AVATAR} style={{ width: "50px", height: "50px" }}></img>
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem"
          }}>
            <Typography.Text strong>早安，yangjj，今天又是心情愉悦的一天！</Typography.Text>
            <Typography.Text type='secondary'>今日您有三个待办，请查看</Typography.Text>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography.Text type='secondary'>订单数</Typography.Text>
            <Typography.Text strong={true} style={{ fontSize: "1.1rem" }}>25</Typography.Text>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography.Text type='secondary'>待办</Typography.Text>
            <Typography.Text strong={true} style={{ fontSize: "1.1rem" }}>4/16</Typography.Text>
          </div>

        </div>
      </div>
      <div className='dashboard-data-box'>

        <div className="dashboard-data-card" style={{ backgroundColor: "#d04f96" }}>
          <Typography.Text style={{ color: "white" }}>访问量</Typography.Text>
          <div className='dashboard-data-description'>
            <img src={commonConstants.ACCESS_COUNT_ICON} style={{ width: "24px", height: "24px" }} />
            <Statistic value="9725" valueStyle={{ color: "white" }}></Statistic>
          </div>
        </div>

        <div className="dashboard-data-card" style={{ backgroundColor: "#61bbed" }}>
          <Typography.Text style={{ color: "white" }}>成交额</Typography.Text>
          <div className='dashboard-data-description'>
            <img src={commonConstants.ACCESS_COUNT_ICON} style={{ width: "24px", height: "24px" }} />
            <Statistic value="9725" valueStyle={{ color: "white" }}></Statistic>
          </div>
        </div>
        <div className="dashboard-data-card" style={{ backgroundColor: "#faa33e" }}>
          <Typography.Text style={{ color: "white" }}>下载量</Typography.Text>
          <div className='dashboard-data-description'>
            <img src={commonConstants.ACCESS_COUNT_ICON} style={{ width: "24px", height: "24px" }} />
            <Statistic value="9725" valueStyle={{ color: "white" }}></Statistic>
          </div>
        </div>
        <div className="dashboard-data-card" style={{ backgroundColor: "#664eb9" }}>
          <Typography.Text style={{ color: "white" }}>成交量</Typography.Text>
          <div className='dashboard-data-description'>
            <img src={commonConstants.ACCESS_COUNT_ICON} style={{ width: "24px", height: "24px" }} />
            <Statistic value="9725" valueStyle={{ color: "white" }}></Statistic>
          </div>
        </div>
      </div>

      <div style={{
        display: "flex",
        gap: "1rem"
      }}>
        <div className="dashboard-common-box" style={{ flex: 6 }}>
          <DemoCharts />
        </div>
        <div className="dashboard-common-box" style={{ flex: 4 }}>
          <MyCharts />
        </div>
      </div>


      <div style={{
        display: "flex",
        gap: "1rem"
      }}>
        <div className="dashboard-common-box" style={{ flex: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography.Text>项目动态</Typography.Text>
            <Typography.Text>更多动态</Typography.Text>
          </div>
          <hr></hr>

          <div style={{ height: "300px" }}></div>
        </div>
        <div className="dashboard-common-box" style={{ flex: 4 }}>

        </div>
      </div>
    </PageContainer>
  )
}
