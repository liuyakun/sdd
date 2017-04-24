package com.sdd.entity;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by wh on 2016/1/21.
 */

@Entity
@Table(name="t_staff_account")
public class StaffAccount implements Serializable {

    private static final long serialVersionUID = 3176972228965536016L;
    private int id;
    private String username; //用户名称
    private String password; //密码
    private String salt; //salt
    private Date registTime; //注册时间
    private Date modifyDate; //修改时间
    private String modifyUser; //修改用户
    private Date createDate; //创建时间
    private String createUser; //创建用户
    private char isEnable; //是否可用

    public StaffAccount() {
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, insertable = true, updatable = true)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name = "username", nullable = false, insertable = true, updatable = true)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Column(name = "password", nullable = false, insertable = true, updatable = true)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "identify_salt", nullable = false, insertable = true, updatable = true)
    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    @Column(name = "register_time", nullable = false, insertable = true, updatable = true)
    public Date getRegistTime() {
        return registTime;
    }

    public void setRegistTime(Date registTime) {
        this.registTime = registTime;
    }

    @Column(name = "modify_date", nullable = false, insertable = true, updatable = true)
    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    @Column(name = "modify_user", nullable = false, insertable = true, updatable = true)
    public String getModifyUser() {
        return modifyUser;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    @Column(name = "create_date", nullable = false, insertable = true, updatable = true)
    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    @Column(name = "create_user", nullable = false, insertable = true, updatable = true)
    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    @Column(name = "is_enable", nullable = false, insertable = true, updatable = true)
    public char getIsEnable() {
        return isEnable;
    }

    public void setIsEnable(char isEnable) {
        this.isEnable = isEnable;
    }
}
