package parsers;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;

import play.data.Form;

@Service
public class JsonParser {

	public <T> T bindFromRequest(Class<T> clazz) {
		Form<T> bindFromRequest = Form.form(clazz).bindFromRequest();
		if (bindFromRequest.hasErrors()) {
			JsonNode errorsAsJson = bindFromRequest.errorsAsJson();
			System.out.println(errorsAsJson);
		}
		return bindFromRequest.get();
	}

}
