CREATE TABLE t_info_article(
id INTEGER NOT NULL AUTO_INCREMENT,
info_id INTEGER  comment '资讯栏目id',
title varchar(100) comment '标题',
big_title varchar(100) comment '大标题',
name varchar(100) comment '文章名称',
content varchar(10000) comment '内容',
tdk_description varchar(300) comment '描述',
tdk_title varchar(100) comment '标题',
tdk_keyword varchar(100) comment 'keyword',
type_id INTEGER  comment '项目类型ID 1:办公建筑，2:城市规划，3:工业与交通建筑，4:建筑改造及装饰装修,5:教育建筑,6:酒店与休闲建筑,7:居住建筑,8:绿化与景观,9:商业与服务建筑,10:文化与体育建筑,11:医疗与科研建筑',
file_path varchar(1000) COMMENT'项目图片地址',
modify_date datetime  COMMENT'更新时间',
modify_user varchar(50) COMMENT'更新用户',
create_date datetime COMMENT'创建时间',
create_user varchar(50)  COMMENT'创建用户',
is_enable  varchar(1) DEFAULT 1 COMMENT'是否可用',
PRIMARY key(id)
) comment ' 资讯栏目';