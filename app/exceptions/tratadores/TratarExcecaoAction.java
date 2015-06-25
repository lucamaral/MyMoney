package exceptions.tratadores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import play.libs.F;
import play.libs.F.Promise;
import play.libs.Json;
import play.mvc.Action;
import play.mvc.Http.Context;
import play.mvc.SimpleResult;
import exceptions.MyMoneyException;

@Scope(BeanDefinition.SCOPE_PROTOTYPE)
@Service
public class TratarExcecaoAction extends Action<TratarExcecao> {

	@Autowired
	private TratadorDeExcecao tratadorDeExcecao;

	@Override
	public Promise<SimpleResult> call(Context ctx) throws Throwable {
		try {
			return this.delegate.call(ctx);
		} catch (MyMoneyException e) {
			SimpleResult error = internalServerError(Json.toJson(e.getInformacoes()));
			return F.Promise.pure(error);
		} catch (Exception e) {
			MyMoneyException excecaoTratada = tratadorDeExcecao.criarExcecao(e);
			SimpleResult error = internalServerError(Json.toJson(excecaoTratada.getInformacoes()));
			return F.Promise.pure(error);
		}
	}

}
