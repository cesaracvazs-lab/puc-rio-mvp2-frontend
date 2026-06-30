import { useState } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';

const criarDadosIniciais = (dadosIniciais) => ({
  nome: dadosIniciais?.nome ?? '',
  email: dadosIniciais?.email ?? '',
  telefone: dadosIniciais?.telefone ?? '',
  status: dadosIniciais?.status ?? 'Ativo',
  cidade: dadosIniciais?.cidade ?? '',
  sexo: dadosIniciais?.sexo ?? '',
  dataNascimento: dadosIniciais?.dataNascimento ?? ''
});

const FormularioCliente = ({ dadosIniciais, onSubmit, textoBotao }) => {
  const [formData, setFormData] = useState(() => criarDadosIniciais(dadosIniciais));

  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const formatarTelefone = (value) => {
    const somenteNumeros = value.replace(/\D/g, '').slice(0, 11);

    if (somenteNumeros.length <= 2) {
      return somenteNumeros;
    }

    if (somenteNumeros.length <= 6) {
      return `(${somenteNumeros.slice(0, 2)}) ${somenteNumeros.slice(2)}`;
    }

    if (somenteNumeros.length <= 10) {
      return `(${somenteNumeros.slice(0, 2)}) ${somenteNumeros.slice(2, 6)}-${somenteNumeros.slice(6)}`;
    }

    return `(${somenteNumeros.slice(0, 2)}) ${somenteNumeros.slice(2, 7)}-${somenteNumeros.slice(7, 11)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const valorProcessado = name === 'telefone' ? formatarTelefone(value) : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: valorProcessado
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setIsLoading(true);

    setTimeout(() => {
      onSubmit(formData);
      setIsLoading(false);
      if (!dadosIniciais) {
        setFormData({ nome: '', email: '', telefone: '', status: 'Ativo', cidade: '', sexo: '', dataNascimento: '' });
        setValidated(false);
      }
    }, 800);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="formNome" className="mb-3">
          <Form.Label className="fw-semibold">Nome Completo</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Digite o nome do cliente"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira o nome completo do cliente.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="formCidade" className="mb-3">
          <Form.Label className="fw-semibold">Cidade</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="formSexo" className="mb-3">
          <Form.Label className="fw-semibold">Sexo</Form.Label>
          <Form.Select name="sexo" value={formData.sexo} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="formDataNascimento" className="mb-3">
          <Form.Label className="fw-semibold">Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="formEmail" className="mb-3">
          <Form.Label className="fw-semibold">E-mail</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="exemplo@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Insira um e-mail válido.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="formTelefone" className="mb-3">
          <Form.Label className="fw-semibold">Telefone</Form.Label>
          <Form.Control
            required
            type="text"
            inputMode="numeric"
            placeholder="(11) 99999-9999"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Insira um número de telefone ou celular.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="formStatus" className="mb-3">
          <Form.Label className="fw-semibold">Status do Cadastro</Form.Label>
          <Form.Select name="status" value={formData.status} onChange={handleChange}>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Button type="submit" variant="primary" className="w-100 py-2 fw-bold" disabled={isLoading}>
        {isLoading ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
            Processando...
          </>
        ) : (
          textoBotao || 'Salvar Cliente'
        )}
      </Button>
    </Form>
  );
};

export default FormularioCliente;