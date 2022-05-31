import { IonCol, IonRouterLink, IonRow } from "@ionic/react";

interface ContainerProps {
  message: string;
  link: string;
  text: string;
}

export const Action: React.FC<ContainerProps> = ({ message, link, text }) => (
  <IonRow className="ion-text-center ion-justify-content-center">
    <IonCol size="12">
      <p>
        {message}
        <IonRouterLink
          className="custom-link"
          routerLink={link}
          style={{ color: "orange" }}
        >
          {" "}
          {text} &rarr;
        </IonRouterLink>
      </p>
    </IonCol>
  </IonRow>
);
