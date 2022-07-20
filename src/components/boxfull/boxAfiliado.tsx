import { IonButton, IonImg } from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const BoxAfiliado: React.FC<{
  item: any;
  id: any;
  title: string;
  descripcion: string;
  imageTitle: string;
  iconTop: any;
  texto: string;
  idfav: string;
  handleAdd: any;
  handleDelet: any;
  handleDetail: any;
}> = ({
  item,
  id,
  title,
  descripcion,
  imageTitle,
  iconTop,
  texto,
  idfav,
  handleAdd,
  handleDelet,
  handleDetail
}) => {
  return (
    <>
      <div>
        {imageTitle !== "" && (
          <IonImg
            src={imageTitle}
            alt={title}
            style={{ width: "50px", height: "50px" }}
            className="float-left mr-2"
          />
        )}        
        <div className="d-flex justify-content-between">
          <div className="fs-15 font-w600 text-info mt-1 title">
            <span className="w-100">{title}</span>
          </div>

          {idfav === "" ? (
            <IonButton
              color="dark"
              fill="clear"
              className="m-0"
              style={{ width: "28px", height: "20px" }}
              onClick={() => handleAdd(id, item)}
            >
              <FontAwesomeIcon 
                icon={iconTop} 
                className="mr-0 float-right" 
              />
            </IonButton>
          ) : (
            <IonButton
              color="dark"
              fill="clear"
              className="m-0"
              style={{ width: "28px", height: "20px" }}
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
      <div>
        <p className="mb-0 ml-5 pl-2 pt-1 fs-12">
          <span className="float-left">
            {descripcion}
          </span>
          <IonButton
            color="dark"
            className="float-right m-0"
            style={{ width: "28px", height: "20px" }}
            fill="clear"
            onClick={() => {
              handleDetail(id);
            }}
          >
            <FontAwesomeIcon
              icon={faAngleRight}
              className="mr-0"
            />
          </IonButton>
        </p>
      </div>
    </>
  );
};
export default BoxAfiliado;
