package com.forty.ceap.property;


import com.forty.ceap.constants.GlobalConstant;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = GlobalConstant.CONFIG_PREFIX)
public class CeapCoreConfig {

    private String appSecret;

    private TencentApiConfig tencent;
}
