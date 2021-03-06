// 发布goods
import React, { Component } from 'react';
import { Breadcrumb, Icon, Button, Tabs, Radio, Modal, Input, Select, Pagination, message } from 'antd';
import { Link } from 'react-router-dom';

import PageHeader from '../../../component/page_header/page_header';         //头部
import AddGoodComponent from '../addGoods/addGoodComponent';                 //添加新商品
import Type1 from './type1';                                                //taobao
import Type2 from './type2';                                                //taobao
import KeywordComponent from './keyword/keyword';                             //KeywordComponent
import AppreciationServe from './appreciation/appreciationServe';            //增值服务
import { _Publishindex, _GoodsInfoList, _keyWayList, _PublishTBSearch } from '../../../component/api';                     //引入ajax接口

import './release.css';

const TabPane = Tabs.TabPane;                   //Tabs标签页
const RadioGroup = Radio.Group;                 //单选框
const Option = Select.Option;                   //选择器

class ReleaseTask extends Component  {
  constructor() {
    super();
    this.state = {
      activeKey: '1',                             //第一步：选择任务类型和商品信息
      spell: 100,                                 //单选框的值 选择哪个平台类型
      visible: false,                             //visible 为true 的时候  弹出商品库
      addGoodsNum: true,                          //点击新增按钮 addGoodsNum为 true
      commodity_div: false,                       //从商品库选择商品块 commodity_div 为true 显示出来
      commodity1: false,                          //为false的时候 不显示关键词方案编辑板 商品关键词或成交词编辑板
      additionalReview: false,                    //是否是回访单 默认是否
      publish_type: false,                        //发布单类型  回访单和追评单只有天猫和淘宝值为true
      recentlyShow: true,                         //一件发布任务
      fanganShow: true,                          //关键词方案列表 默认显示

    }
  }

