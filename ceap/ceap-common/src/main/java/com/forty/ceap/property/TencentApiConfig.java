package com.forty.ceap.property;

import com.forty.ceap.constants.GlobalConstant;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = GlobalConstant.CONFIG_PREFIX + ".tencent")
public class TencentApiConfig {

    private String appId;

    private String secretId;

    private String secretKey;

    private ObjectStoreConfig objectStore;

    // 对象存储
    @Data
    public static class ObjectStoreConfig {
        // 地区名
        private String regionName;

        // 存储桶名称
        private String buckName;

        // 存储路径（公网）
        private String baseStorePath;

        // 存储位置
        private String saveDirPath;
    }
}
