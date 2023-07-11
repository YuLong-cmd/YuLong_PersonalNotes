---

title: SpringBoot基础入门
date: 2023-07-11 22:37
updated: 2023-07-11 22:37
tags: SpringBoot
categories: SpringBoot
keywords: SpringBoot
description: SpringBoot 基础入门  学习

---

## SpringBoot笔记

### 缺失 ：

meven------本地meven{

使用阿里云下载，及默认JDK

}

## 重要注解

#### 1.@RestController{

```
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Controller
@ResponseBody   //声明返回的为字符串 而不是要跳转的路径
```

}

#### 2.@ResponseBody的作用其实是将java对象转为json格式的数据。

@responseBody注解的作用是将controller的方法返回的对象通过适当的转换器转换为指定的格式之后，写入到response对象的body区，通常用来返回JSON数据或者是XML数据。
注意：在使用此注解之后不会再走视图处理器，而是直接将数据写入到输入流中，他的效果等同于通过response对象输出指定格式的数据。

@ResponseBody是作用在方法上的，@ResponseBody 表示该方法的返回结果直接写入 HTTP response body 中，一般在异步获取数据时使用【也就是AJAX】。
注意：在使用 @RequestMapping后，返回值通常解析为跳转路径，但是加上 @ResponseBody 后返回结果不会被解析为跳转路径，而是直接写入 HTTP response body 中。 比如异步获取 json 数据，加上 @ResponseBody 后，会直接返回 json 数据。@RequestBody 将 HTTP 请求正文插入方法中，使用适合的 HttpMessageConverter 将请求体写入某个对象。

### 1.基础案例 Holle Word

#### 01基本流程

1.创建maven工程

2.引入依赖

```java
<!--    使用springboot开发-->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.5.RELEASE</version>
    </parent>

    <dependencies>
<!--        web场景依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

```



3.创建主程序

```java
/**
 * 主程序类
 * @SpringBootApplication 声明这是一个springboot应用
 * */
@SpringBootApplication
public class HMin {
    public static void main(String[] args) {
        SpringApplication.run(HMin.class,args);
    }
}
```



4.编写业务

```java
@RestController
public class HelloController {

    @RequestMapping("hello")
    public String handle01(){
        return "hello Springboot 2";
    }
}
```



5.测试

直接运行main方法

6.简化配置

配置都在application.properties文件之中进行

```
server.port=8889
```

7.简化部署

```xml
 <build>
<!--        用于将项目进行打包 打包的类型在上边设置     <packaging>jar</packaging>-->
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
```

把项目打成jar包，直接在目标服务器执行即可。



### 2.了解自动配置

#### 2.1依赖管理

#####  2.1.1父项目做依赖管理

 ```xml
 依赖管理    
 <parent>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-parent</artifactId>
         <version>2.3.4.RELEASE</version>
 </parent>
 
 他的父项目
  <parent>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-dependencies</artifactId>
     <version>2.3.4.RELEASE</version>
   </parent>
 
 几乎声明了所有开发中常用的依赖的版本号,自动版本仲裁机制
 ```

#####  2.1.2开发导入starter场景启动器

~~~xml
1、见到很多 spring-boot-starter-* ： *就某种场景
2、只要引入starter，这个场景的所有常规需要的依赖我们都自动引入
3、SpringBoot所有支持的场景
https://docs.spring.io/spring-boot/docs/current/reference/html/using-spring-boot.html#using-boot-starter
4、见到的  *-spring-boot-starter： 第三方为我们提供的简化开发的场景启动器。
5、所有场景启动器最底层的依赖
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter</artifactId>
  <version>2.3.4.RELEASE</version>
  <scope>compile</scope>
</dependency>
~~~

#####  2.1.3无需关注版本号，自动版本仲裁

```
1、引入依赖默认都可以不写版本
2、引入非版本仲裁的jar，要写版本号。
```

##### 2.1.4 可以修改默认版本号

```xml
1、查看spring-boot-dependencies里面规定当前依赖的版本 用的 key。
2、在当前项目里面重写配置
    <properties>
        <mysql.version>5.1.43</mysql.version>
    </properties>
```

