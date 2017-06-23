CREATE TABLE t_user(
  id int(11) NOT NULL AUTO_INCREMENT COMMENT '成员id',
  name varchar(50)  COMMENT '姓名',
  address varchar(50)  COMMENT '所在地',
  phone varchar(20)  COMMENT '所在地',
  staff_id int(11) COMMENT '密码表ID',
  PRIMARY KEY (id)
)COMMENT='成员表';


INSERT INTO t_user(name,address,phone,staff_id) VALUES ('admin','xxx','13500000001',1);
INSERT INTO t_user(name,address,phone,staff_id) VALUES ('xxx','xxx','13500000002',2);