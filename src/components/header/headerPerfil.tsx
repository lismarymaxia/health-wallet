import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonThumbnail,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { useSelector } from "react-redux";
import { imgPerfil } from "../../helpers";

const HeaderPerfil: React.FC<{
  title: string;
}> = ({ title }) => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const FOTO = imgPerfil(user.imagen, user.idpaciente);
  return (
    <IonHeader>
      <div className="p-perfil-sub bg-info-alt border-radius-bottom">
        <IonToolbar>
          <IonTitle className="fs-16 font-w700 text-center">{title}</IonTitle>
          <IonButtons slot="start">
            <IonBackButton
              icon={chevronBackOutline}
              text=""
              className="custom-back text-white"
            />
          </IonButtons>
        </IonToolbar>
        <div className="mx-3 pb-4 text-white d-flex">
          <IonThumbnail slot="start" class="float-left mr-3">
            <img src={FOTO} alt={user.imagen} />
          </IonThumbnail>

          <span className="font-w500 fs-14 d-block">
            {user.nombre} {user.apellido}
          </span>
        </div>
      </div>
    </IonHeader>
  );
};

export default HeaderPerfil;