#### 2.2自动配置

##### 2.2.1自动配好Tomcat

- - 引入Tomcat依赖。

  - 配置Tomcat

    ~~~xml
    <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-tomcat</artifactId>
          <version>2.3.4.RELEASE</version>
          <scope>compile</scope>
        </dependency>
    ~~~

    ##### 2.2.2自动配好SpringMVC

    - - 引入SpringMVC全套组件
      - 自动配好SpringMVC常用组件（功能）

    ##### 2.2.3自动配好Web常见功能，如：字符编码问题

    - - SpringBoot帮我们配置好了所有web开发的常见场景

    ##### 2.2.4默认的包结构

    - - 主程序所在包及其下面的所有子包里面的组件都会被默认扫描进来
      - 无需以前的包扫描配置
      - 想要改变扫描路径，**@SpringBootApplication(scanBasePackages="com.atguigu")**

    - - - 或者@ComponentScan 指定扫描路径

```java
@SpringBootApplication
等同于
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan("com.atguigu.boot")
```



##### 2.2.5各种配置拥有默认值

- - 默认配置最终都是映射到某个类上，如：MultipartProperties
  - 配置文件的值最终会绑定每个类上，这个类会在容器中创建对象

##### 2.2.6按需加载所有自动配置项

- - 非常多的starter
  - 引入了哪些场景这个场景的自动配置才会开启
  - SpringBoot所有的自动配置功能都在 spring-boot-autoconfigure 包里面

### 3.容器功能

#### 3.1组件添加

##### 1.Configuration详解

- 基本使用
- **Full模式与Lite模式**

- - 示例
  - 最佳实战

- - - 配置 类组件之间无依赖关系用Lite模式加速容器启动过程，减少判断
    - 配置类组件之间有依赖关系，方法会被调用得到之前单实例组件，用Full模式

```java
#############################基础类示例######################################################
/**
 * 宠物类
 * */
public class Pet {
    private String name;

    public Pet() {
    }

    public Pet(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Pet{" +
                "name='" + name + '\'' +
                '}';
    }
}


/**
 * 用户类
 * */
public class User {
    private String name;
    private Integer age;

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", pet=" + pet +
                '}';
    }

    private Pet pet;


    public User(String name,Integer age) {
        this.name = name;
        this.age = age;
    }
    public User() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }
}


#############################Configuration使用示例######################################################

/***
 * 配置类里面使用@Bean标注在方法上给容器注册组件，默认也是单实例的
 *2.配置类本身也是组件
 * 3.proxyBeanMethods：代理bean的方法
 * 为true则不管创建多少都会调用容器里的它们本身是相同的
 * 为false则相反并且不走代理
 *
 * full（proxyBeanMethods = true）、lite（proxyBeanMethods = false）
 * 组件依赖
 */
@Configuration(proxyBeanMethods = true)   //告诉springboot这是一个配置类== 配置文件
public class bean {

    /**
     *Full外部无论对配置类中的这个组件注册方法调用多少次获取的都是之前注册容器中的单例对象
     */
    @Bean
    //给容器添加组件，以方法名作为组件id。 返回类型就是组件类型。返回值就是组件在容器中的实例
    public User user00(){
        User zhangsan =new User("张三",18);
        //user组件依赖了pet组件
        zhangsan.setPet(tomPet());
        return zhangsan ;
    }

    @Bean("tomm")
    public Pet tomPet(){
        return  new Pet("tom");
    }

}

################################@Configuration测试代码如下########################################

/**
 * 主程序类
 * @SpringBootApplication 声明这是一个springboot应用
 * */
//@SpringBootApplication(scanBasePackages = "com.yu")

@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan("com.yu")
public class HMin {
    public static void main(String[] args) {
//        1.返回我们IOC容器
        ConfigurableApplicationContext run = SpringApplication.run(HMin.class, args);

//        2.查看容器里面的组件
        String[] names=run.getBeanDefinitionNames();
        for (String name:names) {
            System.out.println(name);
        }

//        3.从容器之中获取组件
        Pet tom01 =run.getBean("tomm", Pet.class);
        Pet tom02 =run.getBean("tomm", Pet.class);
        System.out.println("组件"+(tom01==tom02));

//        4.com.yu.config.bean$$EnhancerBySpringCGLIB$$b06a1497@88a8218
        bean bean=run.getBean(bean.class);
        System.out.println(bean);

        //如果@Configuration(proxyBeanMethods = true) 代理对象调用方法。springboot总会检查这个组件是否在容器里
//        保持组件单实例
        User user =bean.user00();
        User user1=bean.user00();
        System.out.println(user == user1);

        User user2=run.getBean("user00",User.class);
        Pet tomm =run.getBean("tomm",Pet.class);

        System.out.println("用户的宠物："+(user2.getPet()==tomm));

    }
}
```

