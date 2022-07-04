import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonMenuButton,
  } from "@ionic/react";
  import { arrowBack } from "ionicons/icons";
  const Encabezado: React.FC<{
    title: string;
    isbotton: boolean;
    isBuger: boolean;
  }> = ({ title, isbotton, isBuger }) => {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle
              style={{
                color: "#293f76",
                fontSize: "18px",
              }}
            >
              {title}
            </IonTitle>
            {isbotton && (
              <IonButtons slot="start">
                <IonBackButton icon={arrowBack} text="" className="custom-back" />
              </IonButtons>
            )}
            {isBuger && (
              <IonButtons slot="start">
                <IonMenuButton color="dark" />
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
      </>
    );
  };
  export default Encabezado;
  