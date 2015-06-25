package configs;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({ "controllers", "apis", "services", "dao", "parsers", "validators", "exceptions", "authentication", "session" })
public class AppConfig {

}
