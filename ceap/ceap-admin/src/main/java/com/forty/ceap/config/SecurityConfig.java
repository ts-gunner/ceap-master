package com.forty.ceap.config;


import com.forty.ceap.security.AuthenticationEntryPointImpl;
import com.forty.ceap.security.AuthorizationAccessDeniedHandler;
import com.forty.ceap.security.JwtAuthenticationTokenFilter;
import com.forty.ceap.service.impl.SecurityAdminServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


/**
 * Spring Security教程： https://blog.csdn.net/2301_78646673/article/details/134801772
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private SecurityAdminServiceImpl securityAdminService;

    /**
     * Token校验过滤器
     * @return
     */
    @Bean
    public JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter() {
        return new JwtAuthenticationTokenFilter();
    }

    /**
     * 身份认证失败处理
     * @return
     */
    @Bean
    public AuthenticationEntryPointImpl unauthorizedEntryPoint() {
        return new AuthenticationEntryPointImpl();
    }

    /**
     * 权限校验失败处理权限不足的情况，适用于已认证但权限不够的用户.
     */
    @Bean
    public AuthorizationAccessDeniedHandler accessDeniedHandler() {
        return new AuthorizationAccessDeniedHandler();
    }

    @Bean
    public AuthenticationManager authenticationManager(PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(securityAdminService);
        // 将使用的密码编译器加入进来
        provider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(provider);
    }
    /**
     * anyRequest          |   匹配所有请求路径
     * access              |   SpringEl表达式结果为true时可以访问
     * anonymous           |   匿名可以访问
     * denyAll             |   用户不能访问
     * fullyAuthenticated  |   用户完全认证可以访问（非remember-me下自动登录）
     * hasAnyAuthority     |   如果有参数，参数表示权限，则其中任何一个权限可以访问
     * hasAnyRole          |   如果有参数，参数表示角色，则其中任何一个角色可以访问
     * hasAuthority        |   如果有参数，参数表示权限，则其权限可以访问
     * hasIpAddress        |   如果有参数，参数表示IP地址，如果用户IP和参数匹配，则可以访问
     * hasRole             |   如果有参数，参数表示角色，则其角色可以访问
     * permitAll           |   用户可以任意访问
     * rememberMe          |   允许通过remember-me登录的用户访问
     * authenticated       |   用户登录后可访问
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // 关闭csrf
        http
            .csrf(it -> it.disable())
            .authorizeHttpRequests(it ->
                    it
                        .requestMatchers("/auth/signin").permitAll()
                        .requestMatchers("/swagger-resources/**").permitAll()
                        .requestMatchers("/webjars/**").permitAll()
                        .requestMatchers("/v3/**").permitAll()
                        .requestMatchers("/api/**").permitAll()
                        .requestMatchers("/api-docs/**").permitAll()
                        .requestMatchers("/doc.html/**").permitAll()
                        .requestMatchers("/favicon.ico").permitAll()
                        .anyRequest().authenticated()  // 其他路径都要进行拦截
                    );
        http.exceptionHandling(exception -> exception
                        .authenticationEntryPoint(unauthorizedEntryPoint())
                         .accessDeniedHandler(accessDeniedHandler())
                    );
        http.addFilterBefore(jwtAuthenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
