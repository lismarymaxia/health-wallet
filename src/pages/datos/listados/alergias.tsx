import React, { useState } from "react";
import {
  IonButton,
  IonCol,
  IonIcon,
  useIonViewDidEnter,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonList,
  IonNote,
  IonToast,
} from "@ionic/react";
import {
  trashSharp,
  notificationsOffCircleOutline,
  notificationsCircleOutline,
} from "ionicons/icons";
import { useSelector } from "react-redux";
import { servicesWh, serviciosPaciente } from "../../../servicios/servicios";
import { handleNombre } from "../../../helpers";

interface Propiedades {
  listado: Array<string>;
  setListado: any;
}

const Alergias: React.FC<Propiedades> = ({ listado, setListado }) => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const { idpaciente } = user;

  const [grupo, setGrupo] = useState("");
  const [alergia, setAlergia] = useState("");

  const [dataAlergias, setDataAlergias] = useState([]);
  const [dataGroudAlergias, setDataGroudAlergias] = useState([]);

  const [notificacion, setNotificacion] = useState({ msg: "", estado: false });
  const { estado, msg } = notificacion;

  useIonViewDidEnter(() => {
    servicesWh
      .get("/controller/combosback.php", {
        params: {
          op: "gruposdealergias",
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setDataGroudAlergias(data.data);
          } else {
            setDataGroudAlergias([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  });

  const handleAlergia = (id: any) => {
    setGrupo(id);
    setAlergia("");
    servicesWh
      .get("/controller/combosback.php", {
        params: {
          op: "alergias",
          idgrupo: id,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setDataAlergias(data.data);
          } else {
            setDataAlergias([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  const handleDelet = (id: any) => {
    let filter = listado.filter((item: any) => item.id !== id);
    setListado(filter);
  };

  const handleUpdate = (item: any) => {
    let nuevo = listado.map((items: any) =>
      items.id === item.id ? (items = item) : items
    );
    setListado(nuevo);
  };

  const handleAddAlergia = () => {
    if (alergia !== "" && grupo !== "") {
      let formDa = new FormData();
      formDa.append("op", "addAlergias");
      formDa.append("id", idpaciente);
      formDa.append("idgrupo", grupo);
      formDa.append("idalerg", alergia);
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
                namegroup: handleNombre(grupo, dataGroudAlergias),
                idalerg: alergia,
                namealergia: handleNombre(alergia, dataAlergias),
              };
              setListado((prev: any) => [...prev, state]);
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

  const handleDeletAlergias = (id: any) => {
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
            handleDelet(id);
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
            handleUpdate(nuevo);
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
    <>
      <IonCol size="12">
        <IonItem color="dark">
          <IonLabel>Alergias</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Grupo</IonLabel>
          <IonSelect
            value={grupo}
            multiple={false}
            cancelText="Cancelar"
            okText="Ok"
            onIonChange={(e) => handleAlergia(e.detail.value)}
          >
            {dataGroudAlergias.map((item: any) => (
              <IonSelectOption value={item.value} key={item.value}>
                {item.label}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Alergia</IonLabel>
          <IonSelect
            value={alergia}
            cancelText="Cancelar"
            okText="Ok"
            onIonChange={(e) => setAlergia(e.detail.value)}
          >
            {dataAlergias.map((item: any) => (
              <IonSelectOption value={item.value} key={item.value}>
                {item.label}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <section className="full-width">
          <IonButton
            className="custom-button"
            expand="full"
            onClick={() => {
              handleAddAlergia();
            }}
          >
            Agregar
          </IonButton>
        </section>
        <IonList>
          {listado.length === 0
            ? "Listado de alergia"
            : listado.map((item: any) => (
                <IonItem key={item.id}>
                  <IonLabel>
                    {item.namegroup}/ {item.namealergia}
                  </IonLabel>
                  <IonNote slot="end" color="danger">
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
                    <IonButton
                      color="danger"
                      onClick={() => {
                        handleDeletAlergias(item.id);
                      }}
                    >
                      <IonIcon icon={trashSharp} />
                    </IonButton>
                  </IonNote>
                </IonItem>
              ))}
        </IonList>
      </IonCol>
      <IonToast
        isOpen={estado}
        onDidDismiss={() => setNotificacion({ ...notificacion, estado: false })}
        message={msg}
        duration={500}
      />
    </>
  );
};
export default Alergias;
