import { IonAvatar, IonIcon, IonItem, IonLabel } from "@ionic/react";
//import doctor from "../../asset/doctor.png";
import "./infoDoctor.css";

interface ContainerProps {
  titulo: any;
  fecha: any;
}
export const InfoConsulta: React.FC<ContainerProps> = ({ titulo, fecha }) => (
  <div className="post">
    <IonItem lines="none">
      <IonAvatar className="postAvatar">
        {/*<img src={doctor} alt="" />*/}
      </IonAvatar>
      <IonLabel className="ion-text-wrap">
        <div className="postInfo">
          <p>Nombre:</p>
          <p>{titulo}</p>
        </div>
        <div className="postInfo">
          <p>Fecha:{fecha}</p>
          <p></p>
        </div>

        <p className="postText"></p>
        <div className="postReactions">
          <div className="postReaction">
            <IonIcon icon="chatbubbleOutline" />
            <p></p>
          </div>
        </div>
      </IonLabel>
    </IonItem>
  </div>
);
