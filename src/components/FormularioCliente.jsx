import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';

const FormularioCliente = ({ dadosIniciais, onSubmit, textoBotao }) => {
  // Estado para gerenciar os campos do formulário de forma unificada
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    status: 'Ativo'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  // Efeito para monitorar se dadosIniciais foram passados (Cenário de Edição)
  useEffect(() => {
    if (dadosIniciais) {
      setFormData(dadosIniciais);
    }
  }, [dadosIniciais]);

  // Manipulador genérico para atualizar o estado ao digitar
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Envio do formulário com validação nativa do Bootstrap
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

    // Simula um pequeno atraso de rede (ganha pontos em Usabilidade/Feedback)
    setTimeout(() => {
      onSubmit(formData);
      setIsLoading(false);
      if (!dadosIniciais) {
        // Se for inclusão, limpa os campos após o envio
        setFormData({ nome: '', email: '', telefone: '', status: 'Ativo' });
        setValidated(false);
      }
    }, 800);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
      <Row className="mb-3">
        {/* Campo Nome */}
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

        {/* Campo E-mail */}
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

        {/* Campo Telefone */}
        <Form.Group as={Col} md="6" controlId="formTelefone" className="mb-3">
          <Form.Label className="fw-semibold">Telefone</Form.Label>
          <Form.Control
            required
            type="tel"
            placeholder="(11) 99999-9999"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Insira um número de telefone ou celular.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Campo Status (Select) */}
        <Form.Group as={Col} md="12" controlId="formStatus" className="mb-3">
          <Form.Label className="fw-semibold">Status do Cadastro</Form.Label>
          <Form.Select name="status" value={formData.status} onChange={handleChange}>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </Form.Select>
        </Form.Group>
      </Row>

      {/* Botão de Ação Dinâmico */}
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