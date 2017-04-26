CREATE TABLE IF NOT EXISTS t_info_article(
id INTEGER NOT NULL AUTO_INCREMENT,
info_id INTEGER  comment '资讯栏目id',
title varchar(100) comment '标题',
big_title varchar(100) comment '大标题',
name varchar(100) comment '文章名称',
content varchar(10000) comment '内容',
tdk_description varchar(300) comment '描述',
tdk_title varchar(100) comment '标题',
tdk_keyword varchar(100) comment 'keyword',
modify_date datetime  COMMENT'更新时间',
modify_user varchar(50) COMMENT'更新用户',
create_date datetime COMMENT'创建时间',
create_user varchar(50)  COMMENT'创建用户',
is_enable  varchar(1) DEFAULT 1 COMMENT'是否可用',
PRIMARY key(id)
) comment ' 资讯栏目';