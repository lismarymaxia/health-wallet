import React, { useState } from "react";
import {
  IonButton,
  IonCol,
  IonIcon,
  useIonViewDidEnter,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonToast,
} from "@ionic/react";
import { trashSharp } from "ionicons/icons";
import { useSelector } from "react-redux";
import { servicesWh, serviciosPaciente } from "../../../servicios/servicios";
import { CustomField } from "../../../components";

interface Propiedades {
  listado: Array<string>;
  setListado: any;
}

const Enfermedades: React.FC<Propiedades> = ({ listado, setListado }) => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const { idpaciente } = user;
  const [enfermedad, setEnfermedad] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [frecuencia, setFrecuencia] = useState("");

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
          } else {
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  });

  const handleDelet = (id: any) => {
    let filter = listado.filter((item: any) => item.id !== id);
    setListado(filter);
  };

  const handleAddAlergia = () => {
    if (enfermedad !== "" && tratamiento !== "" && frecuencia !== "") {
      let formDa = new FormData();
      formDa.append("op", "addEnfermedades");
      formDa.append("id", idpaciente);
      formDa.append("enfermedad", enfermedad);
      formDa.append("tratamiento", tratamiento);
      formDa.append("frecuencia", frecuencia);
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
                enfermedad: enfermedad,
                tratamiento: tratamiento,
                frecuencia: frecuencia,
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

  return (
    <>
      <IonCol size="12">
        <IonCol size="12">
          <IonItem color="dark">
            <IonLabel>Enfermedades</IonLabel>
          </IonItem>
        </IonCol>

        <IonCol size="12">
          <CustomField
            label="Enfermedad Crónica"
            name={enfermedad}
            setName={setEnfermedad}
            placeholder=""
            tipo="text"
          />
          <CustomField
            label="Tratamiento Permanente"
            name={tratamiento}
            setName={setTratamiento}
            placeholder=""
            tipo="text"
          />
          <CustomField
            label="Frecuencia"
            name={frecuencia}
            setName={setFrecuencia}
            placeholder=""
            tipo="text"
          />
        </IonCol>
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
            ? "Listado de enfermedades"
            : listado.map((item: any) => (
                <IonItem key={item.id}>
                  <IonLabel>
                    {item.enfermedad}/ {item.tratamiento}/{item.frecuencia}
                  </IonLabel>
                  <IonNote slot="end" color="danger">
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
export default Enfermedades;
