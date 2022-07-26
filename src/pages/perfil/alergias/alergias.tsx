import { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonToast,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from "@ionic/react";
import {
  trashSharp,
  notificationsOffCircleOutline,
  notificationsCircleOutline,
} from "ionicons/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  serviciosPaciente,
  getAlergiasPaciente,
  getGrupoAlergias,
  getAlergias,
} from "../../../servicios/servicios";
import { useListado } from "../../../hook";
import { filterNombre } from "../../../helpers";
import { HeaderPerfil } from "../../../components";
const PerfilAlergias = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [
    handleAddAll,
    handleAddItem,
    handleDeletItem,
    handleUpdateItem,
    listado,
  ] = useListado();
  const [listaGrupoAlerg, setListaGrupoAlerg] = useState([]);
  const [grupo, setGrupo] = useState("");
  const [listaAlerg, setListaAlerg] = useState([]);
  const [alergia, setAlergia] = useState("");
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });
  const [checked, setChecked] = useState(false);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    getGrupoAlergias()
      .then((rsp: any) => {
        const { data } = rsp;
        setListaGrupoAlerg(data.data);
      })
      .catch((error) => {
        console.error("Error en peticion grupo alergias" + error);
      });

    getAlergiasPaciente(user.idpaciente)
      .then((rsp: any) => {
        const { data } = rsp;
        handleAddAll(data.data);
      })
      .catch((error) => {
        console.error("Error en peticion grupo alergias" + error);
      });
  }, [user]);

  const handleAlergia = (id: any) => {
    setGrupo(id);
    setAlergia("");
    getAlergias(id)
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setListaAlerg(data.data);
          } else {
            setListaAlerg([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  const handleAddAlergia = () => {
    if (alergia !== "" && grupo !== "") {
      let estado = checked === true ? "activa" : "inactiva";
      let formDa = new FormData();
      formDa.append("op", "addAlergias");
      formDa.append("id", user.idpaciente);
      formDa.append("idgrupo", grupo);
      formDa.append("idalergia", alergia);
      formDa.append("estado", estado);
      serviciosPaciente(formDa)
        .then(function (response: any) {
          const { data, status } = response;
          if (status === 200) {
            if (data.rsp === 1) {
              setNotificacion({
                msg: data.msg,
                estado: true,
              });
              const state: any = {
                id: data.id,
                idgrupo: grupo,
                namegroup: filterNombre(grupo, listaGrupoAlerg),
                idalerg: alergia,
                namealergia: filterNombre(alergia, listaAlerg),
                estado: estado,
              };
              handleAddItem(state);
              setTransition(false);
            } else {
              setNotificacion({
                msg: data.msg,
                estado: true,
              });
            }
          }
        })
        .catch(function (err) {
          console.warn("Error:" + err);
        });
    } else {
      setNotificacion({
        msg: "Por favor agregue el grupo seguido de la alergia",
        estado: true,
      });
    }
  };

  const handleDeletAlergia = (id: any) => {
    let formDa = new FormData();
    formDa.append("op", "deletAlergias");
    formDa.append("id", id);
    serviciosPaciente(formDa)
      .then(function (response: any) {
        const { data, status } = response;
        if (status === 200) {
          if (data.rsp === 1) {
            setNotificacion({
              msg: data.msg,
              estado: true,
            });
            handleDeletItem(id);
          } else {
            setNotificacion({
              msg: data.msg,
              estado: true,
            });
          }
        }
      })
      .catch(function (err) {
        console.warn("Error:" + err);
      });
  };

  const handleToggle = (id: any, estado: string, item: any) => {
    console.log({ id, estado, item });
    let std = estado === "activa" ? "inactiva" : "activa";
    let formDa = new FormData();
    formDa.append("op", "toggleAlergias");
    formDa.append("id", id);
    formDa.append("estado", std);
    serviciosPaciente(formDa)
      .then(function (response: any) {
        const { data, status } = response;
        if (status === 200) {
          if (data.rsp === 1) {
            setNotificacion({
              msg: data.msg,
              estado: true,
            });
            const nuevo = { ...item, estado: std };
            handleUpdateItem(nuevo);
          } else {
            setNotificacion({
              msg: data.msg,
              estado: true,
            });
          }
        }
      })
      .catch(function (err) {
        console.warn("Error:" + err);
      });
  };
  return (
    <IonPage className="fondo">
      <HeaderPerfil title="Alergias" />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          {transition && (
            <IonRow>
              <IonCol size="12" className="px-3">
                <IonCard className="m-0 mb-2 mt-4 pb-2 card-slide">
                  <IonCardContent>
                    <IonList>
                      <IonItem>
                        <IonLabel position="stacked">
                          Grupo <span className="text-danger">*</span>
                        </IonLabel>
                        <IonSelect
                          interface="action-sheet"
                          placeholder="Tipo"
                          value={grupo}
                          onIonChange={(e: any) =>
                            handleAlergia(e.detail.value!)
                          }
                        >
                          {listaGrupoAlerg.map((item: any, index: any) => (
                            <IonSelectOption value={item.value} key={index}>
                              {item.label}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                    </IonList>
                    <IonList>
                      <IonItem>
                        <IonLabel position="stacked">
                          Alergia <span className="text-danger">*</span>
                        </IonLabel>
                        <IonSelect
                          interface="action-sheet"
                          placeholder="Tipo"
                          value={alergia}
                          onIonChange={(e: any) => setAlergia(e.detail.value!)}
                        >
                          {listaAlerg.map((item: any, index: any) => (
                            <IonSelectOption value={item.value} key={index}>
                              {item.label}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                    </IonList>
                    <IonList>
                      <IonItem className="border-none">
                        <IonLabel>Activa: {checked ? "Si" : "No"}</IonLabel>
                        <IonToggle
                          checked={checked}
                          onIonChange={(e) => setChecked(e.detail.checked)}
                        />
                      </IonItem>
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <div className="pt-2 text-center">
                  <IonButton
                    className="border-radius"
                    fill="outline"
                    onClick={handleAddAlergia}
                  >
                    Guardar
                  </IonButton>
                </div>
              </IonCol>
            </IonRow>
          )}
          {!transition && (
            <IonRow className="mt-4 px-3">
              <IonCol size="12" className="pb-2">
                <IonRow>
                  <IonCol size="12">
                    <h5 className="font-w700 fs-15 text-info-dark mb-2">
                      Listado de alergias
                    </h5>
                  </IonCol>
                </IonRow>

                {listado.length === 0
                  ? "No tiene alergias registradas"
                  : listado.map((item: any, index: number) => (
                      <IonCard
                        className="m-0 mb-3 card-slide shadow-full"
                        key={index}
                      >
                        <IonCardContent className="card-content-slide">
                          <div>
                            <div className="text-info fs-15 font-w600 mb-2">
                              <span>{item.namealergia}</span>
                              <div className="float-right">
                                <IonToggle
                                  checked={
                                    item.estado === "activa" ? true : false
                                  }
                                  onIonChange={(e) => {
                                    handleToggle(item.id, item.estado, item);
                                  }}
                                />
                              </div>
                            </div>
                            <div>
                              <span>Grupo: {item.namegroup}</span>
                              <Link
                                to="#"
                                className="text-danger d-block fs-12 text-underline"
                                onClick={() => {
                                  handleDeletAlergia(item.id);
                                }}
                              >
                                Eliminar
                              </Link>
                              <span className="fs-12 mb-2 d-block">
                                <IonButton
                                  className="d-none"
                                  color="light"
                                  onClick={() => {
                                    handleDeletAlergia(item.id);
                                  }}
                                >
                                  <IonIcon icon={trashSharp} />
                                </IonButton>

                                <IonButton
                                  className="d-none"
                                  color="light"
                                  onClick={() => {
                                    handleToggle(item.id, item.estado, item);
                                  }}
                                >
                                  {item.estado === "inactiva" ? (
                                    <IonIcon
                                      icon={notificationsOffCircleOutline}
                                    />
                                  ) : (
                                    <IonIcon
                                      icon={notificationsCircleOutline}
                                    />
                                  )}
                                </IonButton>
                              </span>
                            </div>
                          </div>
                        </IonCardContent>
                      </IonCard>
                    ))}
              </IonCol>
              <IonCol>
                <div className="text-center">
                  <IonButton
                    className="border-radius"
                    fill="outline"
                    onClick={() => {
                      setTransition(true);
                    }}
                  >
                    Nueva alergia
                  </IonButton>
                </div>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
      <IonToast
        isOpen={notificacion.estado}
        onDidDismiss={() => setNotificacion({ ...notificacion, estado: false })}
        message={notificacion.msg}
        duration={500}
      />
    </IonPage>
  );
};

export default PerfilAlergias;
