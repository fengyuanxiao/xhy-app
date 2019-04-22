import React, { Component } from 'react';
import { Breadcrumb, Icon, Tabs, Badge } from 'antd';
import { Link } from 'react-router-dom';


import PageHeader from '../../../component/page_header/page_header';
// import Menus from '../../../component/menus/menus';                            //左边导航栏

import './binds.css';

const TabPane = Tabs.TabPane;

class PageTaobao extends Component {
  constructor() {
    super();
    this.state = {};
  }

  callback = (key) => {
    console.log(key);
  }

  render() {
    return(
      <div>
        {/* 头部组件 */}
        <PageHeader />
        {/* 面包屑 */}
        <div className="rawp">
          <div className="contents binds">
            <div className="boxPadding">
              {/* 面包屑 */}
              <Breadcrumb className="mbx">
                <Breadcrumb.Item>
                  <Link to="/center_new">
                    <Icon type="home" />
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/center_new">
                    <Icon type="user" />
                    <span>Center</span>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  Bind shops
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="contents_left">
              <div className="boxPadding" style={{ marginBottom: 0, borderBottom: '1px solid #ccc' }}>
                <span>Shops Admin</span>
                <span>Bind shop</span>
              </div>
              <Tabs className="tabContent" defaultActiveKey="1" tabPosition={'left'} onChange={this.callback}>
                <TabPane tab={<div className="tabBind"><span>123dsfge</span><Badge count={2} /></div>} key="1">
                  <h2>一.Bind shops xuzhi</h2>
                  <p>1.Each account can be bound to 14 major platforms, including taobao, Tmall, jd, yihaodian, jumei, amazon, dangdang, paipai, alibaba, mogujie, meilishuo, gome, suning, and pengduo. Each platform can be bound to 3 stores at most (the bound stores are valid for a long time).</p>
                  <p>2.Each account can be bound to 14 major platforms, including taobao, Tmall, jd, yihaodian, jumei, amazon, dangdang, paipai, alibaba, mogujie, meilishuo, </p>
                  <h2 style={{ paddingTop: '20px' }}>二.And bind Shops</h2>
                  {/* Binds */}
                  <table className="jiangli_table2" border="1">
                    <tbody>
                      <tr>
                        <td style={{ backgroundColor: '#F4FAFF' }}>
                          <p>Buyer incentives</p>
                          <p>Buyer incentives</p>
                          <p>Buyer incentives</p>
                          <p>Buyer incentives</p>
                          <p>Buyer incentives</p>
                        </td>
                        <td>
                          <p>Invite friends to complete the first task, reward <span>10</span> points;</p>
                          <p>For each successful completion of friend's second order, the inviter will get a reward: <span>1</span> point/order</p>
                          <p>Invite friends to complete the first task, reward <span>10</span> points;</p>
                          <p>Invite friends to complete the first task, reward <span>10</span> points;</p>
                          <p>Invite friends to complete the first task, reward <span>10</span> points;</p>
                        </td>
                        <td>
                          <p>Buyer incentives</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </TabPane>
                <TabPane tab={<div className="tabBind"><span>123dsfge</span><Badge count={2} /></div>} key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab={<div className="tabBind"><span>123dsfge</span><Badge count={2} /></div>} key="3">Content of Tab Pane 3</TabPane>
                <TabPane tab={<div className="tabBind"><span>123dsfge</span><Badge count={2} /></div>} key="4">Content of Tab Pane 4</TabPane>
              </Tabs>
            </div>
            <div className="contents_right">
              {/* 提交搜索的表单 */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageTaobao
