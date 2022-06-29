import {
  IonImg
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
  
  const Boxfull: React.FC<{
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
    linkBottomLeft: string;
    linkBottomRight: string;
    textLinkBottomLeft: string;
    textLinkBottomRight: string;

  }> = ({ title, imageTitle, iconTop, fechaTop, horaTop, yearTop, iconTextoUno, textoUno, 
          iconTextoDos, textoDos, linkBottomLeft, linkBottomRight, textLinkBottomLeft, textLinkBottomRight }) => {
    const history = useHistory(); 
    const handelClick=()=>{
      history.push("/app/afiliados");
    }
    return (
      <>
        <div className="slide-full" onClick={ ()=>{handelClick()} }>
          {imageTitle !== '' && 
          <IonImg
            src={imageTitle}
            style={{ width: "50px" }}
            className="float-left mr-2"
          />}

          {fechaTop !== '' && 
            <p className="mr-0 float-right">
              {fechaTop !== '' && 
                <span className="mr-0 w-100 float-right text-right fs-18 font-w600 text-info">
                  {fechaTop}
                </span>
              }

              {horaTop !== '' && 
                <span className="mr-0 w-100 float-right text-right">
                  {horaTop}
                </span>
              }
            </p>
          }

          

         <div className={imageTitle !== '' ? `fs-15 font-w600 text-info mt-1` : `fs-15 font-w600 text-info` }>
            {title}
            <FontAwesomeIcon
              icon={iconTop}
              className="mr-0 float-right"
            />
          </div>
          <div>
            <p className="mb-0 mt-1 fs-12">
              {iconTextoUno !== '' && 
                <FontAwesomeIcon icon={iconTextoUno} className="mr-1 text-info-light" />
              }
              {textoUno}
            </p>
          </div>

          {textoDos !== '' && 
            <div>
              <p className="mb-0 mt-2 fs-12">
                {iconTextoDos !== '' && 
                  <FontAwesomeIcon icon={iconTextoDos} className="mr-1 text-info-light" />
                }
                {textoDos}
              </p>
            </div>
          }

          {textLinkBottomLeft !== '' && 
            <div>
              <p className="mb-0 mt-3 fs-12 float-left">
                <Link to={linkBottomLeft} className="text-info-light underline">
                  {textLinkBottomLeft}
                </Link>
              </p>
            </div>
          }

          {textLinkBottomRight !== '' && 
            <div>
              <p className="mb-0 mt-3 fs-12 float-right">
                <Link to={linkBottomRight} className="text-info-light underline">
                  {textLinkBottomRight}
                </Link>
              </p>
            </div>
          }
          
        </div>
      </>
    );
  };
  export default Boxfull;
  