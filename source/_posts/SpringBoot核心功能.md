
---

title: SpringBoot核心功能
date: 2023-07-11 22:37
updated: 2023-07-11 22:37
tags: SpringBoot
categories: SpringBoot
keywords: SpringBoot
description: SpringBoot 核心功能  学习

---

# SpringBoot核心功能

重点：

springboot使用的springmvc的底层 所有请求都经过 DispatchServlet.java文件

## 1. 配置文件

### 1.文件类型

**properties文件的优先级高于yaml**

#### 1.1 properties

同以前的properties用法

#### 1.2 yaml

##### 1.2.1 简介

YAML 是 "YAML Ain't Markup Language"（YAML 不是一种标记语言）的递归缩写。在开发的这种语言时，YAML 的意思其实是："Yet Another Markup Language"（仍是一种标记语言）。 

非常适合用来做以数据为中心的配置文件

##### 1.2.2 基本语法

- key: value；kv之间有空格
- 大小写敏感
- 使用缩进表示层级关系
- 缩进不允许使用tab，只允许空格
- 缩进的空格数不重要，只要相同层级的元素左对齐即可
- '#'表示注释
- 字符串无需加引号，如果要加，''与""表示字符串内容 会被 转义/不转义

**‘  ’**会被以串字符串输出

##### 1.2.3 数据类型

- 字面量：单个的、不可再分的值。date、boolean、string、number、null

~~~yaml
k: v
~~~

- 对象：键值对的集合。map、hash、set、object 

~~~yaml
行内写法：  k: {k1:v1,k2:v2,k3:v3}
#或
k: 
  k1: v1
  k2: v2
  k3: v3
~~~

- 数组：一组按次序排列的值。array、list、queue

~~~yaml
行内写法：  k: [v1,v2,v3]
#或者
k:
 - v1
 - v2
 - v3
~~~

##### 1.2.4 示例

~~~java
@Data
public class Person {
	
	private String userName;
	private Boolean boss;
	private Date birth;
	private Integer age;
	private Pet pet;
	private String[] interests;
	private List<String> animal;
	private Map<String, Object> score;
	private Set<Double> salarys;
	private Map<String, List<Pet>> allPets;
}

@Data
public class Pet {
	private String name;
	private Double weight;
}
~~~

~~~yaml
# yaml表示以上对象
person:
  userName: zhangsan
  boss: false
  birth: 2019/12/12 20:12:33
  age: 18
  pet: 
    name: tomcat
    weight: 23.4
  interests: [篮球,游泳]
  animal: 
    - jerry
    - mario
  score:
    english: 
      first: 30
      second: 40
      third: 50
    math: [131,140,148]
    chinese: {first: 128,second: 136}
  salarys: [3999,4999.98,5999.99]
  allPets:
    sick:
      - {name: tom}
      - {name: jerry,weight: 47}
    health: [{name: mario,weight: 47}]
~~~

### 2. 配置提示

自定义的类和配置文件绑定一般没有提示。

如何来使它有提示：

~~~xml
<!--        用于自定义的类和配置文件绑定后有提示-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
            <optional>true</optional>
        </dependency>

<build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
<!--                用于打包后将自定义的类和配置文件绑定提示的相关依赖去除 减少文件占用-->
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.springframework.boot</groupId>
                            <artifactId>spring-boot-configuration-processor</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
~~~

## 2. Web开发

![image-20220509133335937](C:\Users\26524\AppData\Roaming\Typora\typora-user-images\image-20220509133335937.png)



### 1. SpringMVC自动配置概览

Spring Boot provides auto-configuration for Spring MVC that **works well with most applications.(大多场景我们都无需自定义配置)**

The auto-configuration adds the following features on top of Spring’s defaults:

- Inclusion of `ContentNegotiatingViewResolver` and `BeanNameViewResolver` beans.

- - 内容协商视图解析器和BeanName视图解析器

- Support for serving static resources, including support for WebJars (covered [later in this document](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-spring-mvc-static-content))).

- - 静态资源（包括webjars）

