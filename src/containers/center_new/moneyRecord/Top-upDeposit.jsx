// chognzhiyajin
import React, { Component } from 'react';
import { Breadcrumb, Icon, Button, Radio } from 'antd';
import { Link } from 'react-router-dom';

import './updeposit.css';

import PageHeader from '../../../component/page_header/page_header';                             //头部

const RadioGroup = Radio.Group;                                   //单选框
const RadioButton = Radio.Button;

class TopUpDeposit extends Component {
  constructor() {
    super();
    this.state = {
      value: 1,                    //1表示yajin ,2 表示fudian

      andMoney: 1179,              //daibiaoxuyao chognzhide fudian
    };
  }
  //充值浮点？
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    if ( e.target.value === 2 ) {
      this.props.history.push("/upFudian");
    }
    this.setState({
      value: e.target.value,
    });
  }

  // 支付平台方式
  pingtaiBtb = (e) => {
    console.log('radio checked', e.target.value);
  }

  // FudianBtn
  FudianBtn = (e) => {
    this.setState({
      andMoney: e.target.value,
    })
  }

  render() {
    const { andMoney } = this.state;
    return(
        <div>
          {/* 头部组件 */}
          <PageHeader />
          <div className="rawp">
            <div className="contents UpDeposit">
              <div style={{ padding: '10px 0' }}>
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
                    Invite Friend
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="UpDeposit_top">
                <div className="UpDeposit_header">
                  <h2>Recharge</h2>
                  <span>huihlkjpkpo;klm;kgyug<span>11</span>gegergrghrthtr</span>
                </div>
              </div>
              <table className="UpDeposit_table" border="1">
                <tbody>
                  <tr>
                    <td>
                      <Icon className="header_right" type="sound" />
                      <span className="header_right">Buyer incentives</span>
                    </td>
                    <td>
                      <p>1、Invite friends to complete the first task, reward <span>10</span> points;</p>
                      <p className="header_leftfonts">2、For each successful completion of friend's second order, the inviter will get a reward: <span>1</span> point/order</p>
                      <p className="header_leftfonts"> ①Invite friends to complete the first task, reward <span>10</span> points;</p>
                      <p className="header_leftfonts"> ②Invite friends to complete the first task, reward <span>10</span> points;</p>
                      <p className="header_leftfonts"> ③Invite friends to complete the first task, reward <span>10</span> points;</p>
                      <p>3、Invite friends to complete the first task, reward <span>10</span> points<Button style={{ marginLeft: '10px' }} type="primary">jkjdpop</Button></p></td>
                  </tr>
                </tbody>
              </table>
              {/* 充值条件 */}
              <div className="UpDeposit_top">
                <div className="UpDeposit_header UpDeposit_center">
                  <h2>1.Please select recharge deposit or recharge point</h2>
                </div>
                <div className="UpDeposit_header_child">
                  <p>当前押金余额：<span>474.26</span>元，符点余额<span>0.00</span>符点，当日剩余可充值额度：<span>40000</span>元</p>
                  <RadioGroup style={{ marginTop: '20px' }} onChange={this.onChange} value={this.state.value}>
                    <Radio className="upFont" value={1}>Top-up deposit</Radio>
                    <Radio className="upFont" value={2}>Prepaid phone operators point</Radio>
                  </RadioGroup>
                </div>
              </div>
              {/* 充值方式 */}
              <div className="UpDeposit_top UpDeposit_top_bottom">
                <div className="UpDeposit_header UpDeposit_center">
                  <h2>2.Please select recharge deposit or recharge point</h2>
                </div>
                <RadioGroup style={{ marginTop: '30px', marginBottom: '5px' }} onChange={this.pingtaiBtb} value={this.state.value}>
                  <Radio className="upFont" value={1}>weixinzhifu</Radio>
                  <Radio className="upFont" value={2}>zhifubaozhifu</Radio>
                  <Radio className="upFont" value={3}>yinlian</Radio>
                </RadioGroup>
              </div>
              {/* 选择充值金额 */}
              <div className="UpDeposit_top UpDeposit_top_bottom">
                <div className="UpDeposit_header UpDeposit_center">
                  <h2>3.Please select recharge deposit or recharge point</h2>
                </div>
                <RadioGroup onChange={this.FudianBtn} style={{ marginLeft: '30px', width: '50%', marginTop: '20px' }} className="marginR-L" defaultValue="1179" size="large">
                  <RadioButton value="1179">Hangzhou</RadioButton>
                  <RadioButton value="2721">Shanghai</RadioButton>
                  <RadioButton value="4124">Beijing</RadioButton>
                  <RadioButton value="8986">Chengdu</RadioButton>
                  <RadioButton value="14391">Beijing</RadioButton>
                  <RadioButton value="16519">Chengdu</RadioButton>
                  <RadioButton value="29845">Beijing</RadioButton>
                  <RadioButton value="32625">Chengdu</RadioButton>
                  <RadioButton value="38174">Chengdu</RadioButton>
                </RadioGroup>
                <div className="recharge-number">
                  <p>nixuanzede<span>{andMoney}</span>fudian</p>
                  <p>xuyaozhifu：<span>{andMoney}</span>fuidan</p>
                </div>
                <div className="tjBtn">
                  <Button type="primary">jkjdpop</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default TopUpDeposit
