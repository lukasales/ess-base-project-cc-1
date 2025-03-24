Feature: Cadastro e manutenção de usuários
	As a usuário do sistema
	I want to criar, atualizar, e deletar minha informação pessoal
	so that eu possa gerenciar os detalhes da minha conta de forma segura e os manter atualizados

Scenario: Cadastro de usuário bem-sucedido
Given o usuário "LucasHenrique" está na página de "Cadastro de usuários"
And o usuário "LucasHenrique" não está cadastrado no sistema
When o usuário preenche "Nome completo", "Usuário/Email", "Senha", "Data de nascimento", "Gênero" e "Foto" com, respectivamente, 
"Lucas Henrique", "LucasHenrique","X", "20/02/2004", "Masculino", "minha-foto.jpg"
Then o usuário recebe um aviso de cadastro bem-sucedido
And o usuário com os dados "Lucas Henrique", "LucasHenrique", "X", "20/02/2004", "Masculino", "minha-foto.jpg", respectivamente, 
"Nome completo", "Usuário/Email", "Senha", "Data de nascimento", "Gênero" e "Foto",  é devidamente armazenado no sistema

Scenario: Cadastro de usuário mal-sucedido
Given o usuário "LucasHenrique" está na página de "Cadastro de usuários"
And o usuário "LucasHenrique" não está cadastrado no sistema
When o usuário preenche "Nome completo", "Usuário/Email", "Senha", "Data de nascimento", "Gênero" e "Foto" com, respectivamente, 
"Lucas Henrique", "-","X", "20/02/2004", "-", "minha-foto.jpg"
Then o usuário recebe um aviso de cadastro malsucedido
And o usuário está de volta na página de "Cadastro de usuários" 

Scenario:  Alteração de dados cadastrais bem-sucedido
Given o usuário "LucasHenrique" está na página de "Dados cadastrais" 
And possui como "Nome completo", "Usuário/Email", "Senha", "Data de nascimento", "Gênero" e "Foto", respectivamente, 
"Lucas Henrique", "LucasHenrique", "X", "20/02/2004", "Masculino", "minha-foto.jpg"
When o usuário altera sua "Data de nascimento", de  "20/02/2004" por "20/02/1994"
And insere sua "Senha" corretamente, "X"
Then ele recebe um aviso de alteração cadastral bem-sucedido
And o usuário pode ver que seus dados "Nome completo", "Usuário/Email", "Senha", "Data de nascimento", "Gênero" e "Foto" são, 
respectivamente, "Lucas Henrique", "LucasHenrique", "X", "20/02/1994", "Masculino", "minha-foto.jpg"

Scenario: Alteração de dados cadastrais malsucedido
Given o usuário "LucasHenrique" está na página de "Dados cadastrais" 
And possui como "Nome completo", "Usuário/Email", "Senha", "Data de nascimento", "Gênero" e "Foto", respectivamente, 
"Lucas Henrique", "LucasHenrique", "X", "20/02/2004", "Masculino", "minha-foto.jpg"
When o usuário altera sua "Data de nascimento", de  "20/02/2004" por "20/02/1994"
And insere sua "Senha" incorretamente, "Y"
Then ele recebe um aviso de alteração cadastral malsucedido
And o usuário pode ver que seus dados "Nome completo", "Usuário/Email", "Senha", "Data de nascimento", "Gênero" e "Foto" são, 
respectivamente, "Lucas Henrique", "LucasHenrique", "X", "20/02/2004", "Masculino", "minha-foto.jpg"
Then o cenário precisa de um passo adicional para a questão do roteiro 

Scenario: Cadastrar um usuário que não está cadastrado no sistema
Given não há usuário cadastrado no sistema com  id "2" e usuário “LucasHenrique”
When Faço uma Requisição POST para a rota "/users/2" com id "2", nome completo “Lucas Henrique”, usuário/email “LucasHenrique”, 
senha ”X”, data de nascimento “20/02/2004”, gênero “Masculino”, foto “minha-foto.jpg”
Then O status da resposta deve ser 200
And a resposta JSON deve ser "2", “Lucas Henrique”, “LucasHenrique”, ”X”, “20/02/2004”, “Masculino”, “minha-foto.jpg”
And o usuário com id "2", nome completo “Lucas Henrique”, usuário/email “LucasHenrique”, senha ”X”, data de nascimento “20/02/2004”,
gênero “Masculino”, foto “minha-foto.jpg” foi devidamente armazenado no sistema.
And este cenário foi corrigido 