- Automatic registration of `Converter`, `GenericConverter`, and `Formatter` beans.

- - 自动注册 `Converter，GenericConverter，Formatter `

- Support for `HttpMessageConverters` (covered [later in this document](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-spring-mvc-message-converters)).

- - 支持 `HttpMessageConverters` （后来我们配合内容协商理解原理）

- Automatic registration of `MessageCodesResolver` (covered [later in this document](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-spring-message-codes)).

- - 自动注册 `MessageCodesResolver` （国际化用）

- Static `index.html` support.

- - 静态index.html 页支持

- Custom `Favicon` support (covered [later in this document](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-spring-mvc-favicon)).

- - 自定义 `Favicon`  

- Automatic use of a `ConfigurableWebBindingInitializer` bean (covered [later in this document](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-spring-mvc-web-binding-initializer)).

- - 自动使用 `ConfigurableWebBindingInitializer` ，（DataBinder负责将请求数据绑定到JavaBean上）

If you want to keep those Spring Boot MVC customizations and make more [MVC customizations](https://docs.spring.io/spring/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc) (interceptors, formatters, view controllers, and other features), you can add your own `@Configuration` class of type `WebMvcConfigurer` but **without** `@EnableWebMvc`.

**不用@EnableWebMvc注解。使用** `**@Configuration**` **+** `**WebMvcConfigurer**` **自定义规则**



If you want to provide custom instances of `RequestMappingHandlerMapping`, `RequestMappingHandlerAdapter`, or `ExceptionHandlerExceptionResolver`, and still keep the Spring Boot MVC customizations, you can declare a bean of type `WebMvcRegistrations` and use it to provide custom instances of those components.

**声明** `**WebMvcRegistrations**` **改变默认底层组件**



If you want to take complete control of Spring MVC, you can add your own `@Configuration` annotated with `@EnableWebMvc`, or alternatively add your own `@Configuration`-annotated `DelegatingWebMvcConfiguration` as described in the Javadoc of `@EnableWebMvc`.

**使用** `**@EnableWebMvc+@Configuration+DelegatingWebMvcConfiguration 全面接管SpringMVC**`

### 2.简单功能分析

#### 2.1 静态资源访问

##### 1. 静态资源目录

只要静态资源放在类路径下： called `/static` (or `/public` or `/resources` or `/META-INF/resources`

访问 ： 当前项目根路径/ + 静态资源名 



原理： 静态映射/**。

请求进来，先去找Controller看能不能处理。不能处理的所有请求又都交给静态资源处理器。静态资源也找不到则响应404页面



改变默认的静态资源路径

~~~yaml
spring:
  mvc:
    static-path-pattern: /res/**

  resources:
    static-locations: [classpath:/haha/]
~~~

##### 2.静态资源访问前缀

~~~yaml
spring:
  mvc:
    static-path-pattern: /res/**
~~~

当前项目 + static-path-pattern + 静态资源名 = 静态资源文件夹下找

##### 3.webjar

一些静态资源通过地址进行访问或者调用，首先导入相关静态资源的依赖如（jquery)在找到相关包所在的路径通过返回值进行返回

自动映射 /[webjars](http://localhost:8080/webjars/jquery/3.5.1/jquery.js)/**

https://www.webjars.org/

~~~xml
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>jquery</artifactId>
            <version>3.5.1</version>
        </dependency>
~~~

访问地址：[http://localhost:8080/webjars/**jquery/3.5.1/jquery.js**](http://localhost:8080/webjars/jquery/3.5.1/jquery.js)   后面地址要按照依赖里面的包路径

#### 2.2 欢迎页支持

- 静态资源路径下  index.html

- - 可以配置静态资源路径

  - 但是不可以配置静态资源的访问前缀。否则导致 index.html不能被默认访问

    ~~~yaml
    spring:
    #  mvc:
    #    static-path-pattern: /res/**     #这个会导致welcome page功能失效
       resources:
         static-locations: [classpath:/yu/]
    ~~~

    - controller能处理/index

#### 2.3 、自定义 `Favicon`

favicon.ico 放在静态资源目录下即可。

~~~yaml
spring:
#  mvc:
#    static-path-pattern: /res/**   这个会导致 Favicon 功能失效
~~~

#### 2.4 静态资源配置原理

![image-20220509155320298](C:\Users\26524\AppData\Roaming\Typora\typora-user-images\image-20220509155320298.png)

![image-20220509155414389](C:\Users\26524\AppData\Roaming\Typora\typora-user-images\image-20220509155414389.png)

- SpringBoot启动默认加载  xxxAutoConfiguration 类（自动配置类）
- SpringMVC功能的自动配置类 WebMvcAutoConfiguration，生效

~~~java
@Configuration(proxyBeanMethods = false)
@ConditionalOnWebApplication(type = Type.SERVLET)
@ConditionalOnClass({ Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class })
@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE + 10)
@AutoConfigureAfter({ DispatcherServletAutoConfiguration.class, TaskExecutionAutoConfiguration.class,
		ValidationAutoConfiguration.class })
public class WebMvcAutoConfiguration {}
~~~

- 给容器中配了什么。

~~~java
	@Configuration(proxyBeanMethods = false)
	@Import(EnableWebMvcConfiguration.class)
	@EnableConfigurationProperties({ WebMvcProperties.class, ResourceProperties.class })
	@Order(0)
	public static class WebMvcAutoConfigurationAdapter implements WebMvcConfigurer {}
~~~

- 配置文件的相关属性和xxx进行了绑定。WebMvcProperties==**spring.mvc**、ResourceProperties==**spring.resources**

##### 1、配置类只有一个有参构造器

~~~java
	//有参构造器所有参数的值都会从容器中确定
//ResourceProperties resourceProperties；获取和spring.resources绑定的所有的值的对象
//WebMvcProperties mvcProperties 获取和spring.mvc绑定的所有的值的对象
//ListableBeanFactory beanFactory Spring的beanFactory
//HttpMessageConverters 找到所有的HttpMessageConverters
//ResourceHandlerRegistrationCustomizer 找到 资源处理器的自定义器。=========
//DispatcherServletPath  
//ServletRegistrationBean   给应用注册Servlet、Filter....
	public WebMvcAutoConfigurationAdapter(ResourceProperties resourceProperties, WebMvcProperties mvcProperties,
				ListableBeanFactory beanFactory, ObjectProvider<HttpMessageConverters> messageConvertersProvider,
				ObjectProvider<ResourceHandlerRegistrationCustomizer> resourceHandlerRegistrationCustomizerProvider,
				ObjectProvider<DispatcherServletPath> dispatcherServletPath,
				ObjectProvider<ServletRegistrationBean<?>> servletRegistrations) {
			this.resourceProperties = resourceProperties;
			this.mvcProperties = mvcProperties;
			this.beanFactory = beanFactory;
			this.messageConvertersProvider = messageConvertersProvider;
			this.resourceHandlerRegistrationCustomizer = resourceHandlerRegistrationCustomizerProvider.getIfAvailable();
			this.dispatcherServletPath = dispatcherServletPath;
			this.servletRegistrations = servletRegistrations;
		}
~~~

##### 2、资源处理的默认规则

~~~java
@Override
		public void addResourceHandlers(ResourceHandlerRegistry registry) {
			if (!this.resourceProperties.isAddMappings()) {
				logger.debug("Default resource handling disabled");
				return;
			}
			Duration cachePeriod = this.resourceProperties.getCache().getPeriod();
			CacheControl cacheControl = this.resourceProperties.getCache().getCachecontrol().toHttpCacheControl();
			//webjars的规则
            if (!registry.hasMappingForPattern("/webjars/**")) {
				customizeResourceHandlerRegistration(registry.addResourceHandler("/webjars/**")
						.addResourceLocations("classpath:/META-INF/resources/webjars/")
						.setCachePeriod(getSeconds(cachePeriod)).setCacheControl(cacheControl));
			}
            
            //
			String staticPathPattern = this.mvcProperties.getStaticPathPattern();
			if (!registry.hasMappingForPattern(staticPathPattern)) {
				customizeResourceHandlerRegistration(registry.addResourceHandler(staticPathPattern)
						.addResourceLocations(getResourceLocations(this.resourceProperties.getStaticLocations()))
						.setCachePeriod(getSeconds(cachePeriod)).setCacheControl(cacheControl));
			}
		}
~~~

~~~yaml
spring:
#  mvc:
#    static-path-pattern: /res/**

  resources:
    add-mappings: false   禁用所有静态资源规则
~~~

~~~java
@ConfigurationProperties(prefix = "spring.resources", ignoreUnknownFields = false)
public class ResourceProperties {

	private static final String[] CLASSPATH_RESOURCE_LOCATIONS = { "classpath:/META-INF/resources/",
			"classpath:/resources/", "classpath:/static/", "classpath:/public/" };

	/**
	 * Locations of static resources. Defaults to classpath:[/META-INF/resources/,
	 * /resources/, /static/, /public/].
	 */
	private String[] staticLocations = CLASSPATH_RESOURCE_LOCATIONS;
~~~

##### 3.欢迎页的处理规则

~~~java
	HandlerMapping：处理器映射。保存了每一个Handler能处理哪些请求。	

	@Bean
		public WelcomePageHandlerMapping welcomePageHandlerMapping(ApplicationContext applicationContext,
				FormattingConversionService mvcConversionService, ResourceUrlProvider mvcResourceUrlProvider) {
			WelcomePageHandlerMapping welcomePageHandlerMapping = new WelcomePageHandlerMapping(
					new TemplateAvailabilityProviders(applicationContext), applicationContext, getWelcomePage(),
					this.mvcProperties.getStaticPathPattern());
			welcomePageHandlerMapping.setInterceptors(getInterceptors(mvcConversionService, mvcResourceUrlProvider));
			welcomePageHandlerMapping.setCorsConfigurations(getCorsConfigurations());
			return welcomePageHandlerMapping;
		}

	WelcomePageHandlerMapping(TemplateAvailabilityProviders templateAvailabilityProviders,
			ApplicationContext applicationContext, Optional<Resource> welcomePage, String staticPathPattern) {
		if (welcomePage.isPresent() && "/**".equals(staticPathPattern)) {
            //要用欢迎页功能，必须是/**
			logger.info("Adding welcome page: " + welcomePage.get());
			setRootViewName("forward:index.html");
		}
		else if (welcomeTemplateExists(templateAvailabilityProviders, applicationContext)) {
            // 调用Controller  /index
			logger.info("Adding welcome page template: index");
			setRootViewName("index");
		}
	}

~~~

##### 4.favicon

浏览器会发送/favicon.ico请求获取到图标，整个session期间不在获取

### 3.请求参数处理

#### 0 请求映射

 @RequestMapping(value = "/user",method = RequestMethod.DELETE)   和
    @DeleteMapping("/user")    是相同的，能够完成同种功能。

##### 1.rest使用与原理

- @xxxMapping；
- Rest风格支持（*使用**HTTP**请求方式动词来表示对资源的操作*）

- - *以前：**/getUser*  *获取用户*    */deleteUser* *删除用户*   */editUser*  *修改用户*      */saveUser* *保存用户*
  - *现在： /user*    *GET-**获取用户*    *DELETE-**删除用户*     *PUT-**修改用户*      *POST-**保存用户*
  - 核心Filter；HiddenHttpMethodFilter

- - - 用法： 表单method=post，隐藏域 _method=put
    - SpringBoot中手动开启

- - 扩展：如何把_method 这个名字换成我们自己喜欢的

~~~java
======================================前端=======================
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>你好</title>
</head>
<body>
<h1>Speingboot 2 你好</h1>
<form action="/user" method="get">
    <input value="REST-GET 提交 查" type="submit">
</form>
<form action="/user" method="post">
    <input value="REST-POST 提交 增" type="submit">
</form>
<form action="/user" method="post">
    <input name="_method" type="hidden" value="DELETE">
    <input value="REST-DELETE 提交 删" type="submit">
</form>
<form action="/user" method="post">
    <input name="_method" type="hidden" value="PUT">
    <input value="REST-PUT 提交 改 一般用于修改" type="submit">
</form>
</body>
</html>
    ====================后端========================
//    @RequestMapping(value = "/user",method = RequestMethod.GET)
    @GetMapping("/user")
    public String getUser(){
        return "GET-张三";
    }
    
//    @RequestMapping(value = "/user",method = RequestMethod.POST)
    @PostMapping("/user")
    public String postUser(){
        return "POST-张三";
    }
    
//    @RequestMapping(value = "/user",method = RequestMethod.PUT)
    @PutMapping("/user")
    public String putUser(){
        return "PUT-张三";
    }
    
//    @RequestMapping(value = "/user",method = RequestMethod.DELETE)
    @DeleteMapping("/user")
    public String deleteUser(){
        return "DELETE-张三";
    }


//SpringBoot中手动开启HiddenHttpMethodFilter   原理部分
	@Bean
	@ConditionalOnMissingBean(HiddenHttpMethodFilter.class)
	@ConditionalOnProperty(prefix = "spring.mvc.hiddenmethod.filter", name = "enabled", matchIfMissing = false)
	public OrderedHiddenHttpMethodFilter hiddenHttpMethodFilter() {
		return new OrderedHiddenHttpMethodFilter();
	}


/**
 * 自定义filter   可以在controller也可以在config里面   即 Put DELETE等提交方式 使用from表单时如何_method 替换成自己定义的
 *             <form action="/user" method="post">
 *    <input name="_method" type="hidden" value="PUT">
 *     <input name="_m" type="hidden" value="PUT">
 *     <input value="REST-PUT 提交 改 一般用于修改" type="submit">
 * </form>
 */
    @Bean
    public HiddenHttpMethodFilter hiddenHttpMethodFilter(){
        HiddenHttpMethodFilter methodFilter = new HiddenHttpMethodFilter();
        methodFilter.setMethodParam("_m");
        return methodFilter;
    }
=======================开启HiddenHttpMethodFilter================================
    spring:
  mvc:
    hiddenmethod:
      filter:
        enabled: true   #开启页面表单的Rest功能
~~~

Rest原理（表单提交要使用REST的时候）

- 表单提交会带上**_method=PUT**
- **请求过来被**HiddenHttpMethodFilter拦截

- - 请求是否正常，并且是POST

- - - 获取到**_method**的值。
    - 兼容以下请求；**PUT**.**DELETE**.**PATCH**
    - **原生request（post），包装模式requesWrapper重写了getMethod方法，返回的是传入的值。**
    - **过滤器链放行的时候用wrapper。以后的方法调用getMethod是调用****requesWrapper的。**

**Rest使用客户端工具，**

- 如PostMan直接发送Put、delete等方式请求，无需Filter。

~~~yaml
spring:
  mvc:
    hiddenmethod:
      filter:
        enabled: true   #开启页面表单的Rest功能
~~~

##### 2. 请求映射原理

![image-20220510140832254](C:\Users\26524\AppData\Roaming\Typora\typora-user-images\image-20220510140832254.png)

SpringMVC功能分析都从 org.springframework.web.servlet.DispatcherServlet-》doDispatch（）

![image-20220510141536945](C:\Users\26524\AppData\Roaming\Typora\typora-user-images\image-20220510141536945.png)

~~~java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpServletRequest processedRequest = request;
		HandlerExecutionChain mappedHandler = null;
		boolean multipartRequestParsed = false;

		WebAsyncManager asyncManager = WebAsyncUtils.getAsyncManager(request);

		try {
			ModelAndView mv = null;
			Exception dispatchException = null;

			try {
				processedRequest = checkMultipart(request);
				multipartRequestParsed = (processedRequest != request);

				// 找到当前请求使用哪个Handler（Controller的方法）处理
				mappedHandler = getHandler(processedRequest);
                
                //HandlerMapping：处理器映射。/xxx->>xxxx
~~~

![image-20220510140933607](C:\Users\26524\AppData\Roaming\Typora\typora-user-images\image-20220510140933607.png)

**RequestMappingHandlerMapping**：保存了所有@RequestMapping 和handler的映射规则。

![image-20220510141027345](C:\Users\26524\AppData\Roaming\Typora\typora-user-images\image-20220510141027345.png)

所有的请求映射都在HandlerMapping中。

- SpringBoot自动配置欢迎页的 WelcomePageHandlerMapping 。访问 /能访问到index.html；
- SpringBoot自动配置了默认 的 RequestMappingHandlerMapping
- 请求进来，挨个尝试所有的HandlerMapping看是否有请求信息。

- - 如果有就找到这个请求对应的handler
  - 如果没有就是下一个 HandlerMapping

- 我们需要一些自定义的映射处理，我们也可以自己给容器中放**HandlerMapping**。自定义 **HandlerMapping**

~~~java
	protected HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception {
		if (this.handlerMappings != null) {
			for (HandlerMapping mapping : this.handlerMappings) {
				HandlerExecutionChain handler = mapping.getHandler(request);
				if (handler != null) {
					return handler;
				}
			}
		}
		return null;
	}
~~~

### 4.普通参数与基本注解

#### 4.1 注解

@PathVariable、@RequestHeader、@ModelAttribute、@RequestParam、@MatrixVariable、@CookieValue、@RequestBody

~~~java

@RestController
public class ParameterTestController {


/**
 * 前提 ： @GetMapping("/car/{id}/owner/{username}")
 *1.@PathVariable  路径变量
 *  前端访问   <a href="/car/3/owner/lisi">car/{id}/owner/{username}</a>
 * 即能获取到浏览器地址栏中的变量   带有参数就只去参数 不带参数可以通过
 * {@PathVariable Map<String,String> pv} Map<String,String> 来获取全部 map的泛型必须是String
 * 2.@RequestHeader  该注解是 用于获取请求头   集具体用法类似于1
 *3.@RequestParam  获取请求参数   例：
 * 前端部分   <a href="/car/3/owner/lisi?age=18&initers=bask&initers=aaa">car/{id}/owner/{username}</a>
 * @RequestParam("age") Integer age,  获取单个参数
 * @RequestParam("initers") List<String> initers,  获取列表
 * @RequestParam Map<String, String> params    获取全部参数
 *4.@CookieValue  获取cookie  必须要有其名字   以Cookie为 类型不能添加至Map之中进行返回前端，在后端拿到Cookie后能作相应处理
 * @CookieValue("Webstorm-f21fb5b0") String _dd,
 *  @CookieValue("Webstorm-f21fb5b0") Cookie cookie
 *  5.@RequestBody   获取请求体【POST】
 *  前端 ： <form action="/save" method="post">
 *     测试RequestBody获取数据<br/>
 *     用户名：<input name="username"><br/>
 *     邮箱：<input name="email"><br/>
 *     <input type="submit" value="提交">
 * </form>
 * 获取到的数据为 拼接后的数据   "conter": "username=yu&email=2837041086%40qq.com"
 */

    @GetMapping("/car/{id}/owner/{username}")
    public Map<String,Object> getCar(
            @PathVariable("id") Integer id,
            @PathVariable("username") String name,
            @PathVariable Map<String,String> pv,
            @RequestHeader("User-Agent") String userAgent,
            @RequestHeader Map<String,String> header,
            @RequestParam("age") Integer age,
            @RequestParam("initers") List<String> initers,
            @RequestParam Map<String,String> params,
            @CookieValue("Webstorm-f21fb5b0") String _dd,
            @CookieValue("Webstorm-f21fb5b0") Cookie cookie
            ){
        Map<String,Object> map = new HashMap<>();
//        map.put("id",id);
//        map.put("username",name);
//        map.put("pv",pv);
//        map.put("userAgent",userAgent);
//        map.put("header",header);
        map.put("age",age);
        map.put("initers",initers);
        map.put("params",params);
        map.put("_dd",_dd);
//        map.put("cookie",cookie);
        System.out.println(cookie.getName()+"===>"+cookie.getValue());
        return map;
    }

    @PostMapping("/save")
    public Map postMeth(@RequestBody String conter){
        Map<String,Object> map = new HashMap<>();
        map.put("conter",conter);
//        System.out.println(conter.toString());
//        System.out.println(conter.toLowerCase());
        return map;
    }

//    矩阵变量
//   1.语法： /car/sell;low=89;brand=cc,aa,dd
//    2.springboot默认是禁用了矩阵变量的功能
//            手动开启：原理。 对路径的处理。 UrlPathHelper进行解析
//                removeSemicoloContent （移除分好内容）  支持矩阵变量
//    3.矩阵变量必须有url路径变量（    @GetMapping("/car/{path}")）才能被解析
    @GetMapping("/car/{path}")
    public Map carsSell(
            @MatrixVariable("low") Integer low,
            @MatrixVariable("brand") List<String> brand,
            @PathVariable("path") String path
    ){
        Map<String,Object> map = new HashMap<>();
        map.put("low",low);
        map.put("brand",brand);
        map.put("path",path);
        return map;
    }
    @GetMapping("/boss/{bossId}/{empId}")
    public Map boss(
            @MatrixVariable(value = "age",pathVar = "bossId") Integer bossAge,
            @MatrixVariable(value = "age",pathVar = "empId") Integer empAge
    ){
        Map<String,Object> map = new HashMap<>();
        map.put("bossAge",bossAge);
        map.put("empAge",empAge);
        return map;
    }

}
===========================前端==================================
    测试基本注解：
<ul>
<!--    <a href="/car/3/owner/lisi">car/{id}/owner/{username}</a>-->
    <a href="/car/3/owner/lisi?age=18&initers=bask&initers=aaa">car/{id}/owner/{username}</a>
    <li>@PathVariable(路径变量)</li>
    <li>@RequestHeader(获取请求头)</li>
    <li>@RequestParam(获取请求参数)</li>
    <li>@CookieValue(获取cookie)</li>
    <li>@RequestBody(获取请求体【POST】)</li>

    <li>@RequestAttribute(获取request域属性)</li>
    <li>@MatrixVariable(矩阵变量)</li>
</ul>
<br/>
<h2>request域属性所需</h2>
<form action="/save" method="post">
    测试RequestBody获取数据<br/>
    用户名：<input name="username"><br/>
    邮箱：<input name="email"><br/>
    <input type="submit" value="提交">
</form>
<br/>
<h2>矩阵变量所需</h2>
/cars/{path}?xxx=xxx&aaa=ccc  querySting查询字符串。@RequesParam;<br/>
/cars/{path;low=89;brand=cc,aa,dd}   矩阵变量<br/>
页面开发，cookie禁用了，session里面的内容怎么使用；
session.set(a,b)---》jsession---》cookie---》每次发送请求携带
url重写：/abc；jsessionid=xxx   把cookie的值使用矩阵变量的方式进行传递<br/>
<a href="/car/sell;low=89;brand=cc,aa,dd">@MatrixVariable(矩阵变量)/car/sell;low=89;brand=cc,aa,dd</a><br/>
<a href="/car/sell;low=89;brand=cc;brand=aa;brand=dd">@MatrixVariable(矩阵变量)/car/sell;low=89;brand=cc;brand=aa;brand=dd</a><br/>
<a href="/boss/1;age=20/2;age10">@MatrixVariable(矩阵变量)/boss/{boosId}/{empId}</a><br/>
<ol>
    <li>矩阵变量需要在springboot中手动开启</li>
    <li>根据RFC3896的规范，矩阵变量应当绑定在路径变量中</li>
    <li>若是有多个矩阵变量，应当使用英文符号;进行分隔</li>
    <li>若是一个矩阵变量有多个值，应当使用英文符号,进行分隔，或命名多个重复的key即可</li>
    <li>如：/car/sell;low=89;brand=cc,aa,dd</li>
</ol>
~~~