##### 2.@Bean、@Component、@Controller、@Service、@Repository

@Component   	表示这是一个组件

@Controller			表示这是一个控制器

@Service  				表示这是一个业务逻辑组件

@Repository			表示这是数据库层组件

##### 3.@ComponentScan、@Import

@ComponentScan			表示包扫描能够指定包扫描规则

@Import{

```
4.@Import({User.class, DBHelper.class})
 *      给容器中自动创建出这两个类型的组件，(User.class)默认组组件的名字是全类名
 @Import({User.class, DBHelper.class})
@Configuration(proxyBeanMethods = true)   //告诉springboot这是一个配置类== 配置文件
public class bean {
}
```

}

@Import 高级用法： https://www.bilibili.com/video/BV1gW411W7wy?p=8

##### 4.@Conditional  条件注解

条件装配：满足Conditional指定的条件，则进行组件注入或其他操作

![image-20220507135500299](C:\Users\26524\AppData\Roaming\Typora\typora-user-images\image-20220507135500299.png)

```java
=====================测试条件装配==========================
@Configuration(proxyBeanMethods = true)   //告诉springboot这是一个配置类== 配置文件
//@ConditionalOnBean(name = "tomm")   //若容器之中有tomm组件则运行整个bean类
@ConditionalOnMissingBean(name = "tomm")   //若容器之中没有tomm组件则运行整个bean类
public class bean {

    /**
     *Full外部无论对配置类中的这个组件注册方法调用多少次获取的都是之前注册容器中的单例对象
     */
    @Bean
    //给容器添加组件，以方法名作为组件id。 返回类型就是组件类型。返回值就是组件在容器中的实例
    public User user00(){
        User zhangsan =new User("张三",18);
        //user组件依赖了pet组件
        zhangsan.setPet(tomPet());
        return zhangsan ;
    }

    @Bean("tomm")
    public Pet tomPet(){
        return  new Pet("tom");
    }

}
=====================主程序测试==========================
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan("com.yu")
public class HMin {
    public static void main(String[] args) {
//        1.返回我们IOC容器
        ConfigurableApplicationContext run = SpringApplication.run(HMin.class, args);

//        2.查看容器里面的组件
        String[] names=run.getBeanDefinitionNames();
        for (String name:names) {
            System.out.println(name);
        }
  //        测试条件 ConditionalOnMissingBean  ConditionalOnBean  注解所需
        boolean tom = run.containsBean("tomm");//判断容器之中有无某个组件
        System.out.println("容器之中Tom组件："+tom);

        boolean user00 = run.containsBean("user00");
        System.out.println("容器之中user01组件"+user00);
    }
}
=====================输出结果==========================
容器之中Tom组件：true
容器之中user01组件true
```

#### 3.2 原生配置文件引入

##### 1、@ImportResource     主要是为了兼容第三方  注入IOC

```xml
======================bean.xml=========================
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

<!--    原生spring给容器添加组件-->
    <bean id="aaa" class="com.yu.bean.User">
        <property name="name" value="zhangsan"></property>
        <property name="age" value="18"></property>
    </bean>
    <bean id="ccc" class="com.yu.bean.Pet">
        <property name="name" value="tomm"></property>
    </bean>
</beans>
```

