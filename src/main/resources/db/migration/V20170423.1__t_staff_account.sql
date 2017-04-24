CREATE TABLE IF NOT EXISTS t_staff_account (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(16) DEFAULT NULL COMMENT '用户名',
  password varchar(32) DEFAULT NULL COMMENT '密码',
  identify_salt varchar(4) DEFAULT NULL COMMENT 'salt',
  register_time datetime DEFAULT NULL COMMENT '注册时间',
  modify_date datetime DEFAULT NULL COMMENT '更新时间',
  modify_user varchar(50) DEFAULT NULL COMMENT '更新用户',
  create_date datetime DEFAULT NULL COMMENT '创建时间',
  create_user varchar(50) DEFAULT NULL COMMENT '创建用户',
  is_enable char(1) DEFAULT '1' COMMENT '是否可用',
  PRIMARY KEY (id),
  UNIQUE KEY unique_username (username)
) COMMENT='员工登陆账户表';

insert into t_staff_account(username,password,identify_salt,register_time) values('admin','A9E43CD0E733ED0CFE4C09C93729EA85','KtQx',SYSDATE());