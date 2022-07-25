import { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonThumbnail,
  IonImg,
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
  chevronBackOutline,
  trashSharp,
  notificationsOffCircleOutline,
  notificationsCircleOutline,
} from "ionicons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import {
  getPerfil,
  serviciosPaciente,
  getAlergiasPaciente,
  getGrupoAlergias,
  getAlergias,
} from "../../../servicios/servicios";
import { useListado } from "../../../hook";
import { INITIALPERFIL, filterNombre } from "../../../helpers";
const PerfilAlergias = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [
    handleAddAll,
    handleAddItem,
    handleDeletItem,
    handleUpdateItem,
    listado,
  ] = useListado();
  const [perfil, setPerfil] = useState(INITIALPERFIL);
  const [listaGrupoAlerg, setListaGrupoAlerg] = useState([]);
  const [grupo, setGrupo] = useState("");
  const [listaAlerg, setListaAlerg] = useState([]);
  const [alergia, setAlergia] = useState("");
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getPerfil(user.idpaciente)
      .then((rsp: any) => {
        const { data } = rsp;
        setPerfil(data.data);
      })
      .catch((error) => {
        console.error("Error en peticion perfil" + error);
      });

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
      <IonHeader>
        <div className="p-perfil bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle
              className="fs-16 font-w700"
              style={{ paddingLeft: "12%" }}
            >
              Alergias activas
            </IonTitle>
            <IonButtons slot="start">
              <IonBackButton
                icon={chevronBackOutline}
                text=""
                className="custom-back text-white"
              />
            </IonButtons>
          </IonToolbar>
          <div className="mx-3 pb-4 text-white">
            <IonThumbnail slot="start" class="float-left mr-3">
              <IonImg src={`./images/${perfil?.imagen}`} />
            </IonThumbnail>

            <span className="font-w500 fs-14 d-block">{perfil.nombre}</span>
            <span className="fs-12">Cabeza de familia</span>
          </div>
        </div>
      </IonHeader>

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow>
            <IonCol size="12" className="px-3">
              <IonCard className="m-0 mb-2 pb-2 card-slide">
                <IonCardContent>
                  <div className="text-center subir-perfil">
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className="cursor-pointer text-info fs-18"
                    />
                  </div>
                  <IonList>
                    <IonItem>
                      <IonLabel position="stacked">
                        Grupo sanguíneo <span className="text-danger">*</span>
                      </IonLabel>
                      <IonSelect
                        interface="action-sheet"
                        placeholder="Tipo"
                        value={grupo}
                        onIonChange={(e: any) => handleAlergia(e.detail.value!)}
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
                        Grupo sanguíneo <span className="text-danger">*</span>
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
                  <IonItem>
                    <IonLabel>Activa: {checked ? "Si" : "No"}</IonLabel>
                    <IonToggle
                      checked={checked}
                      onIonChange={(e) => setChecked(e.detail.checked)}
                    />
                  </IonItem>

                  <div className="pt-2 text-center">
                    <IonButton
                      className="border-radius"
                      fill="outline"
                      onClick={handleAddAlergia}
                    >
                      agregar
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <IonRow>
                <IonCol size="12">
                  <h5 className="font-w700 fs-15 text-info-dark mb-2">
                    Listado de alergias
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard
                className="m-0 card-slide shadow-full"
                style={{ height: "auto" }}
              >
                <IonCardContent className="card-content-slide">
                  {listado.map((item: any, index: number) => (
                    <div key={index}>
                      <div className="text-info fs-15 font-w600 mb-2">
                        <span>
                          {item.namegroup}, {item.namealergia}
                        </span>
                      </div>
                      <div>
                        <span className="fs-12 mb-4 d-block">
                          <IonButton
                            color="light"
                            onClick={() => {
                              handleDeletAlergia(item.id);
                            }}
                          >
                            <IonIcon icon={trashSharp} />
                          </IonButton>
                          <IonButton
                            color="light"
                            onClick={() => {
                              handleToggle(item.id, item.estado, item);
                            }}
                          >
                            {item.estado === "inactiva" ? (
                              <IonIcon icon={notificationsOffCircleOutline} />
                            ) : (
                              <IonIcon icon={notificationsCircleOutline} />
                            )}
                          </IonButton>
                        </span>
                      </div>
                    </div>
                  ))}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
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
