import { IonButton, IonImg } from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BoxAfiliado: React.FC<{
  item: any;
  id: any;
  title: string;
  imageTitle: string;
  iconTop: any;
  texto: string;
  activo: string;
  handleClic: any;
}> = ({ item, id, title, imageTitle, iconTop, texto, activo, handleClic }) => {
  return (
    <>
      <div className="slide-full">
        {imageTitle !== "" && (
          <IonImg
            src={imageTitle}
            style={{ width: "50px" }}
            className="float-left mr-2"
          />
        )}
        <div
          className={`d-flex justify-content-between   ${
            imageTitle !== ""
              ? `fs-15 font-w600 text-info mt-2`
              : `fs-15 font-w600 text-info`
          }
         `}
        >
          {title}
          {iconTop !== "" && (
            <IonButton
              color="dark"
              fill="clear"
              onClick={() => handleClic(id, item)}
            >
              <FontAwesomeIcon
                icon={iconTop}
                className="mr-0 float-right"
                style={{ color: activo !== "" ? "red" : "" }}
              />
            </IonButton>
          )}
        </div>
      </div>
    </>
  );
};
export default BoxAfiliado;
