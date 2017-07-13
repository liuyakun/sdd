package com.sdd.entityShow;

import java.util.Date;

public class InfoArticleShow {
    private Integer id;
    private Integer infoId;  // 资讯栏目id
    private String title;  //标题
    private String bigTitle;  //大标题
    private String name;  //文章名称
    private String content; //内容

    private String tdkDescription;    //描述
    private String tdkTitle;  //标题
    private String tdkKeyword;  //keyword
    private Integer typeId; //项目类型ID 1:办公建筑，2:城市规划，3:工业与交通建筑，4:建筑改造及装饰装修,5:教育建筑,6:酒店与休闲建筑,7:居住建筑,8:绿化与景观,9:商业与服务建筑,10:文化与体育建筑,11:医疗与科研建筑
    private Integer twoTypeId;  //项目二级菜单ID

    private String filePath; //项目图片地址

    private Date modifyDate;  //修改时间
    private Date createDate;  //创建时间
    private String createUser; //创建用户
    private String modifyUser; //修改用户
    private String isEnable;      //是否可用

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getInfoId() {
        return infoId;
    }

    public void setInfoId(Integer infoId) {
        this.infoId = infoId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBigTitle() {
        return bigTitle;
    }

    public void setBigTitle(String bigTitle) {
        this.bigTitle = bigTitle;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTdkDescription() {
        return tdkDescription;
    }

    public void setTdkDescription(String tdkDescription) {
        this.tdkDescription = tdkDescription;
    }

    public String getTdkTitle() {
        return tdkTitle;
    }

    public void setTdkTitle(String tdkTitle) {
        this.tdkTitle = tdkTitle;
    }

    public String getTdkKeyword() {
        return tdkKeyword;
    }

    public void setTdkKeyword(String tdkKeyword) {
        this.tdkKeyword = tdkKeyword;
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public Integer getTwoTypeId() {
        return twoTypeId;
    }

    public void setTwoTypeId(Integer twoTypeId) {
        this.twoTypeId = twoTypeId;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public String getIsEnable() {
        return isEnable;
    }

    public void setIsEnable(String isEnable) {
        this.isEnable = isEnable;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}
