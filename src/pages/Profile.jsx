/*import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

export default function Profile() {
  const { user } = useAuth();
  const storage = getStorage();

  const [responsavel, setResponsavel] = useState({
    nome: user?.displayName || "",
    email: user?.email || "",
    cpf: "",
    nascimento: "",
    telefone: "",
    endereco: "",
    foto: user?.photoURL || "/default-avatar.png",
  });

  const [dependentes, setDependentes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [novoDep, setNovoDep] = useState({
    nome: "",
    nascimento: "",
    sexo: "",
  });
  const [uploading, setUploading] = useState(false);

  if (!user)
    return (
      <div className="text-center py-5">
        <h3>Você precisa estar logado para acessar o perfil.</h3>
      </div>
    );

  // 📸 Upload da foto de perfil (Base64)
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result; // imagem em Base64
      setResponsavel((prev) => ({ ...prev, foto: base64 }));

      setUploading(true);
      try {
        const storageRef = ref(storage, `profile_pics/${user.uid}/foto_perfil.jpg`);
        await uploadString(storageRef, base64, "data_url");
        const photoURL = await getDownloadURL(storageRef);

        await updateProfile(user, { photoURL });
        setResponsavel((prev) => ({ ...prev, foto: photoURL }));

        alert("✅ Foto de perfil atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar imagem:", error);
        alert("❌ Erro ao enviar foto.");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // 💾 Salvar dependente
  const handleSaveDep = () => {
    if (!novoDep.nome.trim() || !novoDep.nascimento || !novoDep.sexo) {
      alert("Preencha todos os campos do dependente.");
      return;
    }

    let atualizados = [...dependentes];
    if (editIndex !== null) {
      atualizados[editIndex] = novoDep;
    } else {
      atualizados.push(novoDep);
    }

    setDependentes(atualizados);
    setShowModal(false);
    setNovoDep({ nome: "", nascimento: "", sexo: "" });
    setEditIndex(null);
  };

  const handleEditDep = (index) => {
    setNovoDep(dependentes[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const removeDep = (index) => {
    if (window.confirm("Tem certeza que deseja remover este dependente?")) {
      setDependentes(dependentes.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "700px" }}>
        <div className="text-center mb-4">
          <div className="position-relative d-inline-block">
            <img
              src={responsavel.foto}
              alt="avatar"
              className="rounded-circle mb-3 shadow"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                border: "3px solid #007bff",
              }}
            />
            <label
              htmlFor="fotoUpload"
              className="btn btn-sm btn-outline-primary position-absolute bottom-0 end-0"
              style={{ transform: "translate(20%, -20%)" }}
            >
              <i className="bi bi-camera"></i>
            </label>
            <input
              id="fotoUpload"
              type="file"
              accept="image/*"
              className="d-none"
              onChange={handleProfilePicChange}
              disabled={uploading}
            />
          </div>

          <h3>Perfil do Responsável</h3>
          <p className="text-muted">{responsavel.email}</p>
        </div>

        // Dados Pessoais 
        <form>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Nome completo</label>
              <input
                type="text"
                className="form-control"
                value={responsavel.nome}
                onChange={(e) =>
                  setResponsavel({ ...responsavel, nome: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Data de nascimento</label>
              <input
                type="date"
                className="form-control"
                value={responsavel.nascimento}
                onChange={(e) =>
                  setResponsavel({
                    ...responsavel,
                    nascimento: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">CPF</label>
              <input
                type="text"
                className="form-control"
                placeholder="000.000.000-00"
                maxLength="14"
                value={responsavel.cpf}
                onChange={(e) =>
                  setResponsavel({ ...responsavel, cpf: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Telefone</label>
              <input
                type="tel"
                className="form-control"
                placeholder="(00) 00000-0000"
                value={responsavel.telefone}
                onChange={(e) =>
                  setResponsavel({ ...responsavel, telefone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Endereço completo</label>
            <input
              type="text"
              className="form-control"
              placeholder="Rua, número, bairro, cidade"
              value={responsavel.endereco}
              onChange={(e) =>
                setResponsavel({ ...responsavel, endereco: e.target.value })
              }
            />
          </div>
        </form>

        <hr />

        // Dependentes 
        <div className="d-flex justify-content-between align-items-center">
          <h5>Dependentes / Filhos</h5>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setNovoDep({ nome: "", nascimento: "", sexo: "" });
              setEditIndex(null);
              setShowModal(true);
            }}
          >
            <i className="bi bi-plus-circle me-1"></i> Adicionar
          </button>
        </div>

        <ul className="list-group mt-3">
          {dependentes.length > 0 ? (
            dependentes.map((dep, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{dep.nome}</strong>
                  <br />
                  <small>
                    {dep.sexo} • Nascido em{" "}
                    {new Date(dep.nascimento).toLocaleDateString("pt-BR")}
                  </small>
                </div>
                <div>
                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => handleEditDep(i)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeDep(i)}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item text-center text-muted">
              Nenhum dependente adicionado.
            </li>
          )}
        </ul>
      </div>

      // Modal 
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editIndex !== null
                    ? "Editar Dependente"
                    : "Adicionar Dependente"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nome completo</label>
                  <input
                    type="text"
                    className="form-control"
                    value={novoDep.nome}
                    onChange={(e) =>
                      setNovoDep({ ...novoDep, nome: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Data de nascimento</label>
                  <input
                    type="date"
                    className="form-control"
                    value={novoDep.nascimento}
                    onChange={(e) =>
                      setNovoDep({ ...novoDep, nascimento: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Sexo</label>
                  <select
                    className="form-select"
                    value={novoDep.sexo}
                    onChange={(e) =>
                      setNovoDep({ ...novoDep, sexo: e.target.value })
                    }
                  >
                    <option value="">Selecione...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-success" onClick={handleSaveDep}>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
*/

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

