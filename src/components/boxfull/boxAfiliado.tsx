import { IonButton, IonImg } from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BoxAfiliado: React.FC<{
  item: any;
  id: any;
  title: string;
  imageTitle: string;
  iconTop: any;
  texto: string;
  idfav: string;
  handleAdd: any;
  handleDelet: any;
}> = ({
  item,
  id,
  title,
  imageTitle,
  iconTop,
  texto,
  idfav,
  handleAdd,
  handleDelet,
}) => {
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

          {idfav === "" ? (
            <IonButton
              color="dark"
              fill="clear"
              onClick={() => handleAdd(id, item)}
            >
              <FontAwesomeIcon icon={iconTop} className="mr-0 float-right" />
            </IonButton>
          ) : (
            <IonButton
              color="dark"
              fill="clear"
              onClick={() => handleDelet(idfav, item)}
            >
              <FontAwesomeIcon
                icon={iconTop}
                className="mr-0 float-right"
                style={{ color: "red" }}
              />
            </IonButton>
          )}
        </div>
      </div>
    </>
  );
};
export default BoxAfiliado;
