package com.sdd.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="t_info_article")
public class InfoArticle {
    private Integer id;
    private Integer infoId;  //类型ID 1:新闻，2:项目，3:人才招聘
    private String title;  //标题
    private String bigTitle;  //大标题
    private String name;  //文章名称
    private String content; //内容

    private String tdkDescription;    //描述
    private String tdkTitle;  //标题
    private String tdkKeyword;  //keyword
    private Integer typeId;



    private Date createDate;  //创建时间
    private Date modifyDate;  //修改时间
    private String createUser; //创建用户
    private String modifyUser; //修改用户
    private String isEnable;      //是否可用


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
}