export default function Profile() {
  const { user } = useAuth();
  const storage = getStorage();

  const [responsavel, setResponsavel] = useState({
    nome: user?.displayName || "",
    email: user?.email || "",
    cpf: "",
    nascimento: "",
    telefone: "",
    endereco: "",
    foto: user?.photoURL || "/default-avatar.png",
  });

  const [dependentes, setDependentes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [novoDep, setNovoDep] = useState({ nome: "", nascimento: "", sexo: "" });
  const [uploading, setUploading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  if (!user)
    return (
      <div className="text-center py-5">
        <h3>Você precisa estar logado para acessar o perfil.</h3>
      </div>
    );

  // 📸 Upload da foto
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      setResponsavel((prev) => ({ ...prev, foto: base64 }));

      setUploading(true);
      try {
        const storageRef = ref(storage, `profile_pics/${user.uid}/foto_perfil.jpg`);
        await uploadString(storageRef, base64, "data_url");
        const photoURL = await getDownloadURL(storageRef);

        await updateProfile(user, { photoURL });
        setResponsavel((prev) => ({ ...prev, foto: photoURL }));

        alert("✅ Foto de perfil atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar imagem:", error);
        alert("❌ Erro ao enviar foto.");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // 🧮 Funções de validação
  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    return resto === parseInt(cpf.substring(10, 11));
  };

  const validarTelefone = (telefone) => {
    const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return regex.test(telefone);
  };

  const validarIdade = (dataNasc) => {
    if (!dataNasc) return false;
    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
    return idade >= 18;
  };

  // 💾 Salvar informações do responsável
  const handleSalvar = () => {
    const { nome, cpf, nascimento, telefone, endereco } = responsavel;

    if (!nome.trim() || !cpf.trim() || !nascimento || !telefone.trim() || !endereco.trim()) {
      setMensagem("❌ Preencha todos os campos obrigatórios!");
      return;
    }

    if (!validarCPF(cpf)) {
      setMensagem("❌ CPF inválido!");
      return;
    }

    if (!validarTelefone(telefone)) {
      setMensagem("❌ Telefone inválido!");
      return;
    }

    if (!validarIdade(nascimento)) {
      setMensagem("❌ Você precisa ter pelo menos 18 anos!");
      return;
    }

    // Aqui você pode salvar no Firestore futuramente
    setMensagem("✅ Informações salvas com sucesso!");
  };

  // 💾 Dependentes
  const handleSaveDep = () => {
    if (!novoDep.nome.trim() || !novoDep.nascimento || !novoDep.sexo) {
      alert("Preencha todos os campos do dependente.");
      return;
    }
    const atualizados = [...dependentes];
    if (editIndex !== null) atualizados[editIndex] = novoDep;
    else atualizados.push(novoDep);

    setDependentes(atualizados);
    setShowModal(false);
    setNovoDep({ nome: "", nascimento: "", sexo: "" });
    setEditIndex(null);
  };

  const handleEditDep = (index) => {
    setNovoDep(dependentes[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const removeDep = (index) => {
    if (window.confirm("Tem certeza que deseja remover este dependente?")) {
      setDependentes(dependentes.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "700px" }}>
        <div className="text-center mb-4">
          <div className="position-relative d-inline-block">
            <img
              src={responsavel.foto || "/default-avatar.png"}
              alt="avatar"
              className="rounded-circle mb-3 shadow"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                border: "3px solid #007bff",
              }}
            />
            <label
              htmlFor="fotoUpload"
              className="btn btn-sm btn-outline-primary position-absolute bottom-0 end-0"
              style={{ transform: "translate(20%, -20%)" }}
            >
              <i className="bi bi-camera"></i>
            </label>
            <input
              id="fotoUpload"
              type="file"
              accept="image/*"
              className="d-none"
              onChange={handleProfilePicChange}
              disabled={uploading}
            />
          </div>

          <h3>Perfil do Responsável</h3>
          <p className="text-muted">{responsavel.email}</p>
        </div>

        <form>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Nome completo</label>
              <input
                type="text"
                className="form-control"
                value={responsavel.nome}
                onChange={(e) =>
                  setResponsavel({ ...responsavel, nome: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Data de nascimento</label>
              <input
                type="date"
                className="form-control"
                value={responsavel.nascimento}
                onChange={(e) =>
                  setResponsavel({ ...responsavel, nascimento: e.target.value })
                }
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">CPF</label>
              <input
                type="text"
                className="form-control"
                placeholder="000.000.000-00"
                maxLength="14"
                value={responsavel.cpf}
                onChange={(e) =>
                  setResponsavel({ ...responsavel, cpf: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Telefone</label>
              <input
                type="tel"
                className="form-control"
                placeholder="(00) 00000-0000"
                value={responsavel.telefone}
                onChange={(e) =>
                  setResponsavel({ ...responsavel, telefone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Endereço completo</label>
            <input
              type="text"
              className="form-control"
              value={responsavel.endereco}
              onChange={(e) =>
                setResponsavel({ ...responsavel, endereco: e.target.value })
              }
            />
          </div>

          {/* 💾 Botão salvar */}
          <div className="text-center mt-4">
            <button
              type="button"
              className="btn btn-success px-4"
              onClick={handleSalvar}
            >
              <i className="bi bi-save me-2"></i> Salvar informações
            </button>
          </div>

          {mensagem && (
            <div
              className={`alert mt-3 ${
                mensagem.startsWith("✅")
                  ? "alert-success text-center"
                  : "alert-danger text-center"
              }`}
            >
              {mensagem}
            </div>
          )}
        </form>

        <hr />
        {/* Dependentes (igual ao seu código) */}
        <div className="d-flex justify-content-between align-items-center">
          <h5>Dependentes / Filhos</h5>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setNovoDep({ nome: "", nascimento: "", sexo: "" });
              setEditIndex(null);
              setShowModal(true);
            }}
          >
            <i className="bi bi-plus-circle me-1"></i> Adicionar
          </button>
        </div>

        <ul className="list-group mt-3">
          {dependentes.length > 0 ? (
            dependentes.map((dep, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{dep.nome}</strong>
                  <br />
                  <small>
                    {dep.sexo} • Nascido em{" "}
                    {new Date(dep.nascimento).toLocaleDateString("pt-BR")}
                  </small>
                </div>
                <div>
                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => handleEditDep(i)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeDep(i)}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item text-center text-muted">
              Nenhum dependente adicionado.
            </li>
          )}
        </ul>
      </div>

      {/* Modal de dependente (igual ao seu código original) */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editIndex !== null ? "Editar Dependente" : "Adicionar Dependente"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nome completo</label>
                  <input
                    type="text"
                    className="form-control"
                    value={novoDep.nome}
                    onChange={(e) => setNovoDep({ ...novoDep, nome: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Data de nascimento</label>
                  <input
                    type="date"
                    className="form-control"
                    value={novoDep.nascimento}
                    onChange={(e) =>
                      setNovoDep({ ...novoDep, nascimento: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Sexo</label>
                  <select
                    className="form-select"
                    value={novoDep.sexo}
                    onChange={(e) => setNovoDep({ ...novoDep, sexo: e.target.value })}
                  >
                    <option value="">Selecione...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-success" onClick={handleSaveDep}>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