```java
======================配置类=================
@Configuration(proxyBeanMethods = true)   //告诉springboot这是一个配置类== 配置文件
@ImportResource("classpath:bean.xml")   //只用写一次，随便一个配置类中就好
public class bean {
    
}
======================主程序类中  测试  =================
        boolean aaa = run.containsBean("aaa");
        boolean ccc = run.containsBean("ccc");
        System.out.println("haha："+aaa);//true
        System.out.println("hehe："+ccc);//true
```

#### 3.3 配置绑定

​	不使用springboot框架：			如何使用Java读取到properties文件中的内容，并且把它封装到JavaBean中，以供随时使用；

```JAVA
public class getProperties {
     public static void main(String[] args) throws FileNotFoundException, IOException {
         Properties pps = new Properties();
         pps.load(new FileInputStream("a.properties"));
         Enumeration enum1 = pps.propertyNames();//得到配置文件的名字
         while(enum1.hasMoreElements()) {
             String strKey = (String) enum1.nextElement();
             String strValue = pps.getProperty(strKey);
             System.out.println(strKey + "=" + strValue);
             //封装到JavaBean。
         }
     }
 }
```

##### 1、@ConfigurationProperties     

​						**@ConfigurationProperties(prefix = "mycar") //与配置文件中的  mycar 前缀相互绑定**

##### 2.  @EnableConfigurationProperties        @ConfigurationProperties

~~~java
############################# Car类 示例######################################################
/**
 * 只有在容器中的组件，才会拥有springboot提供的强大功能
 */
@ConfigurationProperties(prefix = "mycar") //与配置文件中的  mycar 前缀相互绑定
public class Car {
    private String brand;  //品牌
    private Integer price;  //价格
    @Override
    public String toString() {
        return "Car{" +
                "brand='" + brand + '\'' +
                ", price=" + price +
                '}';
    }
    public String getBrand() {
        return brand;
    }
    public void setBrand(String brand) {
        this.brand = brand;
    }
    public Integer getPrice() {
        return price;
    }
    public void setPrice(Integer price) {
        this.price = price;
    }
}
#############################@ConfigurationProperties示例######################################################
@Configuration(proxyBeanMethods = true)   //告诉springboot这是一个配置类== 配置文件  
@EnableConfigurationProperties(Car.class)//1.开启Car配置绑定功能。2.把这个Car这个组件自动注册到容器中
public class bean {
    /**
     *Full外部无论对配置类中的这个组件注册方法调用多少次获取的都是之前注册容器中的单例对象
     */
    @Bean
    //给容器添加组件，以方法名作为组件id。 返回类型就是组件类型。返回值就是组件在容器中的实例
    public User user00(){
        User zhangsan =new User("张三",18);
        //user组件依赖了pet组件
        zhangsan.setPet(tomPet());
        return zhangsan ;
    }
    @Bean("tomm")
    public Pet tomPet(){
        return  new Pet("tom");
    }
}
#############################   application.properties   配置文件示例######################################################
server.port=9999
mycar.brand=yu
mycar.price=10000
############################# 配置对外API 控制层 示例######################################################
@RestController
public class HelloController {
    @Autowired
    Car car;
    @RequestMapping("/car")
    public Car car(){
        return car;
    }
}
~~~

##### 3. @Component         @ConfigurationProperties

~~~java
#############################@ConfigurationProperties示例######################################################

/**
 * 只有在容器中的组件，才会拥有springboot提供的强大功能
 */
@Component //将其加入到容器之中
@ConfigurationProperties(prefix = "mycar") //与配置文件中的  mycar 前缀相互绑定
public class Car {
    private String brand;  //品牌
    private Integer price;  //价格
    @Override
    public String toString() {
        return "Car{" +
                "brand='" + brand + '\'' +
                ", price=" + price +
                '}';
    }
    public String getBrand() {
        return brand;
    }
    public void setBrand(String brand) {
        this.brand = brand;
    }
    public Integer getPrice() {
        return price;
    }
    public void setPrice(Integer price) {
        this.price = price;
    }
}
#############################   application.properties   配置文件示例######################################################
server.port=9999
mycar.brand=yu
mycar.price=10000
############################# 配置对外API 控制层 示例######################################################
@RestController
public class HelloController {
    @Autowired
    Car car;
    @RequestMapping("/car")
    public Car car(){
        return car;
    }
}
~~~

