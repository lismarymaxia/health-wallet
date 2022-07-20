import { IonImg } from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const BoxfullGeneral: React.FC<{
  title: string;
  imageTitle: string;
  iconTop: any;
  fechaTop: string;
  horaTop: string;
  yearTop: string;
  iconTextoUno: any;
  textoUno: string;
  iconTextoDos: any;
  textoDos: string;
  iconTextoTres: any;
  textoTres: string;
  iconTextoCuatro: any;
  textoCuatro: string;
  linkBottomLeft: string;
  linkBottomRight: string;
  textLinkBottomLeft: string;
  textLinkBottomRight: string;
  ir: boolean;
  linkIr: string;
  tipo: string;
  textoUrlExternaLeft?: string;
  urlExternaLeft?: string;
}> = ({
  title,
  imageTitle,
  iconTop,
  fechaTop,
  horaTop,
  yearTop,
  iconTextoUno,
  textoUno,
  iconTextoDos,
  textoDos,
  iconTextoTres,
  textoTres,
  iconTextoCuatro,
  textoCuatro,
  linkBottomLeft,
  linkBottomRight,
  textLinkBottomLeft,
  textLinkBottomRight,
  ir,
  linkIr,
  tipo,
  textoUrlExternaLeft,
  urlExternaLeft,
}) => {
  const history = useHistory();
  const handelClick = () => {
    //history.push("/app/afiliados");
  };
  const linkExterno = (url?: string) => {
    window.open(`${url}`, "_blank");
  };
  return (
    <>
      <div
        className="slide-full bg-info-light p-2 border-radius"
        onClick={() => {
          handelClick();
        }}
      >
        {imageTitle !== "" && (
          <IonImg
            src={imageTitle}
            style={{ width: "50px" }}
            className="float-left mr-2"
          />
        )}

        {fechaTop !== "" && (
          <p className="mr-0 float-right d-grid">
            {fechaTop !== "" && (
              <span className="mr-0 float-right text-right fs-18 font-w600 text-info lh-normal">
                {fechaTop}
              </span>
            )}

            {horaTop !== "" && (
              <span className="mr-0 box-grey float-right text-right lh-normal">
                {horaTop}
              </span>
            )}

            {yearTop !== "" && (
              <span className="mr-0 float-right text-right fs-12 lh-normal">
                {yearTop}
              </span>
            )}
          </p>
        )}

        <div
          className={
            imageTitle !== ""
              ? `fs-15 font-w600 text-info mt-2`
              : `fs-15 font-w600 text-info`
          }
        >
          {title}

          {iconTop !== "" && (
            <FontAwesomeIcon icon={iconTop} className="mr-0 float-right" />
          )}
        </div>
        <div>
          <p className="mb-0 mt-1 fs-12 d-flex">
            {iconTextoUno !== "" && (
              <FontAwesomeIcon
                icon={iconTextoUno}
                className="text-info-light icon-box-details mr-2"
              />
            )}
            <span>{textoUno}</span>
          </p>
        </div>

        {textoDos !== "" && (
          <div>
            <p className="mb-0 mt-1 fs-12 d-flex">
              {iconTextoDos !== "" && (
                <FontAwesomeIcon
                  icon={iconTextoDos}
                  className="text-info-light icon-box-details mr-2"
                />
              )}
              <span>{textoDos}</span>
            </p>
          </div>
        )}

        {textoTres !== "" && (
          <div>
            <p className="mb-0 mt-1 fs-12 d-flex">
              {iconTextoTres !== "" && (
                <FontAwesomeIcon
                  icon={iconTextoTres}
                  className="text-info-light icon-box-details mr-2"
                />
              )}
              <span>{textoTres}</span>
            </p>
          </div>
        )}

        {textoCuatro !== "" && (
          <div>
            <p className="mb-0 mt-1 fs-12 d-flex">
              {iconTextoCuatro !== "" && (
                <FontAwesomeIcon
                  icon={iconTextoCuatro}
                  className="text-info-light icon-box-details mr-2"
                />
              )}
              <span>{textoCuatro}</span>
            </p>
          </div>
        )}

        {textLinkBottomLeft !== "" && (
          <div>
            <p className="mb-0 mt-2 fs-12 float-left">
              <Link to={linkBottomLeft} className="text-info-light underline">
                {textLinkBottomLeft}
              </Link>
            </p>
          </div>
        )}

        {textLinkBottomRight !== "" && (
          <div>
            <p className="mb-0 mt-2 fs-12 float-right">
              <Link to={linkBottomRight} className="text-info-light underline">
                {textLinkBottomRight}
              </Link>
            </p>
          </div>
        )}

        {ir && (
          <div className="mr-0 float-right" style={{ marginTop: "-12px" }}>
            <Link to={linkIr}>
              <FontAwesomeIcon icon={faAngleRight} className="text-info-dark" />
            </Link>
          </div>
        )}

        {textoUrlExternaLeft !== "" && (
          <div>
            <p className="mb-0 mt-2 fs-12 float-left">
              <Link
                to="#"
                onClick={() => {
                  linkExterno(urlExternaLeft);
                }}
                className="text-info-light"
                style={{ textDecoration: "underline" }}
              >
                {textoUrlExternaLeft}
              </Link>
            </p>
          </div>
        )}

        {tipo && (
          <p className="mb-0 fs-12 float-right text-info-light">{tipo}</p>
        )}
      </div>
    </>
  );
};
export default BoxfullGeneral;
