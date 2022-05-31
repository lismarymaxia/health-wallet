import { IonAvatar, IonIcon, IonItem, IonLabel } from "@ionic/react";
import doctor from "../../asset/doctor.png";
import "./infoDoctor.css";

interface ContainerProps {
  nombremedico: any;
  nombreespecialista: any;
  daten: any;
  servicio: any;
}
export const InfoDoctor: React.FC<ContainerProps> = ({
  nombremedico,
  nombreespecialista,
  daten,
  servicio,
}) => (
  <div className="post">
    <IonItem lines="none">
      <IonAvatar className="postAvatar">
        <img src={doctor} alt="" />
      </IonAvatar>
      <IonLabel className="ion-text-wrap">
        <div className="postInfo">
          <p>Médico:{nombremedico}</p>
        </div>
        <div className="postInfo">
          <p>Servicio:{servicio}</p>
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
