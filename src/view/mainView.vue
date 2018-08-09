<template>
    <div class="mainView">
        <div id="amap" class="amap">
        </div>
        <div class="leftBox">
          <div class="searchBox">
            <div class="idcardBox">
              <div class="imgBox"  v-show="cropedImg!=''&&queryId!=''">
                <img :src="cropedImg" class="cropedImg">
                <div class="closeBox" @click="queryId=''">
                   <img src="../assets/image/close.png" >
                </div>
              </div>
              <el-input
                placeholder="身份证号码和姓名"
                v-model="keyWord" clearable>
                <!-- <el-button slot="append" icon="el-icon-search" class="searchBt" @click="search"></el-button> -->
              </el-input>
              <label  for="fileinput">
                <img  class="pic_icon" src="../assets/image/pic.png" >
              </label>
              <div class="searchBt" @click="search">
                <img src="../assets/image/search_03.png">
              </div>
            </div>
            <div class="timeBox">
              <el-date-picker
                v-model="start"
                :clearable=false
                :editable=false
                :picker-options="pickerOptions0"
                type="datetime"
                value-format="timestamp"
                placeholder="选择开始时间" >
              </el-date-picker>
              ~
              <el-date-picker
                v-model="end"
                :clearable=false
                 :editable=false
                 :picker-options="pickerOptions1"
                type="datetime"
                value-format="timestamp"
                placeholder="选择结束时间" >
              </el-date-picker>
              <img src="../assets/image/time.png" class="time-icon">
            </div>
            <div class="typeBox">
              <el-select v-model="busName" placeholder="请选择公交" class="select">
                <el-option
                  v-for="item in busNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
              <el-select v-model="searchType" placeholder="请选择" class="select">
                <el-option
                  v-for="item in searchTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="listBox" v-loading="loading">
            <div class="top" v-if="personlist.length>0">
              <div class="count">当前乘车伴随记录{{totalCount}}条</div>
            </div>
            <div class="list" v-if="personlist.length>0">
              <ul class="personList" ref="personList">
                <li class="personItem" v-for="(item,index) in personlist" :key="index">
                  <div class="personInfo">
                      <img :src="item.imageUrl" class="person-img">
                      <div class="personText">
                        <div class="row">
                          <div class="left">乘车人：</div>
                          <div class="cname" v-if="item.personName" @click.stop="openPerson(item.pId)">{{item.personName}}</div>
                          <div class="name" v-else>未识别</div>
                          <div class="important" v-if="item.personType=='criminal'">重点人</div>
                          <div class="location">
                            <img src="../assets/image/location.png" >
                          </div>
                        </div>
                        <div class="row">
                          <div class="left">最近一次乘车：</div>
                          <div class="right">25路-5226</div>
                        </div>
                        <div class="row">
                          <div class="left">最近乘车时间：</div>
                          <div class="right">{{item.uploadDate}}</div>
                        </div>
                        <div class="row">
                          <div class="left">最近乘车地点：</div>
                          <div class="right">{{item.address}}</div>
                        </div>
                      </div>
                  </div>
                  <div class="countBox" @click="togglePeerList(index)">
                    <hr>
                    <span>伴随记录({{item.peerList.length}})</span>
                    <img src="../assets/image/arrow.png" class="arrow" :class="{rotateZ:!item.isHidePeerList}">
                  </div>
                  <div class="peerListBox" :class="{hide:item.isHidePeerList}" v-if="item.peerList.length>0">
                    <el-checkbox v-model="item.checked" class="checkBox">只看重点人</el-checkbox>
                    <ul class="peerList">
                      <li class="peerItem" v-for="(peerItem,peerIndex) in checkedfilter(item.peerList,item.checked)" :key="peerIndex" @click="peerItemClick(peerItem.id)">
                          <img :src="peerItem.peersSource" class="peerimg">
                          <div class="peername" v-if="peerItem.peersPersonName" @click.stop="openPerson(item.pId)">{{peerItem.peersPersonName}}</div>
                          <div class="name" v-else>未识别</div>
                          <div class="important" v-if="peerItem.peersPersonType=='criminal'">重点人</div>
                          <span class="time">{{peerItem.peersUploadDate}}</span>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div class="paginationBox" v-if="personlist.length>0">
              <el-pagination
                layout="prev, pager, next"
                :total="totalCount" :page-size="pageSize" class="pagination" @current-change="pageChange">
              </el-pagination>
            </div>
            <div class="noData" v-if="personlist.length==0&&!isFirst">
              <img src="../assets/image/noData.png">
            </div>
          </div>
        </div>
        <div class="cropperBox" :class="isShowCropper?'show':'hide'">
          <div class="cropperTitle">
              请框选图片中要识别的人脸
              <img src="../assets/image/close.png" @click="closeCropper">
          </div>
          <vueCropper class="vueCropper"
            ref="cropper"
            :img="cropperImg"
            :outputSize=1
            outputType="jpg"
            :autoCrop=true
            :centerBox=true
          ></vueCropper>
          <div class="cropperBottom">
           <el-button @click="getCropData">识别人脸</el-button>
          </div>
        </div>
        <div class="originImageWrap">
            <div class="originImage">
            </div>
            <img class="close" src="../assets/image/close1.png" alt="" @click="colseOriginImage">
        </div>
        <div class="dialogWrap" :class="{show:showPopPeerList}">
            <div class="dialog">
                <div class="ui-dialog-titlebar">
                    <span class="ui-dialog-title">请选择伴随人员</span>
                    <div class="ui-dialog-titlebar-close" @click="closePopList"></div>
                </div>
                <div id="select-pop" class="ui-dialog-content">
                  <div class="mouseon" v-for="item in popPeerList" :key="item.id" @click="popPeerClick(item)">
                      <img :src="item.peersSource" alt="">
                  </div>
                </div>
            </div>
        </div>
         <input type="file" id="fileinput" ref="fileinput" @change="handleFileChange" style="display:none" accept="image/*" />
    </div>
