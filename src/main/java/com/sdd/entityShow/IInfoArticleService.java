package com.hpe.article;

import org.springframework.data.domain.PageImpl;

/**
 * Created by chenhao on 2017/1/17.
 */
public interface IInfoArticleService {
    /**
     * 新增
     * @param show
     * @return 1成功 2失败
     */
    public int add(InfoArticleShow show);

    /**
     * 更新
     * @param show
     * @return  1：成功  2  不存在
     */
    public int update(InfoArticleShow show);

    /**
     * 删除文章
     * @param id
     * @return  1成功  2 失败
     */
    public int delete(Integer id);


    /**
     * 通过id查询
     * @param id
     * @return
     */
    public InfoArticleShow getById(Integer id);

    /**
     *
     * @param name  名称
     * @param currentPage
     * @param pageSize
     * @return
     */
    public PageImpl<InfoArticleShow> page(String name,Integer infoId,Integer currentPage, Integer pageSize);
}
