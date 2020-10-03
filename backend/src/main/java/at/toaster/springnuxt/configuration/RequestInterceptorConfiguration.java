package at.toaster.springnuxt.configuration;

import at.toaster.springnuxt.interceptor.RestRequestInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class RequestInterceptorConfiguration implements WebMvcConfigurer {

    private final RestRequestInterceptor restRequestInterceptor;

    @Autowired
    public RequestInterceptorConfiguration(RestRequestInterceptor restRequestInterceptor) {
        this.restRequestInterceptor = restRequestInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(restRequestInterceptor).addPathPatterns("/**");
    }
}