</template>

<script>
import $ from "jquery";
import "../assets/js/zmap.js";
import moment from "moment";
import axios from "axios";
import VueCropper from "vue-cropper";
const infoWindowTpl = require("./tpl/infoWindowTpl.art");
const originImgTpl = require("./tpl/originImgTpl.art");
//tab切换
window.tab = function(temp) {
  let $this = $(temp);
  if (!$this.hasClass("curr")) {
    let index = $this.data("index");
    $("#peerImg").toggleClass("hide");
    $("#fullImg").toggleClass("hide");
    $("#peerInfoBox").toggleClass("hide");
    $("#fullInfoBox").toggleClass("hide");

    $this.siblings().removeClass("curr");
    $this.addClass("curr");
  }
};
//底图展示
window.originImgShow = function(personFullUrl, followFullUrl) {
  let data = {
    personFullUrl,
    followFullUrl
  };
  let tpl = originImgTpl({
    data: data
  });
  $(".originImage").html(tpl);
  $(".originImageWrap").css("display", "flex");
};
export default {
  name: "mainView",
  data() {
    return {
      zmap: null,
      map: null,
      markersCluster: null,
      popup: null,
      keyWord: "", //姓名或身份证号
      start: "", //开始时间
      end: "", //结束时间
      pageNo: 1, //当前页数
      pageSize: 10, //每页条数
      queryId: "", //图片pid
      totalCount: 0, //总条数
      cropperImg: "", //剪裁前的图片
      cropedImg: "", //剪裁后的图片
      isShowCropper: false, //是否显示剪裁区域
      loading: false, //loading图展示
      isFirst: true, //是否是第一次加载
      popPeerList: [], //pop窗口伴随人员数据
      showPopPeerList: false,
      busName: "",
      busNameOptions: [],
      searchType: "1",
      searchTypeOptions: [
        {
          value: "1",
          label: "所有人员"
        },
        {
          value: "2",
          label: "重点人员"
        },
        {
          value: "3",
          label: "普通人员"
        }
      ],
      checked: false,
      isHidePeerList: true,
      personlist: [],
      pickerOptions0: {
        disabledDate: time => {
          return time.getTime() > this.end;
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          return time.getTime() < this.start;
        }
      }
    };
  },
  mounted() {
    let self = this;
    this.zmap = new ZMap();
    this.zmap.loadMap("/police/application/config.json", function() {
      self.initMap();
    });
  },
  methods: {
    //关闭底图展示区域
    colseOriginImage() {
      $(".originImage").html("");
      $(".originImageWrap").css("display", "none");
    },
    //伴随人员列表过滤 重点人
    checkedfilter(list, checked) {
      if (checked) {
        return list.filter(function(item) {
          return item.peersPersonType == "criminal";
        });
      } else {
        return list;
      }
    },
    //选择人员头像
    handleFileChange() {
      var self = this;
      let inputDOM = this.$refs.fileinput;
      console.log(inputDOM.files[0]);
      if (inputDOM.files[0]) {
        var reader = new FileReader();
        reader.onload = function() {
          self.cropperImg = this.result;
          self.isShowCropper = true;
          // 清空图片上传框的值
          self.$refs.fileinput.value = "";
        };
        reader.readAsDataURL(inputDOM.files[0]);
      }
    },
    //清除以图搜人的人员id
    clearQueryId() {
      this.queryId = "";
    },
    //获取剪裁区域的图片
    getCropData() {
      // 获取截图的blob数据
      let self = this;
      this.$refs.cropper.getCropBlob(data => {
        let file = new window.File([data], "temp.png", { type: data.type });
        var reader = new FileReader();
        reader.onload = function() {
          self.cropedImg = this.result;
          let param = new FormData();
          param.append("upload", file);
          self.getPersonByImg(param);
        };
        reader.readAsDataURL(file);
      });
    },
    //识别人脸
    getPersonByImg(param) {
      let self = this;
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post("/police/person/getPersonByImg.action", param, config)
        .then(function(response) {
          console.log(response.data);
          if (response.data.status) {
            self.queryId = response.data.result.id;
            self.closeCropper();
          } else {
            self.closeCropper();
            self.$alert("未识别人员,请重试", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //关闭图片剪裁区域
    closeCropper() {
      this.isShowCropper = false;
    },
    //伴随记录展开收缩
    togglePeerList(index) {
      this.personlist[index].isHidePeerList = !this.personlist[index]
        .isHidePeerList;
    },
    //地图初始化
    initMap() {
      var self = this;
      this.map = this.zmap.Map({
        container: document.getElementById("amap"),
        center: [118.733553, 31.987817],
        zoom: 12
      });
      this.markersCluster = this.zmap.MarkerClusterer(this.map, [], {
        click: function(beans) {
          if (self.map.getZoom() == 18 || self.map.getZoom() == 17) {
            if (beans.length > 0) {
              self.getMarkersInfor(beans);
            } else {
            }
          } else {
            if (beans.length > 0) {
              //根据点的数组自动调整缩放级别和地图中心
              self.setZoom(beans);
            } else {
            }
          }
        }
      });
      this.map.addLayer(this.markersCluster);
      this.init();
    },
    //当地图层级缩放到最大时，展示对应的pop窗口
    getMarkersInfor(markers) {
      let peersSourceArr = [];
      markers.forEach(item => {
        peersSourceArr.push(item.data);
      });
      this.popPeerList = peersSourceArr;
      this.showPopPeerList = true;
    },
    //关闭对应的pop窗口
    closePopList() {
      this.showPopPeerList = false;
    },
    //展示对应pop
    popPeerClick(item) {
      console.log(item);
      this.showPopPeerList = false;
      this.setCenter(item);
      this.openInfo(item);
    },
    //初始化
    init() {
      this.initTime();
      this.initBusList();
      this.followPersonQuery();
    },
    //获取车辆列表，搜索条件
    initBusList() {
      let self = this;
      this.loading = true;
      axios
        .get("/police/aicamera/aicameraGroupJson.action")
        .then(function(response) {
          console.log(response.data);
          self.busNameOptions = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //时间初始化
    initTime() {
      this.start = moment(
        moment("2018-07-01").format("YYYY-MM-DD") + " 00:00:00"
      ).format("x");
      this.end = moment(moment().format("YYYY-MM-DD") + " 23:59:59").format(
        "x"
      );
    },
    //伴随人员请求
    followPersonQuery() {
      let url =
        "/police/userlog/followPersonQuery.action??followPersonFilter.pageSize=" +
        this.pageSize +
        "&followPersonFilter.pageNo=" +
        this.pageNo +
        "&followPersonFilter.startTime=" +
        this.startTime +
        "&followPersonFilter.endTime=" +
        this.endTime +
        "&followPersonFilter.keyWord=" +
        this.keyWord +
        "&followPersonFilter.queryId=" +
        this.queryId;
      let self = this;
      this.loading = true;
      axios
        .get(url)
        .then(function(response) {
          console.log(response.data);
          self.isFirst = false;
          self.loading = false;
          if (response.data.result.length > 0) {
            response.data.result.forEach(element => {
              element.isHidePeerList = true; //添加伴随人员列表收缩展开字段 默认展开
              element.checked = false; //添加是否重点人checkbox是否勾选字段  默认不勾选
            });
            self.personlist = response.data.result;
            self.totalCount = response.data.totalCount;
            if (self.$refs.personList) {
              self.$refs.personList.scrollTop = 0;
            }
          } else {
            self.personlist = [];
            self.totalCount = 0;
          }
          self.showMarkers();
        })
        .catch(function(error) {
          self.loading = false;
          console.log(error);
        });
    },
    //分页
    pageChange(page) {
      this.pageNo = page;
      this.followPersonQuery();
    },
    //打开详情
    openPerson(id) {
      //todo
      console.log(id);
    },
    //搜索
    search() {
      if (this.popup != null) {
        this.map.removeInfoWindow(this.popup);
      }
      this.pageNo = 1;
      this.followPersonQuery();
    },
    //地图上显示marker
    showMarkers() {
      this.markersCluster.clearMarkers(); //清除所有marker
      let self = this;
      this.personlist.forEach((element, index) => {
        element.peerList.forEach((item, index2) => {
          if (index == 0 && index2 == 0) {
            let location = JSON.parse(item.location);
            self.map.setCenter([location.longitude, location.latitude]);
          }
          self.addMarker(item, element.personName, element.personType);
        });
      });
    },
    //聚合点点击时，根据聚合的点将地图缩放到对应区域
    setZoom(bPoints) {
      var tempbdPoint = bPoints[0].position;
      var maxLon = tempbdPoint[0];
      var minLon = tempbdPoint[0];
      var maxLat = tempbdPoint[1];
      var minLat = tempbdPoint[1];
      for (var i = 0; i < bPoints.length; i++) {
        tempbdPoint = bPoints[i].position;
        if (maxLon < tempbdPoint[0]) {
          maxLon = tempbdPoint[0];
        }
        if (minLon > tempbdPoint[0]) {
          minLon = tempbdPoint[0];
        }
        if (maxLat < tempbdPoint[1]) {
          maxLat = tempbdPoint[1];
        }
        if (minLat > tempbdPoint[1]) {
          minLat = tempbdPoint[1];
        }
      }
      console.log(maxLon + "<<>>" + maxLat + "<<>>" + minLon + "<<>>" + minLat);
      this.map.zoomToBounds([minLon, minLat], [maxLon, maxLat]);
    },
    //添加单个marker
    addMarker(item, personName, personType) {
      let self = this;
      let location = JSON.parse(item.location);
      let position = [location.longitude, location.latitude];
      item.personName = personName;
      item.personType = personType;
      let marker = self.zmap.Marker([position[0], position[1]], {
        content:
          '<img src="' +
          require("../assets/image/car.png") +
          '" style="width: 28px; height: 30px;">',
        offset: {
          x: 0,
          y: -30
        },
        data: item
      });
      marker.on("click", this.markerClick);
      // self.markers.push(marker);
      // if (hasFollowId && i == 0) {
      //   //点击某个伴随统计，显示信息框
      //   self.openInfo(item);
      // }
      self.markersCluster.addMarker(marker);
    },
    //单个marker点击事件
    markerClick(data) {
      this.openInfo(data.data);
    },
    //伴随人员列表点击
    peerItemClick(id) {
      let self = this;
      this.markersCluster.getMarkers().forEach(item => {
        if (item.data.data.id == id) {
          self.setCenter(item.data.data);
          self.openInfo(item.data.data);
        }
      });
    },
    //设置地图中心点
    setCenter(item) {
      let location = JSON.parse(item.location);
      this.map.setZoom(17);
      this.map.setCenter([location.longitude, location.latitude]);
    },
    //在指定位置打开信息窗体
    openInfo(item) {
      let location = JSON.parse(item.location);
      if (this.popup != null) {
        this.map.removeInfoWindow(this.popup);
      }
      // this.popup = new FHMap.Popup({ contentHTML: infoWindowTpl({ data: item }), lonlat: new FHMap.LonLat(location.longitude, location.latitude), autoSize: true, closeBox: true });
      // this.map.addPopup(this.popup);
      this.popup = this.zmap.InfoWindow(this.map, {
        position: [location.longitude, location.latitude],
        content: infoWindowTpl({
          data: item
        })
      });
      this.popup.show();
    }
  },
  computed: {
    startTime: function() {
      return moment(Number(this.start)).format("YYYY-MM-DD HH:mm:ss");
    },
    endTime: function() {
      return moment(Number(this.end)).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  components: {
    VueCropper
  }
};
</script>

<style lang="scss" scoped>
.mainView {
  width: 100%;
  height: 100%;
  .amap {
    width: 100%;
    height: 100%;
  }
  .leftBox {
    width: 420px;
    background: rgba(0, 0, 0, 0);
    position: absolute;
    top: 10px;
    left: 10px;
    bottom: 10px;
    z-index: 5007;
    display: flex;
    flex-direction: column;
    .searchBox {
      width: 100%;
      height: 143px;
      background: white;
      padding: 15px 25px;
      border-radius: 4px;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.38);
      .imgBox {
        height: 28px;
        border: 1px solid #dcdfe6;
        margin-top: 2px;
        margin-left: 2px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .cropedImg {
          height: 100%;
        }
        .closeBox {
          width: 14px;
          cursor: pointer;
          img {
            width: 10px;
            height: 10px;
            margin-left: 2px;
          }
        }
      }
      .idcardBox {
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
      }
      .pic_icon {
        margin-top: 4px;
      }
      .searchBt {
        background: #2985f7;
        padding: 0 15px;
        display: flex;
        align-items: center;
      }
      .timeBox {
        border: 1px solid #dcdfe6;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
        border-radius: 4px;
        .time-icon {
          width: 38px;
          height: 16px;
          padding: 0 10px;
        }
      }
      .typeBox {
        margin-top: 10px;
        display: flex;
        .select {
          flex: 1;
          &:first-child {
            margin-right: 5px;
          }
        }
      }
    }
    .listBox {
      background: white;
      margin-top: 10px;
      flex: 1;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.38);
      .top {
        padding: 15px 20px;
        border-bottom: 1px solid #e6ebf5;
        .count {
          background: #e6ebf5;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          color: #5a5e66;
          border-radius: 4px;
          padding-left: 10px;
        }
      }
      .list {
        flex: 1;
        display: flex;
        .important {
          font-size: 12px;
          color: #fa5555;
          background: #feeeee;
          padding: 2px 10px;
          border-radius: 10px;
          margin-left: 10px;
        }
        .personList {
          height: 100%;
          width: 100%;
          overflow-y: auto;
          .personItem {
            margin: 10px 10px;

            .personInfo {
              padding: 10px;
              display: flex;
              flex-direction: row;
              align-items: center;
              cursor: pointer;
              &:hover {
                background: #edf2fc;
              }
              .person-img {
                width: 80px;
                height: 80px;
                margin-right: 10px;
              }
              .personText {
                flex: 1;
                display: flex;
                flex-direction: column;
                .row {
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  font-size: 14px;
                  .cname {
                    color: #2985f7;
                    max-width: 90px;
                  }
                  .left {
                    width: 100px;
                    color: #a2aabb;
                  }
                  .right {
                    flex: 1;
                    color: #2d2f33;
                    // word-break: break-all;
                    // overflow: hidden;
                    // text-overflow: ellipsis;
                    // height: 20px;
                    // display: -webkit-box;
                    // -webkit-box-orient: vertical;
                    // -webkit-line-clamp: 1;
                  }
                  .location {
                    flex: 1;
                    text-align: right;
                  }
                }
              }
            }
            .countBox {
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 5px 10px;
              cursor: pointer;
              hr {
                flex: 1;
                height: 1px;
                border: none;
                border-top: 1px solid #e6ebf5;
              }
              span {
                font-size: 14px;
                color: #5a5e66;
                margin: 0 20px;
              }
              .arrow {
                transition-duration: 0.3s;
              }
              .rotateZ {
                transform: rotateZ(-180deg);
              }
            }
            .peerListBox {
              margin: 0 10px;
              .checkBox {
                padding: 0px 0px;
              }
              .peerList {
                padding-bottom: 10px;
                border-bottom: 1px solid #e6ebf5;
                .peerItem {
                  font-size: 14px;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  margin: 10px 0;
                  cursor: pointer;
                  &:last-child {
                    margin: 10px 0 0 0;
                  }
                  .peerimg {
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                  }
                  .peername {
                    color: #2985f7;
                  }
                  .time {
                    color: #2d2f33;
                    flex: 1;
                    text-align: right;
                  }
                }
              }
            }
          }
        }
      }
      .paginationBox {
        width: 100%;
        margin: 5px 0;
        .pagination {
          float: right;
        }
      }
      .noData {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .cropperBox {
    position: absolute;
    z-index: 10000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 600px;
    height: 400px;
    background: white;
    border: 1px solid #d4d5d5;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.38);
    .cropperTitle {
      font-size: 16px;
      color: #2d2f33;
      text-align: center;
      line-height: 40px;
      position: relative;
      img {
        position: absolute;
        right: 0;
        top: 0;
        width: 40px;
        height: 40px;
        padding: 10px;
      }
    }
    .vueCropper {
      width: 600px;
      height: 300px;
    }
    .cropperBottom {
      width: 100%;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .originImageWrap {
    display: none;
    position: absolute;
    z-index: 5008;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    top: 0px;
    .originImage {
      display: flex;
      img {
        height: 320px;
        width: auto;
        margin: 0px 10px;
        display: block;
        border-radius: 4px;
      }
    }
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 30px;
      height: 30px;
    }
  }
  .dialogWrap {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 6000;
    top: 0;
    .dialog {
      border: 1px solid #c5c5c5;
      border-radius: 6px;
      background: #ffffff;
      color: #333333;
      padding: 0.2em;
      box-shadow: 0 0 10px rgba(189, 189, 189, 0.4);
      display: block;
      z-index: 10006;
      outline: 0px;
      position: absolute;
      height: auto;
      width: 339px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      // top: 0;
      // left: 0;
      // right: 0;
      // bottom: 0;
      // margin: auto;
      .ui-dialog-titlebar {
        position: relative;
        border-radius: 3px;
        border: 1px solid #dddddd;
        background: #e9e9e9;
        color: #333333;
        font-weight: bold;
        width: 325px;
        margin-left: 2px;
        height: 34px;
        .ui-dialog-title {
          line-height: 34px;
          margin-left: 14px;
          font-size: 14px;
          white-space: nowrap;
          width: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ui-dialog-titlebar-close {
          width: 14px;
          height: 14px;
          background: url("../assets/image/close.png") no-repeat;
          background-size: 100% 100%;
          position: absolute;
          right: 0.3em;
          top: 50%;
          margin: -7px 0 0 0;
          cursor: pointer;
        }
      }
      .ui-dialog-content {
        width: 100%;
        min-height: 98.6px;
        max-height: 255px;
        height: auto;
        position: relative;
        border: 0;
        padding: 5px;
        background: none;
        overflow: auto;
        font-size: 16px;
        color: #333333;
        .mouseon {
          cursor: pointer;
          border: 1px solid #ccc;
          width: 70px;
          height: 75px;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0;
          margin: 4px;
          float: left;
          &:hover {
            border: 1px solid #ff0b03;
          }
          img {
            justify-content: center;
            align-items: center;
            max-width: 66px !important;
            max-height: 71px !important;
          }
        }
      }
    }
  }
}
::-webkit-scrollbar {
  width: 8px;
  background-color: white;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: white;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #d4d5d5;
}
.hide {
  display: none;
}
.show {
  display: block !important;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
<style lang="scss">
.inforBox {
  width: 360px;
  height: 320.5px;
  position: relative;
  .hide {
    display: none;
  }
  .headImg {
    width: 100%;
  }
  .infoBox {
    padding: 20px;
    .row {
      display: flex;
      flex-direction: row;
      align-items: center;
      .left {
        color: #a2aabb;
      }
      .name {
        color: #2985f7;
      }
      .important {
        font-size: 12px;
        color: #fa5555;
        background: #feeeee;
        padding: 2px 10px;
        border-radius: 10px;
        margin-left: 10px;
      }
      .location {
        flex: 1;
        text-align: right;
      }
    }
  }
  .myTab {
    position: absolute;
    width: 180px;
    height: 40px;
    top: 163px;
    left: 0;
    background: white;
    display: flex;
    .tabItem {
      flex: 1;
      text-align: center;
      line-height: 40px;
      border-bottom: 1px solid #d4d5d5;
      &:first-child {
        border-right: 1px solid #d4d5d5;
      }
    }
    .curr {
      border-bottom: 0;
      color: #2985f7;
    }
  }
}
.el-icon-time {
  display: none;
}
.el-date-editor .el-input__inner {
  padding-left: 15px;
  padding-right: 5px;
  border: 0;
}
.idcardBox .el-input__inner {
  border: 0;
}
.el-input__inner:focus {
  outline: 0;
  border-color: #dcdfe6;
}
.el-select .el-input__inner:focus {
  border-color: #dcdfe6;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #dcdfe6;
}
.ol-popup-closer {
  color: white !important;
}
</style>





