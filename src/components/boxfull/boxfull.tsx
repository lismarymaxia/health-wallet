import {
  IonImg
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
  
  const Boxfull: React.FC<{
    title: string;
    imageTitle: string;
    iconTop: any;
    fechaTop: string;
    horaTop: string;
    yearTop: string;
    iconTextoUno: any;
    textoUno: string;

  }> = ({ title, imageTitle, iconTop, fechaTop, horaTop, yearTop, iconTextoUno, textoUno }) => {
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

         <div className={imageTitle !== '' ? `fs-15 font-w600 text-info mt-1` : `fs-15 font-w600 text-info` }>
            {title}
            <FontAwesomeIcon
              icon={iconTop}
              className="mr-0 float-right"
            />
          </div>
          <div>
            <p className="mb-0 mt-1 fs-12">{textoUno}</p>
          </div>
          
        </div>
      </>
    );
  };
  export default Boxfull;
  