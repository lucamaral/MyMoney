package authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import play.libs.F;
import play.libs.F.Promise;
import play.mvc.Action;
import play.mvc.Http.Context;
import play.mvc.SimpleResult;
import session.SessionHelper;

@Scope(BeanDefinition.SCOPE_PROTOTYPE)
@Service
public class AutenticadoAction extends Action<Autenticado> {

	@Autowired
	private SessionHelper sessionHelper;

	@Override
	public Promise<SimpleResult> call(Context ctx) throws Throwable {
		if (sessionHelper.algumUsuarioEstahLogado()) {
			return this.delegate.call(ctx);
		}
		ctx.flash().put("erro", "Você não está logado!");
		return F.Promise.pure(redirect("/login"));
	}

}
