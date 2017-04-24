package com.sdd.repository;

import com.sdd.entity.StaffAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface StaffAccountRepository extends JpaRepository<StaffAccount, Integer> {

    StaffAccount findByUsername(String username);

}
