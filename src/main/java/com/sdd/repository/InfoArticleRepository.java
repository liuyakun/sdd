package com.sdd.repository;

import com.sdd.entity.InfoArticle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Created by chenhao on 2017/1/17.
 */
@Repository
public interface InfoArticleRepository extends JpaRepository<InfoArticle,Integer>{

    @Query(value = "select info from  InfoArticle info where  (?1 is null or info.name = concat('%',concat(?1,'%') ))  " +
            " and (?2 is null or info.infoId = ?2)")
    Page<InfoArticle> page(String name, Integer infoId, Pageable p);
}
