import { useEffect, useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { HeaderPerfil } from "../../components";
import { getDicapacidadPaciente } from "../../servicios";
import "./perfil.css";

const Discapacidad = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [carnet, setCarnet] = useState({
    id: "",
    nombre: "",
    nacionalidad: "",
    fecha_nac: "",
    expedicion: "",
    expiracion: "",
    iddiscapacidad: "",
    discapacidad: "",
  });

  useEffect(() => {
    getDicapacidadPaciente(user.idpaciente)
      .then((rsp: any) => {
        const { data } = rsp;

        setCarnet(data);
      })
      .catch((error) => {
        console.error("Error en la peticion carnet" + error);
      });
  }, [user]);

  return (
    <IonPage className="fondo">
      <HeaderPerfil title="Discapacidad" />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <IonCard
                className="m-0 card-slide shadow-full"
              >
                <IonCardContent className="card-content-slide">
                  <span className="font-w600 fs-14 text-info-dark">
                    ¿Posee alguna discapacidad?
                  </span>
                  <IonList>
                    <IonItem>
                      <IonSelect
                        interface="action-sheet"
                        placeholder="Seleccionar"
                        className="w-100"
                        value={carnet.iddiscapacidad}
                      >
                        <IonSelectOption value="1">Física</IonSelectOption>
                        <IonSelectOption value="2">Visual</IonSelectOption>
                        <IonSelectOption value="3">Auditiva</IonSelectOption>
                        <IonSelectOption value="4">Mental</IonSelectOption>
                        <IonSelectOption value="5">Intelectual</IonSelectOption>
                        <IonSelectOption value="6">Visceral</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
              <div className="mt-1 ml-1 fs-12 text-underline text-info cursor-pointer">
                Cargar carnet de SENADIS
              </div>

              <IonCard className="mt-3 mx-0 card-slide shadow-full">
                <IonCardContent>
                  <div className="certificado">
                    <IonRow className="">
                      <IonCol size="4" className="pl-4 pr-3">
                        <img
                          src="./images/senadis.png"
                          className="mb-0"
                          alt=""
                        />
                      </IonCol>
                      <IonCol
                        size="8"
                        className="text-center"
                        style={{ lineHeight: "normal" }}
                      >
                        <div className="font-w700 d-block enc-carnet">
                          REP&Uacute;BLICA DE PANAM&Aacute;
                        </div>
                        <div className="font-w700 text-info d-inlblockine enc-carnet">
                          CERTIFICADO DE DISCAPACIDAD
                        </div>
                      </IonCol>
                      <IonCol size="12">
                        <img
                          src="./images/iconos-carnet.png"
                          className="mt-0 mb-3 d-block iconos-certificado"
                          alt=""
                          style={{position: "absolute", right: "0px"}}
                        />
                        <div className="font-w700 fs-6 ">
                          Secretaria Nacional de Discapacidad
                        </div>
                      </IonCol>
                      <IonCol size="12">
                        <div className="font-w700 fs-12 my-2 text-uppercase">
                          {carnet.nombre}
                        </div>
                      </IonCol>
                      <IonCol size="4">
                        <img
                          src="./images/user-carnet.png"
                          className="mt-0 mb-3 d-inline border-radius perfil-certificado"
                          alt=""
                        />
                      </IonCol>
                      <IonCol size="5" className="info-carnet">
                        <div className="font-w700 d-block mb-2">
                          C.I.P. {user.cedula}
                        </div>
                        <div className="font-w700 d-block">
                          NACIONALIDAD
                        </div>
                        <div className="font-w700 text-uppercase d-block mb-2">
                          {carnet.nacionalidad}
                        </div>
                        <div className="font-w700 d-block">
                          FECHA DE NACIMIENTO
                        </div>
                        <div className="font-w700 text-uppercase d-block">
                          {carnet.fecha_nac}
                        </div>
                      </IonCol>
                      <IonCol size="3" className="info-carnet pl-2" style={{marginTop:"1.3rem"}}>
                        <div className="font-w700 d-block">
                          EXPEDICIÓN
                        </div>
                        <div className="font-w700 text-uppercase d-block mb-2">
                          {carnet.expedicion}
                        </div>
                        <div className="font-w700 d-block text-danger">
                          EXPIRACIÓN
                        </div>
                        <div className="font-w700 text-uppercase d-block">
                          {carnet.expiracion}
                        </div>
                      </IonCol>
                    </IonRow>
                  </div>
                </IonCardContent>
              </IonCard>              
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Discapacidad;