  componentWillMount() {
    // 发布任务显示平台和任务类型接口
    _Publishindex()
    .then(res => {
      // console.log(res.data.data);
      this.setState({
        Ecommerce_type: res.data.data,                    //平台类型
      })
    })
    .catch(err => {
      console.log(err);
    });
    // 商品库宝贝列表
    let platform = {  //存储平台类型 传给后台
      platform: this.state.spell,
    }
    _GoodsInfoList(platform, 1)
    .then(res => {
      // console.log(res.data.data);
      this.setState({
        goodsLists: res.data.data.list,                                         //商品列表
        page_count: res.data.data.page_count,                                   //商品总页数
        total: res.data.data.total,                                             //商品总条数
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
  // 处理内存泄露
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }
  
  // 发布task进度步骤
  onTabs = (key) => {
    // console.log(key);
    if ( key === '1' ) {
      this.setState({
        recentlyShow: true,
      })
    } else {
      this.setState({
        recentlyShow: false,
      })
    }
  }

  // 单选框 选择pingtai
  onSpell = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      spell: e.target.value,
      commodity_div: false,
      commodity1: false,
      addGoodsNum: true,
      fanganShow: false,
    });
    // 商品库宝贝列表
    let platform = {  //存储平台类型 传给后台
      platform: e.target.value,
    }
    _GoodsInfoList(platform, 1)
    .then(res => {
      // console.log(res.data.data);
      this.setState({
        goodsLists: res.data.data.list,                                         //商品列表
        page_count: res.data.data.page_count,                                   //商品总页数
        total: res.data.data.total,                                             //商品总条数
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  FudianBtn = (e) => {
    console.log(e.target.value);
    if ( e.target.value === 201 ) {
      this.setState({
        additionalReview: true,
        commodity_div: false,
        publish_type: true,
        commodity1: false,
      })
    } else if ( e.target.value === 202 ) {
      this.setState({
        publish_type: true,
        additionalReview: false,
      })
    } else {
      this.setState({
        additionalReview: false,
        publish_type: false,
        commodity_div: false,
        commodity1: false,
      })
    }
  }

  // 从商品库中选择商品
  xuanzeBtn = () => {
    this.setState({
      visible: true,
    });
  }
  // 关闭商品库框
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  // 商品库分页
  onPagination = (pageNumber) => {
    // 商品库宝贝列表
    let platform = {  //存储平台类型 传给后台
      platform: this.state.spell,
    }
    // 分页调用接口
    _GoodsInfoList(platform, pageNumber)
    .then(res => {
      // console.log(res.data.data);
      this.setState({
        goodsLists: res.data.data.list,                                         //商品列表
      })
    })
    .catch(err => {
      console.log(err);
    })
    // console.log('Page: ', pageNumber);
  }
  // 商品库选中的商品
  goodSelectBtn = (id) => {
    // 获取关键词方案列表接口
    let goods_id = {
      goods_id: id
    };
    _keyWayList(goods_id)
    .then(res=> {
      // console.log(res.data.data);
      if ( res.data.data === "" ) {
        this.setState({
          commodity1: true,                      //显示商品关键词或成交词编辑板
        })
      } else {
        this.setState({
          commodity1: false,
          keyWayLists: res.data.data,         //储存关键词方案列表
          defaultValues: res.data.data[0].id,
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
    // 在商品库中选中的商品 显示在页面上
    this.setState({
      goods_id: id,
    })
    let goodsLists = this.state.goodsLists;
    for (let i = 0; i < goodsLists.length; i++) {
      if ( goodsLists[i].id === id ) {
        this.setState({
          newGoodsLists: [goodsLists[i]],
        })
      }
    }
    this.setState({
      visible: false,                     //关闭商品库
      commodity_div: true,                //显示选中的商品块
      addGoodsNum: false,
      fanganShow: true,                   //跳转平台隐藏关键词方案列表
    });
  }
  // 新增宝贝
  addGoodsBtn = () => {
    this.setState({
      addGoodsNum: true,                     //更改addGoodsNum 状态
    })
  }
  // 编辑宝贝
  compileGoods = () => {
    this.setState({
      addGoodsNum: true,                     //更改addGoodsNum 状态
    })
  }
  addGoodsNumShow = () => {
    this.setState({
      addGoodsNum: false,
    })
  }
  // 子组件控制父组件的状态，
  hiddenFangan = (commodity1,keyWayLists) => {//keyWayLists由子组件传递过来的数据
    if ( commodity1 ) {
      this.setState({
        commodity1: false,              ////为false的时候 不显示关键词方案编辑板 商品关键词或成交词编辑板
        keyWayLists: keyWayLists,
      })
    } else {
      this.setState({
        commodity1: true,              ////为false的时候 不显示关键词方案编辑板 商品关键词或成交词编辑板
      })
    }
  }
  // 新增关键词方案
  showCommodity1 = () => {
    if ( this.state.commodity_div ) {
      this.setState({
        commodity1: true,
      })
    } else {
      message.warning('先从商品库选择宝贝！');
    }
  }
  // 选中的方案id 点击下一步掉接口进入增值服务
  handleValues = (value) => {//子组件给父组件传值，通过子组件触发调用传选中的value过来
    // console.log(value);
    this.setState({
      defaultValues: value,
    })
  }
  //下一步
  handleOneSubmit = () => {
    // console.log(this.state.defaultValues);
    let defaultValues = {
      id: this.state.defaultValues
    };
    // 淘宝搜索单各项增值服务收费
    _PublishTBSearch(defaultValues)
    .then(res => {
      // console.log(res.data);
      if ( res.data.code === 200 ) {
        this.onTabs()
        this.setState({
          firstDatas: res.data.data,
          activeKey: '2',
        })
      } else {
        message.error(res.data.msg)
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    const { fanganShow,firstDatas,activeKey,defaultValues,keyWayLists,Ecommerce_type,total, goods_id,recentlyShow, spell, addGoodsNum, commodity_div, commodity1, additionalReview, goodsLists,newGoodsLists,publish_type } = this.state;
    return(
      <div>
        {/* 头部组件 */}
        <PageHeader />
        <div className="rawp">
          <div className="contents release">
            <div>
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
                  Release a task
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {/* 最近发布任务内容  一键发布 */}
            {
              recentlyShow ?
                <div className="releasetop">
                  <div>
                    <Icon type="alert" />
                    <span className="releasetop_span">一键发布往期任务</span>
                    <span>为保障商家资金安全，平台只保留近15天内数据，请商家及时保存</span>
                  </div>
                  <Button>点击展开往期任务</Button>
                </div>
              :
                ''
            }
            <h1 style={{ color: '#e96262' }}>发布任务</h1>
            <Tabs onChange={this.onTabs} onTabClick={this.onTabClick} className="releaseHeader" activeKey={activeKey} defaultActiveKey="1">
              <TabPane tab={<span className="releaseSpan">第一步：选择任务类型和商品信息</span>} key='1'>
                <h2>1.选择平台和任务类型</h2>
                <RadioGroup className="releaseLabel" onChange={this.onSpell} value={spell}>
                  {
                    publish_type ?
                      Ecommerce_type.map((item, index) => {
                        return(
                          <Radio key={index} value={item.platform}>{item.platform_name}</Radio>
                        )
                      })
                    :
                    Ecommerce_type ?
                      Ecommerce_type.map((item, index) => {
                        return(
                          <Radio key={index} value={item.platform}>{item.platform_name}</Radio>
                        )
                      })
                    :
                    ''
                  }
                </RadioGroup>
                {/* 判断单选框 平台类型显示 */}
                {
                  spell === 100 || spell === 101 ?
                    Ecommerce_type ?
                      <Type1 FudianBtn={this.FudianBtn} Ecommerce_type={Ecommerce_type[0].task_type_list} />
                    :
                      ''
                  :
                  Ecommerce_type ?
                    <Type2 Ecommerce_type={Ecommerce_type} />
                  :
                    ''
                }
                <h2>2.选择任务宝贝</h2>
                <Button className="goodsBtns" onClick={ this.xuanzeBtn }>从商品库中选择宝贝</Button>
                {/* //是否是追评单 默认是否  如果选择追评则会隐藏关键词编辑板 和 新增宝贝按钮 */}
                {
                  additionalReview ?
                    ''
                  :
                  <Button className="goodsBtns" onClick={ this.addGoodsBtn }>新增宝贝</Button>
                }
                {/* commodity_div为true的时候 商品库选择的模板则会显示出来 */}
                {
                  commodity_div ?
                    newGoodsLists.map((item, index) => {
                      return(
                        <div key={item.id} className="addGoodComponents_style">
                          <div className="commodity_div">
                            <p>
                              <img src={item.icon_img} alt='typeTu'/>
                              <span>淘宝店铺：{item.store_name}</span>
                            </p>
                            <p style={{ cursor: 'pointer' }} onClick={this.compileGoods}>编辑</p>
                          </div>
                          <div className="commodity_div commodity_div1">
                            <div style={{ display: 'flex', alignItems:'center' }}>
                              <img style={{ width: '16%' }} src={item.phone_img1} alt='typeTu'/>
                              <p>{item.goods_name}</p>
                            </div>
                            <p>下单价：{item.pay_price}</p>
                            <p>搜索价：{item.show_price}</p>
                            <p>下单拍：{item.pay_nums}</p>
                            <p>下单规格：{item.rules}</p>
                            {
                              item.free_post === 1?
                                <p>商品包邮</p>
                              :
                              <p>商品不包邮</p>
                            }
                          </div>
                        </div>
                      )
                    })
                  :
                    ""
                }

                {/* addGoodsNum为true的时候 显示新增商品模板 */}
                {
                  addGoodsNum ?
                    <div style={{ position: 'relative' }} className="addGoodComponents_style">
                      <Icon onClick={this.addGoodsNumShow} style={{ position: 'absolute', right: '0', fontSize: '20px', padding: '10px' }} type="close" />
                      <AddGoodComponent />
                    </div>
                  :
                    ""
                }
                {/* 3.guanjianchi方案 */}
                {/* //是否是回访单 默认是否  如果选择回访单则会隐藏关键词编辑板 */}
                {
                  additionalReview ?
                    ''
                  :
                  <KeywordComponent fanganShow={fanganShow} handleValue={this.handleValues} hidden={this.hiddenFangan} key={Math.random()} defaultValues={defaultValues} commodity_div={commodity_div} keyWayLists={keyWayLists} commodity1={commodity1} goods_id={goods_id} />
                }
                {/* 新增关键词方案按钮 */}
                {
                  !commodity1 ?
                    <Button onClick={this.showCommodity1} style={{ marginBottom: '20px', marginTop: '20px' }} type="danger">新增关键词方案</Button>
                  :
                    ''
                }
                <div style={{ padding: '50px 0' }} className="releaseBtnok">
                  <Button>取消</Button>
                  <Button onClick={this.handleOneSubmit} type="primary">下一步</Button>
                </div>
              </TabPane>
              {/* 第二步 */}
              <TabPane tab={<span className="releaseSpan">第二步：设置活动计划和增值服务</span>} key='2'>
                <AppreciationServe firstDatas={firstDatas} />
              </TabPane>
              {/* 第三步 */}
              <TabPane tab={<span className="releaseSpan">第三步：支付</span>} disabled key='3'>Tab 3</TabPane>
            </Tabs>
          </div>
        </div>

        {/* 商品库中的商品 */}
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
          wrapClassName="modal_Width"
          style={{ width: '70%' }}
        >
          <div className="yajin_center_tab">
            <div style={{ width: '30%' }}>
              <span>dsfds：</span>
              <Select style={{ width: '75%' }} placeholder="综合排序">
                <Option value="销量排序">销量排序</Option>
                <Option value="从高到低">从高到低</Option>
                <Option value="从低到高">从低到高</Option>
              </Select>
            </div>
            <p style={{ width: '30%' }}>
              <span>itme：</span>
              <Input style={{ width: '20%', marginRight: '5px' }} />
              <span>至</span>
              <Input style={{ width: '20%', margin: '0 5px' }} />
              <span>元</span>
            </p>
            <p style={{ width: '40%', marginRight: '0' }}>
              <Input placeholder="请输入关键字进行精确搜索" style={{ marginRight: '15px' }} />
              <Button>搜索</Button>
            </p>
          </div>
          {/* 选择goods */}
          <div>
            <div className="goodsKu">
              <span>商品信息</span>
              <span>价格</span>
              <span>规格</span>
              <span>最近一次使用时间</span>
              <span>操作</span>
            </div>
            {/* 循环此处div */}
            {
              goodsLists ?
                goodsLists.map((item, index) => {
                  return(
                    <div key={index} className="goodsKu_child">
                      <p>
                        <img src={item.icon_img} alt="types"/>
                        <span>{item.store_name}</span>
                      </p>
                      <div className="goodsKu_bottom">
                        <img src={item.phone_img1} alt="商品图" />
                        <span>{item.goods_name}</span>
                        <span>{item.pay_price}</span>
                        <span>{item.rules}</span>
                        <span>{item.use_last_time}</span>
                        <Button onClick={()=>this.goodSelectBtn(item.id) } type="primary">选择</Button>
                      </div>
                    </div>
                  )
                })
              :
              ''
            }
            <Pagination className="paginations" defaultPageSize={3} showQuickJumper defaultCurrent={1} total={total} onChange={this.onPagination} />
          </div>
        </Modal>
      </div>
    )
  }
}

export default ReleaseTask