运行结果截图：

​	![image-20220507160301194](C:\Users\26524\AppData\Roaming\Typora\typora-user-images\image-20220507160301194.png)

### 4.自动配置原理入门

#### 4.1引导加载自动配置类

~~~java
===================SpringBootApplication注解内的内容==========================
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(excludeFilters = { @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication{}


======================
    
~~~



##### 1.@SpringBootConfiguration

@Configuration。代表当前是一个配置类

##### 2.ComponentScan

指定扫描哪些包，Spring注解；

例：@ComponentScan("com.yu")

##### 3、@EnableAutoConfiguration

~~~java
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {}
~~~

###### 1、@AutoConfigurationPackage

自动配置包？指定了默认的包规则

~~~java
@Import(AutoConfigurationPackages.Registrar.class)  //给容器中导入一个组件
public @interface AutoConfigurationPackage {}

//利用Registrar给容器中导入一系列组件
//将指定的一个包下的所有组件导入进来？MainApplication 所在包下。

~~~

###### 2、@Import(AutoConfigurationImportSelector.class)

~~~java
1、利用getAutoConfigurationEntry(annotationMetadata);给容器中批量导入一些组件
2、调用List<String> configurations = getCandidateConfigurations(annotationMetadata, attributes)获取到所有需要导入到容器中的配置类
3、利用工厂加载 Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader)；得到所有的组件
4、从META-INF/spring.factories位置来加载一个文件。
	默认扫描我们当前系统里面所有META-INF/spring.factories位置的文件
    spring-boot-autoconfigure-2.3.4.RELEASE.jar包里面也有META-INF/spring.factories
    
~~~

![image-20220508211138147](C:\Users\26524\AppData\Roaming\Typora\typora-user-images\image-20220508211138147.png)

~~~xml
文件里面写死了spring-boot一启动就要给容器中加载的所有配置类
spring-boot-autoconfigure-2.3.4.RELEASE.jar/META-INF/spring.factories
# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration,\
org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration,\
org.springframework.boot.autoconfigure.batch.BatchAutoConfiguration,\
org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration,\
org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration,\
org.springframework.boot.autoconfigure.context.ConfigurationPropertiesAutoConfiguration,\
org.springframework.boot.autoconfigure.context.LifecycleAutoConfiguration,\
org.springframework.boot.autoconfigure.context.MessageSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.context.PropertyPlaceholderAutoConfiguration,\
org.springframework.boot.autoconfigure.couchbase.CouchbaseAutoConfiguration,\
org.springframework.boot.autoconfigure.dao.PersistenceExceptionTranslationAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ReactiveElasticsearchRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ReactiveElasticsearchRestClientAutoConfiguration,\
org.springframework.boot.autoconfigure.data.jdbc.JdbcRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.ldap.LdapRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.neo4j.Neo4jDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.neo4j.Neo4jRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.solr.SolrRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.r2dbc.R2dbcDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.r2dbc.R2dbcRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.r2dbc.R2dbcTransactionManagerAutoConfiguration,\
org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration,\
org.springframework.boot.autoconfigure.data.redis.RedisReactiveAutoConfiguration,\
org.springframework.boot.autoconfigure.data.redis.RedisRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.rest.RepositoryRestMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.data.web.SpringDataWebAutoConfiguration,\
org.springframework.boot.autoconfigure.elasticsearch.ElasticsearchRestClientAutoConfiguration,\
org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration,\
org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration,\
org.springframework.boot.autoconfigure.groovy.template.GroovyTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration,\
org.springframework.boot.autoconfigure.h2.H2ConsoleAutoConfiguration,\
org.springframework.boot.autoconfigure.hateoas.HypermediaAutoConfiguration,\
org.springframework.boot.autoconfigure.hazelcast.HazelcastAutoConfiguration,\
org.springframework.boot.autoconfigure.hazelcast.HazelcastJpaDependencyAutoConfiguration,\
org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration,\
org.springframework.boot.autoconfigure.http.codec.CodecsAutoConfiguration,\
org.springframework.boot.autoconfigure.influx.InfluxDbAutoConfiguration,\
org.springframework.boot.autoconfigure.info.ProjectInfoAutoConfiguration,\
org.springframework.boot.autoconfigure.integration.IntegrationAutoConfiguration,\
org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.JndiDataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.XADataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.JmsAutoConfiguration,\
org.springframework.boot.autoconfigure.jmx.JmxAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.JndiConnectionFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.activemq.ActiveMQAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.artemis.ArtemisAutoConfiguration,\
org.springframework.boot.autoconfigure.jersey.JerseyAutoConfiguration,\
org.springframework.boot.autoconfigure.jooq.JooqAutoConfiguration,\
org.springframework.boot.autoconfigure.jsonb.JsonbAutoConfiguration,\
org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration,\
org.springframework.boot.autoconfigure.availability.ApplicationAvailabilityAutoConfiguration,\
org.springframework.boot.autoconfigure.ldap.embedded.EmbeddedLdapAutoConfiguration,\
org.springframework.boot.autoconfigure.ldap.LdapAutoConfiguration,\
org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration,\
org.springframework.boot.autoconfigure.mail.MailSenderAutoConfiguration,\
org.springframework.boot.autoconfigure.mail.MailSenderValidatorAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.MongoReactiveAutoConfiguration,\
org.springframework.boot.autoconfigure.mustache.MustacheAutoConfiguration,\
org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration,\
org.springframework.boot.autoconfigure.quartz.QuartzAutoConfiguration,\
org.springframework.boot.autoconfigure.r2dbc.R2dbcAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketMessagingAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketRequesterAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketServerAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketStrategiesAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration,\
org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration,\
org.springframework.boot.autoconfigure.security.reactive.ReactiveUserDetailsServiceAutoConfiguration,\
org.springframework.boot.autoconfigure.security.rsocket.RSocketSecurityAutoConfiguration,\
org.springframework.boot.autoconfigure.security.saml2.Saml2RelyingPartyAutoConfiguration,\
org.springframework.boot.autoconfigure.sendgrid.SendGridAutoConfiguration,\
org.springframework.boot.autoconfigure.session.SessionAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.client.servlet.OAuth2ClientAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.client.reactive.ReactiveOAuth2ClientAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.resource.servlet.OAuth2ResourceServerAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.resource.reactive.ReactiveOAuth2ResourceServerAutoConfiguration,\
org.springframework.boot.autoconfigure.solr.SolrAutoConfiguration,\
org.springframework.boot.autoconfigure.task.TaskExecutionAutoConfiguration,\
org.springframework.boot.autoconfigure.task.TaskSchedulingAutoConfiguration,\
org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration,\
org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration,\
org.springframework.boot.autoconfigure.transaction.jta.JtaAutoConfiguration,\
org.springframework.boot.autoconfigure.validation.ValidationAutoConfiguration,\
org.springframework.boot.autoconfigure.web.client.RestTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.web.embedded.EmbeddedWebServerFactoryCustomizerAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.HttpHandlerAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.ReactiveWebServerFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.WebFluxAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.error.ErrorWebFluxAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.function.client.ClientHttpConnectorAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.function.client.WebClientAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.ServletWebServerFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.HttpEncodingAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.websocket.reactive.WebSocketReactiveAutoConfiguration,\
org.springframework.boot.autoconfigure.websocket.servlet.WebSocketServletAutoConfiguration,\
org.springframework.boot.autoconfigure.websocket.servlet.WebSocketMessagingAutoConfiguration,\
org.springframework.boot.autoconfigure.webservices.WebServicesAutoConfiguration,\
org.springframework.boot.autoconfigure.webservices.client.WebServiceTemplateAutoConfiguration

~~~

#### 4.2按需开启自动配置项

~~~java
虽然我们127个场景的所有自动配置启动的时候默认全部加载。xxxxAutoConfiguration
按照条件装配规则（@Conditional），最终会按需配置。
~~~

#### 4.3、修改默认配置

~~~java
        @Bean
		@ConditionalOnBean(MultipartResolver.class)  //容器中有这个类型组件
		@ConditionalOnMissingBean(name = DispatcherServlet.MULTIPART_RESOLVER_BEAN_NAME) //容器中没有这个名字 multipartResolver 的组件
		public MultipartResolver multipartResolver(MultipartResolver resolver) {
            //给@Bean标注的方法传入了对象参数，这个参数的值就会从容器中找。
            //SpringMVC multipartResolver。防止有些用户配置的文件上传解析器不符合规范
			// Detect if the user has created a MultipartResolver but named it incorrectly
			return resolver;
		}
给容器中加入了文件上传解析器；

~~~

SpringBoot默认会在底层配好所有的组件。但是如果用户自己配置了以用户的优先

~~~java
@Bean
	@ConditionalOnMissingBean
	public CharacterEncodingFilter characterEncodingFilter() {
    }
~~~

总结：

- SpringBoot先加载所有的自动配置类  xxxxxAutoConfiguration
- 每个自动配置类按照条件进行生效，默认都会绑定配置文件指定的值。xxxxProperties里面拿。xxxProperties和配置文件进行了绑定
- 生效的配置类就会给容器中装配很多组件
- 只要容器中有这些组件，相当于这些功能就有了
- 定制化配置

- - 用户直接自己@Bean替换底层的组件   必须在有@Configuration(proxyBeanMethods = true)   的类里才能配置
  - 用户去看这个组件是获取的配置文件什么值就去修改。

**xxxxxAutoConfiguration ---> 组件  --->** **xxxxProperties里面拿值  ----> application.properties**

#### 4.4 最佳实践

- 引入场景依赖

- - https://docs.spring.io/spring-boot/docs/current/reference/html/using-spring-boot.html#using-boot-starter

- 查看自动配置了哪些（选做）

- - 自己分析，引入场景对应的自动配置一般都生效了
  - 配置文件中debug=true开启自动配置报告。Negative（不生效）\Positive（生效）

- 是否需要修改

- - 参照文档修改配置项

- - - https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html#common-application-properties
    - 自己分析。xxxxProperties绑定了配置文件的哪些。

- - 自定义加入或者替换组件

- - - @Bean、@Component。。。

- - 自定义器  **XXXXXCustomizer**；
  - ......

#### 4.5 开发小技巧

##### 1  Lombok

简化JavaBean开发

~~~xml
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>


idea中搜索安装lombok插件
~~~

~~~java
===============================简化JavaBean开发===================================
@NoArgsConstructor
//@AllArgsConstructor
@Data
@ToString
@EqualsAndHashCode
public class User {

    private String name;
    private Integer age;

    private Pet pet;

    public User(String name,Integer age){
        this.name = name;
        this.age = age;
    }


}



================================简化日志开发===================================
@Slf4j
@RestController
public class HelloController {
    @RequestMapping("/hello")
    public String handle01(@RequestParam("name") String name){
        
        log.info("请求进来了....");
        
        return "Hello, Spring Boot 2!"+"你好："+name;
    }
}
~~~

##### 2  dev-tools

~~~xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <optional>true</optional>
        </dependency>
~~~

##### 3  Spring Initailizr（项目初始化向导）

###### 0、选择我们需要的开发场景

![image-20220508225801210](C:\Users\26524\AppData\Roaming\Typora\typora-user-images\image-20220508225801210.png)

###### 1.自动依赖引入

![image-20220508225827517](C:\Users\26524\AppData\Roaming\Typora\typora-user-images\image-20220508225827517.png)



###### 2.自动创建项目结构

![image-20220508225857016](C:\Users\26524\AppData\Roaming\Typora\typora-user-images\image-20220508225857016.png)

###### 3.自动编写好主配置类

![image-20220508225921631](C:\Users\26524\AppData\Roaming\Typora\typora-user-images\image-20220508225921631.png)



























































































































