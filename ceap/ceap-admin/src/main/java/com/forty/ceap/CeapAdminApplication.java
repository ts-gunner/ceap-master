package com.forty.ceap;

import com.forty.ceap.property.CeapCoreConfig;
import org.apache.dubbo.config.spring.context.annotation.EnableDubbo;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDubbo
@MapperScan("com.forty.ceap.mapper")
@SpringBootApplication
@EnableDiscoveryClient
@EnableConfigurationProperties({CeapCoreConfig.class})
public class CeapAdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(CeapAdminApplication.class, args);
    }

}