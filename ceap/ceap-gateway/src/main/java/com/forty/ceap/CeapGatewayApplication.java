package com.forty.ceap;

import org.apache.dubbo.config.spring.context.annotation.EnableDubbo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDubbo
@EnableDiscoveryClient
@SpringBootApplication
public class CeapGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(CeapGatewayApplication.class, args);
    }

}
