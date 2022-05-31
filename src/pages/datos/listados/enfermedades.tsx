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
  IonInput,
  IonText,
} from "@ionic/react";
import { trashSharp } from "ionicons/icons";
import { useSelector } from "react-redux";
import {
  servicesWh,
  serviciosPaciente,
  getEnfermedad,
} from "../../../servicios/servicios";
import { CustomField } from "../../../components";

interface Propiedades {
  listado: Array<string>;
  setListado: any;
}

const Enfermedades: React.FC<Propiedades> = ({ listado, setListado }) => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const { idpaciente } = user;

  const [search, setSearch] = useState("");
  const [enfermedad, setEnfermedad] = useState({ label: "", value: "" });
  const { label, value } = enfermedad;

  const [tratamiento, setTratamiento] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [data, setData] = useState<Array<string>>([]);
  const [transition, setTransition] = useState<Boolean>(false);

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

  const handleEnfermedad = () => {
    if (value !== "" && tratamiento !== "" && frecuencia !== "") {
      let formDa = new FormData();
      formDa.append("op", "addEnfermedades");
      formDa.append("id", idpaciente);
      formDa.append("idenfermedad", value);
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
                idenfermdad: value,
                nameenfermedad: label,
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

  const handleDeletEnfermedad = (id: any) => {
    let formDa = new FormData();
    formDa.append("op", "deletEnfermedad");
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

  const handleSearch = (e: any) => {
    setEnfermedad({ ...enfermedad, label: e });
    if (e.length > 3 && transition === false) {
      getEnfermedad(e)
        .then((rsp: any) => {
          const { data, estatus } = rsp.data;
          if (estatus === "ok") {
            if (data) {
              setData(data);
            }
          }
        })
        .catch((e: any) => {
          console.warn(e);
        });
    } else if (e.length < 3) {
      setData([]);
      setTransition(false);
    }
  };

  const handleSelect = (value: any, label: string) => {
    setTransition(true);
    setData([]);
    setEnfermedad({ label: label, value: value });
  };
  return (
    <>
      <IonCol size="12">
        <IonCol size="12">
          <IonItem color="dark">
            <IonLabel>Enfermedades</IonLabel>
          </IonItem>
        </IonCol>
        <IonItem>
          <IonInput
            type="text"
            value={label}
            placeholder="Enfermedad"
            onIonChange={(e) => handleSearch(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonList>
          {data.map((item: any) => (
            <IonItem
              key={item.value}
              button
              onClick={() => {
                handleSelect(item.value, item.label);
              }}
            >
              <IonLabel>
                <IonText color="danger">{item.label}</IonText>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonCol size="12">
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
              handleEnfermedad();
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
                    {item.nameenfermedad}/ {item.tratamiento}/{item.frecuencia}
                  </IonLabel>
                  <IonNote slot="end" color="danger">
                    <IonButton
                      color="danger"
                      onClick={() => {
                        handleDeletEnfermedad(item.id);
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

/*
        <input
          type="text"
          id="search"
          list="languages"
          value={enfermedad}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <datalist id="languages">
          {data.map((item: any) => (
            <option value={item.value}>{item.label}</option>
          ))}
        </datalist>

*/
